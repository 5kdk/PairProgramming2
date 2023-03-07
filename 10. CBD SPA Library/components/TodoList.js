/* eslint-disable import/extensions */
import Component from '../core/Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  toggleTodo(id) {
    const todos = this.props.state.todos.map(todo =>
      todo.id === +id ? { ...todo, completed: !todo.completed } : todo
    );

    this.props.setState({ todos });
  }

  removeTodo(id) {
    const todos = this.props.state.todos.filter(todo => todo.id !== +id);

    this.props.setState({ todos });
  }

  render() {
    const { todos, currentTodoFilterId: filterId } = this.props.state;
    const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));
    const $fragment = document.createElement('template');

    $fragment.innerHTML = `
      <ul class="todo-list">
        ${filtered.map(todo => new TodoItem(todo).render()).join('')}
      </ul>`;

    $fragment.content.firstElementChild.onchange = e => {
      if (e.target.classList.contains('toggle')) this.toggleTodo(e.target.closest('li').id);
    };

    $fragment.content.firstElementChild.onclick = e => {
      if (e.target.classList.contains('remove')) this.removeTodo(e.target.closest('li').id);
    };

    return $fragment.content.firstElementChild;
  }
}

export default TodoList;
