/* eslint-disable import/extensions */
// do something!
import { state } from '../state.js';

const Nav = $nav => {
  $nav.innerHTML = `
      <ul>
        <li id="all" class="category-item active">전체보기</li>
        <li id="business" class="category-item">비즈니스</li>
        <li id="entertainment" class="category-item">엔터테인먼트</li>
        <li id="health" class="category-item">건강</li>
        <li id="science" class="category-item">과학</li>
        <li id="sports" class="category-item">스포츠</li>
        <li id="technology" class="category-item">기술</li>
      </ul>`;

  $nav.addEventListener('click', e => {
    if (!e.target.classList.contains('category-item')) return;

    $nav.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    state.category = e.target.id;
  });
};

export default Nav;
