/* eslint-disable import/extensions, import/no-cycle */
import createDOM from '../index.js';
import updateDOM from '../library/diff.js';

const $root = document.getElementById('root');

// eslint-disable-next-line import/no-mutable-exports
let state = {
  todos: [],
  todoFilter: [],
  currentTodoFilterId: 0,
};

const setState = newState => {
  state = { ...state, ...newState };

  const newNodes = createDOM(state);
  const maxLength = Math.max(newNodes.length, $root.childNodes.length);

  for (let i = 0; i < maxLength; i++) {
    updateDOM($root, newNodes[i], $root.childNodes[i]);
  }
};

export { state, setState };
