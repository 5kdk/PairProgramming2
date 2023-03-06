// eslint-disable-next-line import/extensions
import Todos from './App.js';

class TodoInput extends Todos {
  constructor() {
    super();

    this.createEle();
  }

  generateId() {
    return Math.max(...this.state.todos.map(todo => todo.id), 0) + 1;
  }

  addTodo(content) {
    const newTodo = { id: this.generateId(this.state), content, completed: false };
    this.setState({ todos: [newTodo, ...this.state.todos] });
  }

  TodoInputEle() {
    const $fragment = document.createElement('div');

    $fragment.innerHTML = '<input type="text" class="add" placeholder="Enter a task!"></input>';

    $fragment.firstElementChild.onkeydown = e => {
      if (e.isComposing || e.keyCode === 229) return;
      if (e.key !== 'Enter' || !e.target.matches('.add')) return;

      const content = e.target.value.trim();
      e.target.value = '';

      if (content) this.addTodo(content);
    };

    return $fragment.firstElementChild;
  }
}

export default TodoInput;
