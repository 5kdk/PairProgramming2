// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoItem extends Component {
  render() {
    const { id, completed, content } = this.props;

    // prettier-ignore
    this.$fragment.innerHTML = `
      <li id="${id}">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}></input>
        <span class="${completed ? 'completed' : ''}">${content}</span>
        <button class="remove">X</button>
      </li>`

    return this.$fragment.innerHTML;
  }
}

export default TodoItem;
