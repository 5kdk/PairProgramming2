const addStylesheet = () => {
  document
    .querySelector('script')
    .insertAdjacentHTML('beforebegin', `<link href="star-rating/theme.css" rel="stylesheet" />`);
};

// star rating 컴포넌트
const StarRating = $container => {
  const { maxRating } = $container.dataset;

  $container.innerHTML = `
    <div class="star-rating-container">
      ${"<i class='bx bxs-star'></i>".repeat(maxRating)}
    </div>`;
};

// 이벤트 헨들러, 콜백
const overOutCallback = e => {
  if (!e.target.matches('.star-rating-container > i')) return;

  const { children } = e.target.parentNode;
  const hoverIdx = [...children].indexOf(e.target);

  // prettier-ignore
  if(e.type === 'mouseover') [...children].forEach((star, idx) => { if (idx <= hoverIdx) star.classList.add('hovered') })
  else [...children].forEach(star => star.classList.remove('hovered'));
};

window.addEventListener('DOMContentLoaded', addStylesheet);
document.body.addEventListener('mouseover', overOutCallback);
document.body.addEventListener('mouseout', overOutCallback);
document.body.addEventListener('click', e => {
  if (!e.target.matches('.star-rating-container > i')) return;

  const { children } = e.target.parentNode;
  const clickIdx = [...children].indexOf(e.target);

  [...children].forEach((star, idx) => {
    star.classList.toggle('selected', idx <= clickIdx);
  });

  const rating = [...children].filter(star => star.classList.contains('selected')).length;
  const ratingChangeEvent = new CustomEvent('rating-change', { detail: rating });

  e.target.parentNode.parentNode.dispatchEvent(ratingChangeEvent);
});

export default StarRating;
