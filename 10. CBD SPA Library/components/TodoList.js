// eslint-disable-next-line import/no-cycle, import/extensions
import { state, setState } from '../state/state.js';

const toggleTodo = id => {
  const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  setState({ todos });
};

const removeTodo = id => {
  const todos = state.todos.filter(todo => todo.id !== +id);
  setState({ todos });
};

const TodoList = () => {
  const { todos, currentTodoFilterId: filterId } = state;
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
    if (e.target.classList.contains('toggle')) toggleTodo(e.target.closest('li').id);
  };

  $fragment.firstElementChild.onclick = e => {
    if (e.target.classList.contains('remove')) removeTodo(e.target.closest('li').id);
  };

  return $fragment.firstElementChild;
};

export default TodoList;
