// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class TodoItem extends Component {
  constructor(todo) {
    super();
    this.todo = todo;
  }

  render() {
    const $fragment = document.createElement('template');
    const { id, completed, content } = this.todo;

    // prettier-ignore
    $fragment.innerHTML = `
      <li id="${id}">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}></input>
        <span class="${completed ? 'completed' : ''}">${content}</span>
        <button class="remove">X</button>
      </li>`

    return $fragment.innerHTML;
  }
}

export default TodoItem;
