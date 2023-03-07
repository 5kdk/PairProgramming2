/* eslint-disable import/extensions */
import Component from '../core/Component.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';

class App extends Component {
  constructor($root) {
    super();
    this.$root = $root;
    this.state = {};

    this.todoInput = new TodoInput(this);
    this.todoList = new TodoList(this);
    this.todoFilter = new TodoFilter(this);
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
    const newNodes = [this.todoInput.render(), this.todoList.render(), this.todoFilter.render()];

    this.diff(this.$root, newNodes, this.$root.childNodes);
  }
}

export default App;
