// https://githut.info
const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

// do something!
const Swappable = $container => {
  let $dragStart = null;
  let $dragEnd = null;

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

  const swapRank = ($dragStart, $dragEnd) => {
    const temp = $dragStart.innerHTML;
    $dragStart.innerHTML = $dragEnd.innerHTML;
    $dragEnd.innerHTML = temp;

    const dragStartIdx = $dragStart.closest('li').firstElementChild.textContent - 1;
    const dragEndIdx = $dragEnd.closest('li').firstElementChild.textContent - 1;

    $dragStart.closest('li').className = $dragStart.textContent === languages[dragStartIdx] ? 'right' : 'wrong';
    $dragEnd.closest('li').className = $dragEnd.textContent === languages[dragEndIdx] ? 'right' : 'wrong';
  };

  window.addEventListener('DOMContentLoaded', initShuffle);

  $container.addEventListener('dragstart', e => {
    if (e.target.closest('li')) $dragStart = e.target.firstElementChild;
  });

  $container.addEventListener('dragover', e => {
    e.preventDefault();
  });

  $container.addEventListener('dragenter', e => {
    if (!e.target.matches('.draggable') || !e.target.closest('li')) return;

    e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('dragleave', e => {
    if (!e.target.matches('.draggable') || !e.target.closest('li')) return;

    e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('drop', e => {
    if (!e.target.matches('.draggable')) return;

    e.target.closest('li').classList.remove('over');
    $dragEnd = e.target.firstElementChild;

    swapRank($dragStart, $dragEnd);
  });
};

export default Swappable;
