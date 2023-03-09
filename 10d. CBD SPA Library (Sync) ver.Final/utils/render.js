/* eslint-disable import/extensions */
import diff from './diff.js';
import eventStorage from './eventStorage.js';

let $root = null;

const bindEvents = () => {
  eventStorage.forEach(({ eventType, handler }) => $root.addEventListener(`${eventType}`, handler));
};

const render = (newDOMStr, $container) => {
  if (!$root) $root = $container;

  const virtualDOM = $root.cloneNode(true);
  virtualDOM.innerHTML = newDOMStr;

  diff($root, [...virtualDOM.childNodes], [...$root.childNodes]);

  bindEvents();
};

export default render;
