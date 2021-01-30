// CONSTANTS
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

// ARRAY
let todos = [];

// EVENT LISTENERS
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const todoText = todoInput.value;
  addTodo(todoText);
});

// FUNCTIONS
const addTodo = (todoText) => {
  if (todoText !== '') {
    // Create todo
    todo = {
      id: Date.now(),
      text: todoText,
      complete: false,
    };
  }

  // Append new todo to array
  todos.push(todo);
  // Update todos
  updateTodos(todos);
  // Clear input box
  todoInput.value = '';
};

/* RENDER TODOS */
const renderTodos = (todos) => {
  // Clear <ul>
  todoList.innerHTML = '';

  // Iterate through array of todos
  todos.forEach(function (todo) {
    // Check if complete
    const completed = todo.complete ? 'todo-complete' : '';

    // Create list item
    const li = document.createElement('li');
    li.setAttribute('class', 'todo-item');
    li.setAttribute('data-key', todo.id);

    // Add class 'todo-complete' if complete
    if (todo.complete === true) {
      li.classList.add('todo-complete');
    }

    // Specify HTML of <li>
    li.innerHTML = `${todo.text}
    <div class="btn-container">
    <button class="complete-btn">
    <i class="fas fa-check-circle"></i>
    </button>
    <button class="delete-btn">
    <i class="fas fa-times-circle"></i>
    </button>
    </div>`;

    // COMPLETE BTN
    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () =>
      handleComplete(li, todo, todos)
    );

    // DELETE BTN
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => handleDelete(todo, todos));

    // Append <li> to <ul>
    todoList.append(li);
  });
};

/* handleComplete */
const handleComplete = (li, todo, todos) => {
  if (todo.complete === false) {
    li.classList.add('todo-complete');
    todo.complete = true;
  } else {
    li.classList.remove('todo-complete');
    todo.complete = false;
  }
  updateTodos(todos);
};

/* handleDelete */
const handleDelete = (todo, todos) =>
  updateTodos(todos.filter((e) => todo.id !== e.id));

/* ADD TO LOCAL STORAGE */
const saveToLocalStorage = (todos) =>
  localStorage.setItem('todos', JSON.stringify(todos));

/* UPDATE LOCAL STORAGE */
const updateTodos = (todos) => {
  // Save to Local Storage
  saveToLocalStorage(todos);
  // Render to screen
  renderTodos(todos);
};

/* GET FROM LOCAL STORAGE */
const getFromLocalStorage = () => {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
};

// Get from local storage
getFromLocalStorage();

// NEXT
/*
  1. Style <li>
  2. Style 'checked'
  3. Add DELETE function
  4. Add SaveToLocalStorage function
*/
