// eslint-disable-next-line import/extensions
import Todos from './App.js';

class TodoFilter extends Todos {
  constructor() {
    super();
    this.createEle();
  }

  filter(id) {
    this.setState({ currentTodoFilterId: +id });
  }

  TodoFilterEle() {
    const { todoFilter, currentTodoFilterId: filterId } = this.state;
    const $fragment = document.createElement('div');

    // prettier-ignore
    $fragment.innerHTML = `
    <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
    </ul>`.trim();

    $fragment.firstElementChild.onclick = e => {
      if (e.target.matches('.todo-filter > li')) this.filterTodos(e.target.dataset.filterId);
    };

    return $fragment.firstElementChild;
  }
}

export default TodoFilter;
