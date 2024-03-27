(function() {
    const todoInput = document.querySelector('#todo-input');
    const button = document.querySelector('#add-todo');
    const todoListElement = document.querySelector('#todo-list');

    let todoList = [];

    button.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const newTodo = {
            title: todoInput.value.trim(),
            isCompleted: false,
            timestamp: new Date().toLocaleString(),
            priority: todoList.length + 1
        };

        if (newTodo.title !== '') {
            todoList.push(newTodo);
            todoInput.value = '';
            sortTodosByPriority();
            render();
        } else {
            alert('Please enter a valid todo item.');
        }
    }

    function removeTodo(index) {
        todoList.splice(index, 1);
        render();
    }

    function setCompleted(index) {
        todoList[index].isCompleted = !todoList[index].isCompleted;
        render();
    }

    function sortTodosByPriority() {
        todoList.forEach((todo, index) => {
            todo.priority = index + 1;
        });
    }

    function render() {
        todoListElement.innerHTML = '';
        todoList.forEach((todoItem, index) => {
            const todoElement = document.createElement('li');
            todoElement.draggable = true;
            todoElement.dataset.index = index;
            todoElement.style.backgroundColor = getPriorityColor(todoItem.priority);
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todoItem.isCompleted;
            checkbox.addEventListener('change', () => toggleCompleted(index));
    
            const removeBtn = makeRemoveButton(index);

            todoElement.appendChild(checkbox);
            const textContent = document.createElement('span');
            textContent.textContent = `${todoItem.title} - ${todoItem.timestamp} - Priority: ${todoItem.priority}`;

            todoElement.appendChild(textContent);
            todoElement.appendChild(removeBtn);

            todoElement.addEventListener('dragstart', handleDragStart);
            todoElement.addEventListener('dragover', handleDragOver);
            todoElement.addEventListener('drop', handleDrop);
    
            todoListElement.appendChild(todoElement);
        });
    }
    
    function toggleCompleted(index) {
        todoList[index].isCompleted = !todoList[index].isCompleted;
        render();
    }

    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
        const targetIndex = parseInt(event.target.dataset.index, 10);

        if (isNaN(targetIndex)) return;

        const movedTodo = todoList.splice(sourceIndex, 1)[0];
        todoList.splice(targetIndex, 0, movedTodo);

        sortTodosByPriority();
        render();
    }

    function makeRemoveButton(index) {
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.classList.add('remove');
        removeBtn.addEventListener('click', () => removeTodo(index));
        return removeBtn;
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 1:
                return 'red';
            case 2:
                return 'orange';
            case 3:
                return 'yellow';
            default:
                return 'white';
        }
    }

    render();
})();
