const todoInput = document.querySelector('#todo-input')
const button = document.querySelector('#add-todo')
const todoListElement = document.querySelector('#todo-list')

const todoList = [
    { title: 'Build me', isCompleted: true, priority: 'high' },
    { title: 'I should show on the screen', isCompleted: false, priority: 'low' },
]

button.addEventListener('click', addTodo)

function addTodo() {
    const newTodo = {
        title: todoInput.value,
        isCompleted: false
    }

    todoList.push(newTodo)
    todoInput.value = ''

    render()
}

function removeTodo(index) {
    todoList.splice(index, 1)
    render()
}

function setCompleted(index) {
    todoList[index].isCompleted = !todoList[index].isCompleted
    render()
}

function render() {
    todoListElement.innerHTML = ''
    todoList.forEach((todoItem, index) => {
        const todoElement = document.createElement('li')

        const checkbox = makeCheckbox(todoItem, index)
        const removeBtn = makeRemoveButton(index)
        const priorityOptions = makePriorityOptions(index)

        todoElement.innerText = todoItem.title
        todoElement.append(priorityOptions)
        todoElement.append(checkbox)
        todoElement.append(removeBtn)
        todoListElement.append(todoElement)

    })
}

function makeCheckbox(todoItem, index) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todoItem.isCompleted
    checkbox.addEventListener('change', () => setCompleted(index))
    return checkbox
}

function makeRemoveButton(index) {
    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'Remove'
    removeBtn.classList.add('remove')
    removeBtn.addEventListener('click', () => removeTodo(index))
    return removeBtn
}

function makePriorityOptions(index) {
    const prioritySelect = document.createElement('select')
    const priorityDefault = document.createElement('option')
    const prioritylow = document.createElement('option')
    const priorityMedium = document.createElement('option')
    const priorityHigh = document.createElement('option')

    prioritySelect.classList.add('priority-select')
    priorityDefault.classList.add('priority-default')
    prioritylow.classList.add('priority-low')
    priorityMedium.classList.add('priority-medium')
    priorityHigh.classList.add('priority-high')

    priorityDefault.value = ''
    prioritylow.value = 'low'
    priorityMedium.value = 'medium'
    priorityHigh.value = 'high'

    priorityDefault.innerText = '--Please choose an option--'
    prioritylow.innerText = 'low'
    priorityMedium.innerText = 'medium'
    priorityHigh.innerText = 'high'

    prioritySelect.append(priorityDefault)
    prioritySelect.append(prioritylow)
    prioritySelect.append(priorityMedium)
    prioritySelect.append(priorityHigh)

    prioritySelect.addEventListener('change', () => setPriority(index, prioritySelect.value))

    return prioritySelect
}

function setPriority(index, value) {
    todoList[index].priority = value
    render()
}

render()