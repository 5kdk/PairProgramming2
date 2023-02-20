const controlView = (() => {
  let isOpened = false;

  const $nav = document.querySelector('nav');

  const initRender = () => {
    // prettier-ignore
    isOpened = JSON.parse(window.localStorage.getItem('open-status')) ?? isOpened;

    $nav.classList.toggle('active', isOpened);
    document.body.style.visibility = 'visible';

    setTimeout(() => {
      document.body.classList.remove('preload');
    });
  };

  const toggleNavBar = () => {
    $nav.classList.toggle('active');
    isOpened = !isOpened;
    window.localStorage.setItem('open-status', isOpened);
  };

  return (e) => {
    if (e.type === 'DOMContentLoaded') initRender();
    else toggleNavBar();
  };
})();

window.addEventListener('DOMContentLoaded', controlView);
document.querySelector('.toggle').addEventListener('click', controlView);
