// https://githut.info
const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

// do something!
const Swappable = $container => {
  let state = {
    current: [...languages],
  };

  let dragIdx = 0;
  let dropIdx = 0;

  // prettier-ignore
  const render = () => {
    $container.innerHTML = `
    <ul class="draggable-list">
    ${state.current.map((language, idx) => `
      <li class="${language === languages[idx] ? 'right' : 'wrong'}">
        <div class="seq">${idx + 1}</div>
        <div class="draggable" draggable="true">
          <p class="language-name">${language}</p>
          <i class="bx bx-menu"></i>
        </div>
      </li>`).join('')}
    </ul>`;
  };

  const setState = newState => {
    state = { ...state, ...newState };
    render();
  };

  const initShuffle = () => {
    let randomNum = Math.floor(Math.random() * state.current.length);
    let randomized = [];

    while (state.current.length) {
      randomized = [...randomized, state.current.splice(randomNum, 1)[0]];
      randomNum += 1;
      if (randomNum >= state.current.length) randomNum = 0;
    }

    setState({ current: randomized });
  };

  const swapRank = () => {
    const swapped = [...state.current];
    swapped[dragIdx] = state.current[dropIdx];
    swapped[dropIdx] = state.current[dragIdx];

    setState({ current: swapped });
  };

  window.addEventListener('DOMContentLoaded', initShuffle);

  $container.addEventListener('dragstart', e => {
    if (e.target.closest('li')) dragIdx = state.current.indexOf(e.target.firstElementChild.textContent);
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
    if (e.target.matches('.draggable')) return;

    e.target.closest('li').classList.remove('over');
    dropIdx = state.current.indexOf(e.target.firstElementChild.textContent);

    swapRank();
  });
};

export default Swappable;
