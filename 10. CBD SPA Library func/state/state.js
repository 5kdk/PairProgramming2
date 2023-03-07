// eslint-disable-next-line import/extensions, import/no-cycle
import render from '../index.js';

// eslint-disable-next-line import/no-mutable-exports
let state = {
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  todoFilter: ['All', 'Completed', 'Active'],
  currentTodoFilterId: 0,
};

const setState = newState => {
  state = { ...state, ...newState };
  render();
};

export { state, setState };
