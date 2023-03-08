// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoFilter extends Component {
  render() {
    const { todoFilter, currentTodoFilterId: filterId } = this.props.state;

    this.addEvent('click', '.todo-filter.', this.props.filterTodos.bind(this.props));

    // prettier-ignore
    return `
      <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
      </ul>`;
  }
}

export default TodoFilter;
