// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoInput extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    this.addEvent('keydown', '.add', this.bindEvents(this.props.addTodo, this.props));

    return '<input type="text" class="add" placeholder="Enter a task!"></input>';
  }
}

export default TodoInput;
