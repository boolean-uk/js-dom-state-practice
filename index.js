const todoInput = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo");
const todoListElement = document.querySelector("#todo-list");

const todoList = [
  { id: 1, title: "Build me", isCompleted: true },
  { id: 2, title: "I should show on the screen", isCompleted: false },
];

button.addEventListener("click", addTodo);

function addTodo() {
  const newTodo = {
    id: todoList.length + 1,
    title: todoInput.value,
    isCompleted: false,
  };

  todoList.push(newTodo);
  todoInput.value = "";

  render();
}

function removeTodo(index) {
  todoList.splice(index, 1);
  render();
}

function setCompleted(index) {
  todoList[index].isCompleted = !todoList[index].isCompleted;
  render();
}

function setPriority(index, value) {
  todoList[index].priority = value;
  console.log(todoList);
  render();
}

function setOrder(index, value) {
  todoList[index].order = value;
  console.log(todoList);
  render();
}

function render() {
  todoListElement.innerHTML = "";
  todoList.forEach((todoItem, index) => {
    const todoElement = document.createElement("li");

    const checkbox = makeCheckbox(todoItem, index);
    const range = makePriorityRange(todoItem, index);
    const order = makeOrder(todoItem, index);
    const removeBtn = makeRemoveButton(index);

    todoElement.innerText = `${todoItem.id} ${todoItem.title}`;
    todoElement.append(checkbox);
    todoElement.append(range);
    todoElement.append(order);
    todoElement.append(removeBtn);
    todoListElement.append(todoElement);
  });
}

function makeCheckbox(todoItem, index) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todoItem.isCompleted;
  checkbox.addEventListener("change", () => setCompleted(index));
  return checkbox;
}

function makeRemoveButton(index) {
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("remove");
  removeBtn.addEventListener("click", () => removeTodo(index));
  return removeBtn;
}

function makePriorityRange(todoItem, index) {
  const range = document.createElement("input");
  range.type = "range";
  range.min = "0";
  range.max = "8";
  range.value = todoItem.priority;
  range.addEventListener("change", () => setPriority(index, range.value));
  return range;
}

function makeOrder(todoItem, index) {
  const order = document.createElement("input");
  order.type = "order";
  order.accept = "setOrder";
  order.checked = todoItem.isCompleted;
  order.addEventListener("change", () => setOrder(index));
  return order;
}

render();
