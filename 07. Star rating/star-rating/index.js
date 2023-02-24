const starStylesheet = () => {
  document
    .querySelector('script')
    .insertAdjacentHTML('beforebegin', `<link href="star-rating/theme.css" rel="stylesheet" />`);
};

const StarRating = $container => {
  const { maxRating } = $container.dataset;

  $container.innerHTML = `
    <div class="star-rating-container">
      ${"<i class='bx bxs-star'></i>".repeat(maxRating)}
    </div>`;
};

const starHandler = e => {
  if (!e.target.matches('.star-rating-container > i')) return;

  const $stars = [...e.target.parentNode.children];
  const eventIdx = $stars.indexOf(e.target);

  const handleMouseover = () => $stars.forEach((star, idx) => star.classList.toggle('hovered', idx <= eventIdx));

  const handleMouseout = () => $stars.forEach(star => star.classList.remove('hovered'));

  const handleClick = () => {
    $stars.forEach((star, idx) => star.classList.toggle('selected', idx <= eventIdx));

    const rating = eventIdx + 1;
    const ratingChange = new CustomEvent('rating-change', { detail: rating });

    e.target.parentNode.parentNode.dispatchEvent(ratingChange);
  };

  if (e.type === 'mouseover') handleMouseover();
  if (e.type === 'mouseout') handleMouseout();
  if (e.type === 'click') handleClick();
};

document.addEventListener('DOMContentLoaded', starStylesheet);
document.addEventListener('mouseover', starHandler);
document.addEventListener('mouseout', starHandler);
document.addEventListener('click', starHandler);

export default StarRating;
