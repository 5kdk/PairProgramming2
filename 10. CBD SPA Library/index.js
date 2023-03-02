// import { TodoFilter, TodoInput, TodoList } from './components/App.js';

let state = {
  todos: [],
  todoFilter: [],
  currentTodoFilterId: 0,
};

const $root = document.getElementById('root');

const getInitState = () => ({
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  todoFilter: ['All', 'Completed', 'Active'],
  currentTodoFilterId: 0,
});

// prettier-ignore
const createDOM = state => {
  const { todos, todoFilter, currentTodoFilterId: filterId } = state;
  const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));
  const $fragment = document.createElement('div');

  $fragment.innerHTML = `
    <input type="text" class="add" placeholder="Enter a task!"></input>
    <ul class="todo-list">
      ${filtered.map(({ id, content, completed }) => `
        <li id="${id}">
          <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}></input>
          <span class="${completed ? 'completed' : ''}">${content}</span>
          <button class="remove">X</button>
        </li>`).join('')}
    </ul>
    <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
    </ul>`.trim();

  return [...$fragment.childNodes];
};

const updateAttributes = (oldNode, newNode) => {
  if (newNode.checked !== oldNode.checked) oldNode.checked = newNode.checked;

  for (const { name, value } of [...newNode.attributes]) {
    if (value !== oldNode.getAttribute(name)) oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) === undefined) oldNode.removeAttribute(name);
  }
};

// update DOM
const updateDOM = (parent, newNode, oldNode) => {
  if (!newNode && oldNode) return oldNode.remove();

  if (newNode && !oldNode) return parent.appendChild(newNode);

  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }

  updateAttributes(oldNode, newNode);

  const newChildNodes = [...newNode.childNodes];
  const oldChildNodes = [...oldNode.childNodes];

  const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);
  for (let i = 0; i < maxLength; i++) {
    updateDOM(oldNode, newChildNodes[i], oldChildNodes[i]);
  }
};

const setState = newState => {
  state = { ...state, ...newState };

  const newNodes = createDOM(state);
  const maxLength = Math.max(newNodes.length, $root.childNodes.length);

  for (let i = 0; i < maxLength; i++) {
    updateDOM($root, newNodes[i], $root.childNodes[i]);
  }
};

const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos] });
};

const toggleTodo = id => {
  const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  setState({ todos });
};

const removeTodo = id => {
  const todos = state.todos.filter(todo => todo.id !== +id);
  setState({ todos });
};

const filterTodos = id => {
  setState({ currentTodoFilterId: +id });
};

document.addEventListener('DOMContentLoaded', () => {
  setState(getInitState());
});

$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.add')) return;

  const content = e.target.value.trim();
  e.target.value = '';

  if (content) addTodo(content);
});

$root.addEventListener('change', e => {
  if (e.target.classList.contains('toggle')) toggleTodo(e.target.closest('li').id);
});

$root.addEventListener('click', e => {
  if (e.target.classList.contains('remove')) removeTodo(e.target.closest('li').id);
});

$root.addEventListener('click', e => {
  if (e.target.matches('.todo-filter > li')) filterTodos(e.target.dataset.filterId);
});
