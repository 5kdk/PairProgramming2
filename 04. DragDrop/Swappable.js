// https://githut.info
const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

// do something!
const Swappable = $container => {
  let $startEl = null;
  let $endEl = null;

  // prettier-ignore
  const render = _languages => {
    $container.innerHTML = `
      <ul class="draggable-list">
      ${_languages.map((language, idx) => `
        <li class="${language === languages[idx] ? 'right' : 'wrong'}">
          <div class="seq">${idx + 1}</div>
          <div class="draggable" draggable="true">
            <p class="language-name">${language}</p>
            <i class="bx bx-menu"></i>
          </div>
        </li>`).join('')}
      </ul>`;
  };

  const initShuffle = () => {
    const _languages = [...languages];
    let randomNum = Math.floor(Math.random() * _languages.length);
    let randomized = [];

    while (_languages.length) {
      randomized = [...randomized, _languages.splice(randomNum, 1)[0]];
      randomNum += 1;
      if (randomNum >= _languages.length) randomNum = 0;
    }

    render(randomized);
  };

  const swapRank = ($startEl, $endEl) => {
    const copiedStartEl = $startEl.innerHTML;

    $startEl.innerHTML = $endEl.innerHTML;
    $endEl.innerHTML = copiedStartEl;

    [$startEl, $endEl].forEach($el => {
      const _idx = $el.closest('li').firstElementChild.textContent - 1;
      $el.closest('li').className = $el.textContent === languages[_idx] ? 'right' : 'wrong';
    });
  };

  document.addEventListener('DOMContentLoaded', initShuffle);

  $container.addEventListener('dragstart', e => {
    if (e.target.closest('li')) $startEl = e.target.firstElementChild;
  });

  $container.addEventListener('dragover', e => {
    e.preventDefault();
  });

  $container.addEventListener('dragenter', e => {
    e.preventDefault();
    if (e.target.closest('li')) e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('dragleave', e => {
    e.preventDefault();
    if (e.target.closest('li')) e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('drop', ({ target }) => {
    target.closest('li').classList.remove('over');

    if (!target.closest('.draggable')) return;

    $endEl = target.matches('.draggable') ? target.firstElementChild : target.parentNode.firstElementChild;
    swapRank($startEl, $endEl);
  });
};

export default Swappable;
