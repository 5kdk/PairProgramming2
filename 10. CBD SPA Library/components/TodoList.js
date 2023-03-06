// eslint-disable-next-line import/extensions
import Todos from './App.js';

class TodoList extends Todos {
  constructor() {
    super();
    this.createEle();
  }

  toggleTodo(id) {
    const todos = this.state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
    this.setState({ todos });
  }

  removeTodo(id) {
    const todos = this.state.todos.filter(todo => todo.id !== +id);
    this.setState({ todos });
  }

  todoListEle = () => {
    const { todos, currentTodoFilterId: filterId } = this.state;
    const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));

    const $fragment = document.createElement('div');

    $fragment.innerHTML = `
    <ul class="todo-list">
      ${filtered
        .map(
          ({ id, content, completed }) => `
        <li id="${id}">
          <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}></input>
          <span class="${completed ? 'completed' : ''}">${content}</span>
          <button class="remove">X</button>
        </li>`
        )
        .join('')}
    </ul>
  `;

    $fragment.firstElementChild.onchange = e => {
      if (e.target.classList.contains('toggle')) this.toggleTodo(e.target.closest('li').id);
    };

    $fragment.firstElementChild.onclick = e => {
      if (e.target.classList.contains('remove')) this.removeTodo(e.target.closest('li').id);
    };

    return $fragment.firstElementChild;
  };
}

export default TodoList;
