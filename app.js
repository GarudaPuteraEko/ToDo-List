// Selectors
const $ = (selector) => document.querySelector(selector);
const todoInput = $('.todo-input');
const todoButton = $('.todo-button');
const todoList = $('.todo-list');
const filterOption = $('.filter-todo');

// Event Listeners
window.addEventListener('DOMContentLoaded', loadTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault();
  const todoText = todoInput.value;
  if (todoText) {
    createTodo(todoText);
    saveLocalTodos(todoText);
    todoInput.value = '';
  }
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList.contains('trash-btn')) {
    const todo = item.parentElement;
    removeLocalTodos(todo.children[0].innerText);
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => todo.remove());
  } else if (item.classList.contains('complete-btn')) {
    item.parentElement.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    if (todo.nodeType === 1) {
      switch (e.target.value) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
          break;
        case 'uncompleted':
          todo.style.display = todo.classList.contains('completed') ? 'none' : 'flex';
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todos.indexOf(todo);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function loadTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => createTodo(todo));
}

function createTodo(todoText) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = todoText;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}