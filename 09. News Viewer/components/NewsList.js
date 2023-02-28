/* eslint-disable no-undef */
// do something!
const NewsList = $root => {
  const API_KEY = '5d62f4885aa74eb2a6674c56d41200d2';
  const MAX_PAGE = 5;

  let category = '';
  let page = 1;

  // prettier-ignore
  const initialize = () => {
    $root.innerHTML += `
      <div class="news-list-container">
        <div class="scroll-observer">
          <img src="img/ball-triangle.svg" alt="Loading..." />
        </div>
      </div>`;
  };

  // prettier-ignore
  const render = posts => {
    const $observer = document.querySelector('.scroll-observer');
    const domStr = posts.map(post => `
      <article class="news-list">
        <section class="news-item">
          <div class="thumbnail">
            <a href="${post.url}" target="_blank" rel="noopener noreferrer">
              <img src="${post.urlToImage}" alt="thumbnail" />
            </a>
          </div>
          <div class="contents">
            <h2>
              <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                ${post.title}
              </a>
            </h2>
            <p>
              ${post.description}
            </p>
          </div>
        </section>
      </article>`).join('');

    $observer.insertAdjacentHTML('beforebegin', domStr);
  };

  const fetchArticles = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&page=${page}&pageSize=${MAX_PAGE}&apiKey=${API_KEY}`;
      const response = await axios.get(url);
      render(response.data.articles);
      console.log('fetch 데이터 중');
    } catch (error) {
      throw new Error(error);
    }
  };

  const infiniteScroll = entries => {
    if (entries[0].intersectingRatio === 1) return;
    if (!entries[0].isIntersecting) return;

    page++;
    fetchArticles();
  };

  const startObserving = () => {
    const $observer = new IntersectionObserver(infiniteScroll, { threshold: 0.7 });
    const target = document.querySelector('.scroll-observer');

    $observer.observe(target);
  };

  document.addEventListener('DOMContentLoaded', () => {
    initialize();
    startObserving();
  });

  $root.addEventListener('category-change', e => {
    page = 1;
    category = e.detail.id === 'all' ? '' : e.detail.id;

    $root.querySelector('.news-list-container').remove();
    initialize();
    startObserving();
  });
};

export default NewsList;
