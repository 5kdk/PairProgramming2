// eslint-disable-next-line import/extensions
import TodoApp from './components/TodoApp.js';

const $root = document.getElementById('root');

const todos = new TodoApp($root);
todos.init();
