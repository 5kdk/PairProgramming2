/* eslint-disable import/extensions */
import StarRating from './star-rating/index.js';

const $containers = [...document.querySelectorAll('.star-rating')];
const $currentRatings = document.querySelectorAll('.current-rating > span');

$containers.forEach(($container, i) => {
  StarRating($container);

  $container.addEventListener('rating-change', e => {
    const rating = e.detail;
    $currentRatings[i].textContent = rating;

    console.log('커스텀 이벤트');
  });
});
