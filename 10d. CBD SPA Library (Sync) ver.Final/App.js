/* eslint-disable import/extensions */
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';
import Component from './core/Component.js';

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

  // eslint-disable-next-line class-methods-use-this
  render() {
    return `
      ${new TodoInput(this).render() + new TodoList(this).render() + new TodoFilter(this).render()}
    `;
  }

  generateId() {
    return Math.max(...this.state.todos.map(todo => todo.id), 0) + 1;
  }

  addTodo(e) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' || !e.target.matches('.add')) return;

    const content = e.target.value.trim();
    e.target.value = '';

    const newTodo = { id: this.generateId(), content, completed: false };
    this.setState({ todos: [newTodo, ...this.state.todos] });
  }

  filterTodos(e) {
    if (!e.target.matches('.todo-filter > li')) return;

    this.setState({ currentTodoFilterId: +e.target.dataset.filterId });
  }

  toggleTodo(e) {
    if (!e.target.classList.contains('toggle')) return;

    const { id } = e.target.closest('li');
    const todos = this.state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));

    this.setState({ todos });
  }

  removeTodo(e) {
    if (!e.target.classList.contains('remove')) return;

    const { id } = e.target.closest('li');
    const todos = this.state.todos.filter(todo => todo.id !== +id);

    this.setState({ todos });
  }
}

export default App;
