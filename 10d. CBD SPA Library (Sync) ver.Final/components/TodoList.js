/* eslint-disable import/extensions */
import Component from '../core/Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  render() {
    const { todos, currentTodoFilterId: filterId } = this.props.state;
    const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));

    this.addEvent('change', '.todo-list', this.props.toggleTodo.bind(this.props));
    this.addEvent('click', '.remove', this.props.removeTodo.bind(this.props));

    return `
      <ul class="todo-list">
        ${filtered.map(todo => new TodoItem(todo).render()).join('')}
      </ul>`;
  }
}

export default TodoList;
