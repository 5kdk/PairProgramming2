/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-cycle
import { state, setState } from './state/state.js';
import { TodoInput, TodoList, TodoFilter } from './components/App.js';
import updateDOM from './library/diff.js';

const $root = document.getElementById('root');

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

// prettier-ignore
const createNewDOM = () => {
  const $fragment = document.createElement('div');

  [TodoInput(callBackHandler), TodoList(state, callBackHandler), TodoFilter(state, callBackHandler)].forEach(dom =>
    $fragment.appendChild(dom)
  );

  return [...$fragment.childNodes];
};

const render = () => {
  const newNodes = createNewDOM();
  const maxLength = Math.max(newNodes.length, $root.childNodes.length);

  for (let i = 0; i < maxLength; i++) {
    updateDOM($root, newNodes[i], $root.childNodes[i]);
  }
};

render();

export default render;
