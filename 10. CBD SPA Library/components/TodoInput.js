// eslint-disable-next-line import/no-cycle, import/extensions
import { state, setState } from '../state/state.js';

const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos] });
};

const TodoInput = () => {
  const $fragment = document.createElement('div');

  $fragment.innerHTML = '<input type="text" class="add" placeholder="Enter a task!"></input>';

  $fragment.firstElementChild.onkeydown = e => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' || !e.target.matches('.add')) return;

    const content = e.target.value.trim();
    e.target.value = '';

    if (content) addTodo(content);
  };

  return $fragment.firstElementChild;
};

export default TodoInput;
