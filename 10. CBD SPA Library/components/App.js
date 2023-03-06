// eslint-disable-next-line import/extensions
import updateDOM from '../library/diff.js';

class Todos {
  constructor($root) {
    this.$root = $root;
    this.state = { todos: [], todoFilter: [], currentTodoFilterId: 0 };

    this.initialize();
  }

  initialize() {
    this.setState({
      todos: [
        { id: 3, content: 'Javascript', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 1, content: 'HTML', completed: false },
      ],
      todoFilter: ['All', 'Completed', 'Active'],
      currentTodoFilterId: 0,
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    const newNodes = this.createDOM(this.state);
    const maxLength = Math.max(newNodes.length, this.$root.childNodes.length);

    for (let i = 0; i < maxLength; i++) {
      updateDOM(this.$root, newNodes[i], this.$root.childNodes[i]);
    }
  }

  createDOM() {
    const $fragment = document.createElement('div');

    [this.TodoInputEle(), this.todoListEle(), this.todoFilterEle()].forEach(ele => $fragment.appendChild(ele));

    return [...$fragment.childNodes];
  }
}

export default Todos;
