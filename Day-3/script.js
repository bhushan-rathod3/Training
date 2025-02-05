const baseURL = "https://jsonplaceholder.typicode.com/todos";

document.addEventListener('DOMContentLoaded', () => {
    const inputTodo = document.getElementById('input-todo');
    const buttonTodo = document.getElementById('button-todo');
    const ulTodo = document.getElementById('ul-todo');
    const clear = document.querySelector('.btn-clear');

const loadTodo = async () => {
    try {
        const response = await axios.get(baseURL, { params: { _limit: 5 } });
        response.data.forEach(todo => createTodo(todo.title, todo.id));
    } catch (error) {
        console.error("Can't fetching todos at the moment ", error);
    }
};

const createTodo = (task, id = Date.now()) => {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.dataset.id = id;

    li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group">
            <button type="button" class="btn btn-danger">Edit</button>
            <button type="button" class="btn btn-warning">Delete</button>
        </div>`;

    ulTodo.appendChild(li);
};


buttonTodo.addEventListener("click", async () => {
    const text = inputTodo.value.trim();
    if (!text) return;

    try {
        const response = await axios.post(baseURL, { title: text, completed: false });
        createTodo(response.data.title, response.data.id);
    } catch (error) {
        console.error("Unable to add todo ", error);
    }

    inputTodo.value = "";
});

const saveEditText = async (li) => {
    const newText = li.querySelector('.edit-input').value;
    const id = li.dataset.id;

    if (!id) {
        alert('This todo cannot be updated (no ID).');
        return;
    }

    try {
        await axios.patch(`${baseURL}/${id}`, { title: newText });

        li.innerHTML = `<span class="text-todo">${newText}</span>
            <div class="btn-group">
                <button type="button" class="btn btn-danger">Edit</button>
                <button type="button" class="btn btn-warning">Delete</button>
            </div>`;

        alert('Edit successful!!');

    } catch (error) {
        alert('Can\'t update todo at the moment');
    }
};

ulTodo.addEventListener("click", async (e) => {
    const li = e.target.closest(".list-group-item");

    if (e.target.classList.contains("btn-danger")) { 
        const text = li.querySelector('.text-todo').textContent;
        li.innerHTML = `<input type="text" class="form-control edit-input" value="${text}">
            <div class="btn-group">
                <button type="button" class="btn btn-success btn-save">Save</button>
            </div>`;

        li.querySelector('.edit-input').focus();
    } 

    if (e.target.classList.contains("btn-save")) { 
        saveEditText(li);
    }

    if (e.target.classList.contains("btn-warning")) { 
        const id = li.dataset.id;
        if (!id) {
            li.remove(); 
            return;
        }

        try {
            await axios.delete(`${baseURL}/${id}`);
            li.remove();
        } catch (error) {
            alert("Error deleting todo.");
        }
    }
});

clear.addEventListener("click", () => {
    if (confirm("Do you wish to clear all todos?")) {
        ulTodo.innerHTML = "";
    }
});

loadTodo()
});