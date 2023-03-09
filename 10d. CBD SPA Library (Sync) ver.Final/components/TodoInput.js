// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoInput extends Component {
  addTodo(e) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' || !e.target.matches('.add')) return;

    const content = e.target.value.trim();
    e.target.value = '';

    const newTodo = { id: Math.max(...this.state.todos.map(todo => todo.id), 0) + 1, content, completed: false };
    this.setState({ todos: [newTodo, ...this.state.todos] });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    this.addEvent('keydown', '.add', this.addTodo.bind(this.props));

    return '<input type="text" class="add" placeholder="Enter a task!"></input>';
  }
}

export default TodoInput;
