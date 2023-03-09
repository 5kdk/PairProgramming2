/* eslint-disable import/extensions */
import Component from './core/Component.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';

class App extends Component {
  state = {
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
    todoFilter: ['All', 'Completed', 'Active'],
    currentTodoFilterId: 0,
  };

  render() {
    return `
      ${new TodoInput(this)}
      ${new TodoList(this)}
      ${new TodoFilter(this)}
    `;
  }
}

export default App;
