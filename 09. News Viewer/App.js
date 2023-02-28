/* eslint-disable import/extensions */
// do something!
import { Nav, NewsList } from './components/index.js';
import { initGlobalState, subscribe } from './state.js';

const $root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  $root.innerHTML = `
    <nav class="category-list"></nav>
    <div class="news-list-container">
      <article class="news-list"></article>
      <div class="scroll-observer">
        <img src="img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div>`;

  initGlobalState({ category: 'all' });

  Nav(document.querySelector('.category-list'));
  subscribe(NewsList.fetchArticles);
  NewsList.startObserving();
});
