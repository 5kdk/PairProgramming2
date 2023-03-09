/* eslint-disable import/extensions */
import Component from '../core/Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  toggleTodo(e) {
    if (!e.target.classList.contains('toggle')) return;

    const { id } = e.target.closest('li');
    const todos = this.state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));

    this.setState({ todos });
  }

  removeTodo(e) {
    if (!e.target.classList.contains('remove')) return;

    const { id } = e.target.closest('li');
    const todos = this.state.todos.filter(todo => todo.id !== +id);

    this.setState({ todos });
  }

  render() {
    const { todos, currentTodoFilterId: filterId } = this.props.state;
    const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));

    this.addEvent('change', '.todo-list', this.toggleTodo.bind(this.props));
    this.addEvent('click', '.remove', this.removeTodo.bind(this.props));

    return `
      <ul class="todo-list">
        ${filtered.map(todo => new TodoItem(todo).render()).join('')}
      </ul>`;
  }
}

export default TodoList;
