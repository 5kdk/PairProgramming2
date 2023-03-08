// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoItem extends Component {
  render() {
    const { id, completed, content } = this.props;

    return `
      <li id="${id}">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}></input>
        <span class="${completed ? 'completed' : ''}">${content}</span>
        <button class="remove">X</button>
      </li>`;
  }
}

export default TodoItem;
