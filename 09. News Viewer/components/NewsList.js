/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { state } from '../state.js';

const NewsList = (() => {
  const API_KEY = '5d62f4885aa74eb2a6674c56d41200d2';
  const MAX_PAGE = 5;

  let category = '';
  let page = 1;

  // prettier-ignore
  const render = posts => {
    const $observer = document.querySelector('.scroll-observer');
    const domStr = posts.map(({ url, urlToImage, title, description }) => `
      <article class="news-list">
        <section class="news-item">
          <div class="thumbnail">
            <a href="${url}" target="_blank" rel="noopener noreferrer">
              <img src="${urlToImage}" alt="thumbnail" />
            </a>
          </div>
          <div class="contents">
            <h2>
              <a href="${url}" target="_blank" rel="noopener noreferrer">
                ${title}
              </a>
            </h2>
            <p>
              ${description}
            </p>
          </div>
        </section>
      </article>`).join('');
    
    $observer.insertAdjacentHTML('beforebegin', domStr);
  };

  const fetchArticles = async () => {
    try {
      if (category !== state.category) {
        document.querySelector('.scroll-observer').style.display = 'none';
        page = 1;
        category = state.category;
        [...document.querySelectorAll('article')]?.forEach(article => article.remove());
      }

      const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
        category === 'all' ? '' : category
      }&page=${page}&pageSize=${MAX_PAGE}&apiKey=${API_KEY}`;
      const response = await axios.get(url);

      render(response.data.articles);
    } catch (error) {
      throw new Error(error);
    } finally {
      document.querySelector('.scroll-observer').style.display = 'block';
    }
  };

  // prettier-ignore
  const startObserving = () => {
    const $observer = new IntersectionObserver(entries => {
      if (entries[0].intersectingRatio === 1 || !entries[0].isIntersecting) return;
  
      page++;
      fetchArticles();
    }, { threshold: 0.7 });

    $observer.observe(document.querySelector('.scroll-observer'));
  };

  window.addEventListener('load', startObserving);

  return {
    fetchArticles,
  };
})();

export default NewsList;
