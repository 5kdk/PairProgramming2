// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoFilter extends Component {
  filterTodos(e) {
    if (!e.target.matches('.todo-filter > li')) return;

    this.setState({ currentTodoFilterId: +e.target.dataset.filterId });
  }

  render() {
    const { todoFilter, currentTodoFilterId: filterId } = this.props.state;

    this.addEvent('click', '.todo-filter.', this.filterTodos.bind(this.props));

    // prettier-ignore
    return `
      <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
      </ul>`;
  }
}

export default TodoFilter;
