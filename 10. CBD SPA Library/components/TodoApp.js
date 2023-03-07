/* eslint-disable import/extensions */
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';
import diff from '../library/diff.js';

class TodoApp {
  constructor($root) {
    this.$root = $root;
    this.state = {};

    this.todoInput = new TodoInput(this);
    this.todoList = new TodoList(this);
    this.todoFilter = new TodoFilter(this);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  init() {
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

  render() {
    const newNodes = [this.todoInput.getElements(), this.todoList.getElements(), this.todoFilter.getElements()];

    diff(this.$root, newNodes, this.$root.childNodes);
  }
}

export default TodoApp;
