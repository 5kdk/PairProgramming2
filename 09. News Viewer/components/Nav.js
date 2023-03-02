/* eslint-disable import/extensions */
// do something!
import { state } from '../state.js';

const Nav = () => {
  const $nav = document.querySelector('.category-list');

  const categories = [
    { id: 'all', title: '전체보기' },
    { id: 'business', title: '비즈니스' },
    { id: 'entertainment', title: '엔터테인먼트' },
    { id: 'health', title: '건강' },
    { id: 'science', title: '과학' },
    { id: 'sports', title: '스포츠' },
    { id: 'technology', title: '기술' },
  ];

  // prettier-ignore
  $nav.innerHTML = `
    <ul>
    ${categories.map(({ id, title }) => `
      <li id="${id}" class="category-item ${id === state.category ? 'active' : ''}">${title}</li>`).join('')}
    </ul>`

  $nav.addEventListener('click', e => {
    if (!e.target.classList.contains('category-item')) return;

    $nav.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    state.category = e.target.id;
  });
};

export default Nav;
