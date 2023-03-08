// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoFilter extends Component {
  filterTodos(id) {
    this.props.setState({ currentTodoFilterId: +id });
  }

  on() {
    this.$fragment.content.firstElementChild.onclick = e => {
      if (e.target.matches('.todo-filter > li')) this.filterTodos(e.target.dataset.filterId);
    };
  }

  render() {
    const { todoFilter, currentTodoFilterId: filterId } = this.props.state;

    // prettier-ignore
    this.$fragment.innerHTML = `
      <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
      </ul>`;

    this.on();

    return this.$fragment.content.firstElementChild;
  }
}

export default TodoFilter;
