const listItems = document.querySelectorAll('#sortableList li');
let draggedItem = null;

// Function to handle the start of the drag event
function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
        draggedItem.style.display = 'none';  // Hide the item while dragging
    }, 0);
}

// Function to handle the end of the drag event
function handleDragEnd(e) {
    setTimeout(() => {
        draggedItem.style.display = 'block';  // Show the item after drag
        draggedItem = null;
    }, 0);
}

// Function to handle when an item is dragged over another item
function handleDragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(e.clientY);
    const currentElement = e.target;

    if (afterElement == null) {
        // If no afterElement, append dragged item at the end
        currentElement.parentNode.appendChild(draggedItem);
    } else {
        // Otherwise, insert it before the afterElement
        currentElement.parentNode.insertBefore(draggedItem, afterElement);
    }
}

// Function to find the position where the dragged item should be inserted
function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('#sortableList li')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Attach event listeners to each list item
listItems.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
});
