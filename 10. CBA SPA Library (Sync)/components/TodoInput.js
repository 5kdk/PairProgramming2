// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoInput extends Component {
  generateId() {
    return Math.max(...this.props.state.todos.map(todo => todo.id), 0) + 1;
  }

  addTodo(content) {
    const newTodo = { id: this.generateId(), content, completed: false };
    this.props.setState({ todos: [newTodo, ...this.props.state.todos] });
  }

  on() {
    this.$fragment.content.firstElementChild.onkeydown = e => {
      if (e.isComposing || e.keyCode === 229) return;
      if (e.key !== 'Enter' || !e.target.matches('.add')) return;

      const content = e.target.value.trim();
      e.target.value = '';

      if (content) this.addTodo(content);
    };
  }

  render() {
    this.$fragment.innerHTML = '<input type="text" class="add" placeholder="Enter a task!"></input>';

    this.on();

    return this.$fragment.content.firstElementChild;
  }
}

export default TodoInput;
