/* eslint-disable import/extensions */
/* eslint-disable-next-line import/no-cycle */
import { TodoInput, TodoList, TodoFilter } from './components/App.js';
import { setState } from './state/state.js';

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
const createDOM = () => {
  const $fragment = document.createElement('div');

  [TodoInput(), TodoList(), TodoFilter()].forEach(dom => $fragment.appendChild(dom));

  return [...$fragment.childNodes];
};

setState(getInitState());

export default createDOM;
