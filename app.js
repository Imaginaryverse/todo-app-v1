// CONSTANTS
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');
const footer = document.querySelector('.footer');

// ARRAY
let todos = [];

// EVENT LISTENERS
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const todoText = todoInput.value;
  addTodo(todoText);
});

clearBtn.addEventListener('click', () => {
  const emptyArray = [];

  updateTodos(emptyArray);
  getFromLocalStorage();
});

// FUNCTIONS
const checkListLength = (todos) =>
  todos.length < 1
    ? footer.classList.add('empty')
    : footer.classList.remove('empty');

const addTodo = (todoText) => {
  if (todoText !== '') {
    // Create todo
    todo = {
      id: Date.now(),
      text: todoText,
      complete: false,
    };

    // Append new todo to array
    todos.push(todo);
    // Update todos
    updateTodos(todos);
  }

  checkListLength(todos);

  // Clear input box
  todoInput.value = '';
};

/* RENDER TODOS */
const renderTodos = (todos) => {
  // Clear <ul>
  todoList.innerHTML = '';

  // Iterate through array of todos
  todos.forEach((todo, index) => {
    // Create list item
    const li = document.createElement('li');
    li.setAttribute('class', 'todo-item');
    li.setAttribute('data-key', todo.id);

    const upIsDisabled = index === 0;
    const downIsDisabled = index === todos.length - 1;
    const isComplete = todo.complete;

    // Specify HTML of <li>
    li.innerHTML = `
    <div class="arrow-container">
    <button class="up-btn" ${upIsDisabled ? 'disabled' : ''}>
    <i class="fas fa-arrow-up"></i>
    </button>
    <button class="down-btn" ${downIsDisabled ? 'disabled' : ''}>
    <i class="fas fa-arrow-down"></i>
    </button>
    </div>
    <div class="todo-item-form-wrapper">
    <form class="todo-item-form" action="submit">
    <input type="text" class="todo-item-input ${
      isComplete ? 'todo-complete' : ''
    }" id="TA-${todo.id}" value="${todo.text}"></input>
    </form>
    </div>
    <div class="btn-container">
    <button class="complete-btn">
    <i class="fas fa-check"></i>
    </button>
    <button class="delete-btn">
    <i class="fas fa-times"></i>
    </button>
    <button class="save-btn">
    <i class="far fa-save"></i></button>
    </div>`;

    const todoItemForm = li.querySelector('.todo-item-form');
    const todoItemInput = li.querySelector('.todo-item-input');
    const saveBtn = li.querySelector('.save-btn');
    const upBtn = li.querySelector('.up-btn');
    const downBtn = li.querySelector('.down-btn');
    const completeBtn = li.querySelector('.complete-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    saveBtn.classList.add('save-disabled');

    todoItemForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleEdit(todoItemInput, todo, todos);
    });
    todoItemInput.addEventListener('input', (e) => {
      const editedValue = e.target.value !== todo.text;

      if (editedValue) {
        saveBtn.classList.remove('save-disabled');
        completeBtn.classList.add('save-enabled');
        deleteBtn.classList.add('save-enabled');
      }
    });

    // SAVE BTN
    saveBtn.addEventListener('click', () =>
      handleEdit(todoItemInput, todo, todos)
    );

    // UP BTN
    upBtn.addEventListener('click', () => moveData(todos, index, index - 1));

    // DOWN BTN
    downBtn.addEventListener('click', () => moveData(todos, index, index + 1));

    // COMPLETE BTN
    completeBtn.addEventListener('click', () => handleComplete(todo, todos));

    // DELETE BTN
    deleteBtn.addEventListener('click', () => handleDelete(todo, todos));

    // Append <li> to <ul>
    todoList.append(li);
  });
};

/* moveData */
const moveData = (array, from, to) => {
  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  updateTodos(newArray);
};

/* handleEdit */
const handleEdit = (input, todo, todos) => {
  const newTodo = {
    ...todo,
    text: input.value,
  };

  const newTodos = todos.map((e) => {
    if (todo.id === e.id) {
      return newTodo;
    } else {
      return e;
    }
  });

  updateTodos(newTodos);
};

/* handleComplete */
const handleComplete = (todo, todos) => {
  const newTodo = {
    ...todo,
    complete: !todo.complete,
  };

  const newTodos = todos.map((e) => {
    if (todo.id == e.id) {
      return newTodo;
    } else {
      return e;
    }
  });
  updateTodos(newTodos);
};

/* handleDelete */
const handleDelete = (todo, todos) => {
  updateTodos(todos.filter((e) => todo.id !== e.id));
  getFromLocalStorage();
};

/* SAVE TO LOCAL STORAGE */
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

  checkListLength(todos);
};

// Get from local storage
getFromLocalStorage();
