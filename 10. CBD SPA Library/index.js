// eslint-disable-next-line import/extensions
import Todo from './components/App.js';

const $root = document.getElementById('root');

const todo = new Todo($root);
todo.render();
