/* eslint-disable import/extensions */
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';
import diffAlgo from '../library/diff.js';

class Todo {
  constructor($root) {
    this.$root = $root;
    this.state = {
      todos: [
        { id: 3, content: 'Javascript', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 1, content: 'HTML', completed: false },
      ],
      todoFilter: ['All', 'Completed', 'Active'],
      currentTodoFilterId: 0,
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    const newNodes = [
      new TodoInput(this).getDomEle(),
      new TodoList(this).getDomEle(),
      new TodoFilter(this).getDomEle(),
    ];
    const maxLength = Math.max(newNodes.length, this.$root.childNodes.length);

    for (let i = 0; i < maxLength; i++) {
      diffAlgo(this.$root, newNodes[i], this.$root.childNodes[i]);
    }
  }
}

export default Todo;
