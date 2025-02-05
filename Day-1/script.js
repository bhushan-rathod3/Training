document.addEventListener('DOMContentLoaded' , () => {
    const inputTodo = document.getElementById('input-todo');
    const buttonTodo = document.getElementById('button-todo');
    const ulTodo = document.getElementById('ul-todo');


    const clear = document.querySelector('.btn-clear');

    const createTodo = (task) =>{
        
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        
        li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-danger">Edit</button>
            <button type="button" class="btn btn-warning">Delete</button>
        </div>`;
        ulTodo.appendChild(li);
    }

    const saveEditText = (li) => {
        const text = li.querySelector('.edit-input').value;
            
        li.innerHTML = `<span class="text-todo">${text}</span>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-danger">Edit</button>
                <button type="button" class="btn btn-warning">Delete</button>
            </div>`;
        saveAllTodo();
    }


    const saveAllTodo = () => {
        console.log('saving todo');
        const allTodo = [...document.querySelectorAll('.text-todo')].map(
            (task) => task.textContent);

        localStorage.setItem('allTodo' , JSON.stringify(allTodo));
        console.log(allTodo);
    }

    const loadTodo = () => {
        console.log('load');
        const todo = JSON.parse(localStorage.getItem('allTodo')) || [] ;
        console.log(todo);
        todo.forEach((task)=> createTodo(task));
    }


    buttonTodo.addEventListener('click' , () => {
        const text = inputTodo.value;
        
        createTodo(text);
        
        inputTodo.value = ''; 
        saveAllTodo();
    });


    ulTodo.addEventListener('click' , (e) => {
        if(e.target.classList.contains('btn-danger')){
            
            const li = e.target.closest('.list-group-item');
            let text = li.querySelector('.text-todo').textContent;
            li.innerHTML = `<input type="text" class="form-control edit-input" id="input-todo" value="${text}">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-success btn-save">Save</button>               
            </div>
            `;
            
            const editInput = document.querySelector('.edit-input');
            editInput.focus();
            editInput.addEventListener('keydown' , (e) => {
                if(e.key === "Enter"){
                    saveEditText(li);
                }
            })
        }        
    

        if(e.target.classList.contains('btn-save')){
            const li = e.target.closest('.list-group-item');
            saveEditText(li);
            
        }

        if(e.target.classList.contains("btn-warning")){
            
            e.target.closest(".list-group-item").remove();
        }

        saveAllTodo();
    })

    clear.addEventListener('click' , (e)=>{
        let userConfirmation = confirm('Do you wish to clear?');
        if(userConfirmation){
            ulTodo.innerHTML = '';
        }
        saveAllTodo();
    });

    loadTodo();
})


