// https://githut.info
const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

// do !something
const Swappable = $container => {
  let dragIdx = 0;
  let dropIdx = 0;
  let state = {
    current: [...languages],
  };

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

  const initialize = () => {
    let randomNum = Math.floor(Math.random() * state.current.length);
    let randomized = [];

    while (state.current.length) {
      randomized = [...randomized, state.current.splice(randomNum, 1)[0]];
      randomNum += 1;
      if (randomNum >= state.current.length) randomNum = 0;
    }

    setState({ current: randomized });
  };

  const changeIdx = () => {
    const temp = [...state.current];
    temp[dragIdx] = state.current[dropIdx];
    temp[dropIdx] = state.current[dragIdx];

    setState({ current: temp });
  };

  window.addEventListener('DOMContentLoaded', initialize);

  $container.addEventListener('dragstart', e => {
    if (e.target.closest('li')) dragIdx = state.current.indexOf(e.target.firstElementChild.textContent);
  });

  $container.addEventListener('dragover', e => {
    e.preventDefault();
  });

  $container.addEventListener('dragenter', e => {
    if (e.target.closest('li')) e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('dragleave', e => {
    if (e.target.closest('li')) e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('drop', e => {
    e.preventDefault();

    e.target.closest('li').classList.remove('over');
    dropIdx = state.current.indexOf(e.target.firstElementChild.textContent);

    changeIdx();
  });
};

export default Swappable;
