const controlView = (() => {
  let isOpened = false;

  const $nav = document.querySelector('nav');

  const initRender = () => {
    isOpened = JSON.parse(localStorage.getItem('open-status')) ?? isOpened;

    $nav.classList.toggle('active', isOpened);
    document.body.style.visibility = 'visible';
  };

  const toggleNav = () => {
    document.body.classList.remove('preload');
    $nav.classList.toggle('active');
    isOpened = !isOpened;
  };

  const setNavOpenStatus = () => localStorage.setItem('open-status', isOpened);

  return e => {
    if (e.type === 'DOMContentLoaded') initRender();

    if (e.type === 'click') toggleNav();

    if (e.type === 'beforeunload') setNavOpenStatus();
  };
})();

document.addEventListener('DOMContentLoaded', controlView);
document.querySelector('.toggle').addEventListener('click', controlView);
window.addEventListener('beforeunload', controlView);
