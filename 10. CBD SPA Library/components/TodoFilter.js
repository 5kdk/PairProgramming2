// eslint-disable-next-line import/no-cycle, import/extensions
import { state, setState } from '../state/state.js';

const filterTodos = id => {
  setState({ currentTodoFilterId: +id });
};

const TodoFilter = () => {
  const { todoFilter, currentTodoFilterId: filterId } = state;
  const $fragment = document.createElement('div');

  // prettier-ignore
  $fragment.innerHTML = `
    <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
    </ul>`.trim();

  $fragment.firstElementChild.onclick = e => {
    if (e.target.matches('.todo-filter > li')) filterTodos(e.target.dataset.filterId);
  };

  return $fragment.firstElementChild;
};

export default TodoFilter;
