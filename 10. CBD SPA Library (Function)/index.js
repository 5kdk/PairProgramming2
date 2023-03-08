/* eslint-disable import/extensions */
import { TodoInput, TodoList, TodoFilter } from './components/App.js';
import diff from './library/diff.js';

const $root = document.getElementById('root');

let state = {
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  todoFilter: ['All', 'Completed', 'Active'],
  currentTodoFilterId: 0,
};

const render = () => {
  const newNodes = [TodoInput(), TodoList(state), TodoFilter(state)];

  diff($root, newNodes, $root.childNodes);
};

const setState = newState => {
  state = { ...state, ...newState };
  render();
};

const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const callBackHandler = {
  addTodo: content => {
    const newTodo = { id: generateId(), content, completed: false };
    setState({ todos: [newTodo, ...state.todos] });
  },

  toggleTodo: id => {
    const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
    setState({ todos });
  },

  removeTodo: id => {
    const todos = state.todos.filter(todo => todo.id !== +id);
    setState({ todos });
  },

  filterTodos: id => {
    setState({ currentTodoFilterId: +id });
  },
};

$root.onkeydown = e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.add')) return;

  const content = e.target.value.trim();
  e.target.value = '';

  if (content) callBackHandler.addTodo(content);
};

$root.onclick = e => {
  if (e.target.classList.contains('remove')) callBackHandler.removeTodo(e.target.closest('li').id);
  if (e.target.matches('.todo-filter > li')) callBackHandler.filterTodos(e.target.dataset.filterId);
};

$root.onchange = e => {
  if (e.target.classList.contains('toggle')) callBackHandler.toggleTodo(e.target.closest('li').id);
};

render();

export default render;
