/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { state } from '../state.js';

const NewsList = (() => {
  let localCategory = '';
  let page = 1;

  const API_KEY = '5d62f4885aa74eb2a6674c56d41200d2';
  const MAX_PAGE = 5;

  // prettier-ignore
  const createDOMStr = posts => `${posts.map(({ url, urlToImage, title, description }) => `
    <section class="news-item">
      <div class="thumbnail">
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          <img src="${urlToImage}" onerror="this.onerror=null; this.src='https://via.placeholder.com/160x100';" alt="thumbnail">
        </a>
      </div>
      <div class="contents">
        <h2>
          <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>
        </h2>
        <p>${description ?? 'Click to read article.'}</p>
      </div>
    </section>`).join('')}`

  const handleCategoryChange = () => {
    if (localCategory === state.category) return;

    document.querySelector('.scroll-observer').style.display = 'none';
    page = 1;
    localCategory = state.category;
    document.querySelector('.news-list').innerHTML = '';
  };

  // prettier-ignore
  const fetchArticles = async () => {
    try {
      handleCategoryChange();
      const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${localCategory === 'all' ? '' : localCategory}&page=${page}&pageSize=${MAX_PAGE}&apiKey=${API_KEY}`;
      const response = await axios.get(url);
      document.querySelector('.news-list').insertAdjacentHTML('beforeend', createDOMStr(response.data.articles));
    } catch (error) {
      throw new Error(error);
    } finally {
      document.querySelector('.scroll-observer').style.display = 'block';
    }
  };

  // prettier-ignore
  const startObserving = () => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].intersectingRatio === 1 || !entries[0].isIntersecting) return;

      page += 1;
      fetchArticles();
    }, { threshold: 0.8 });

    observer.observe(document.querySelector('.scroll-observer'));
  };

  return {
    fetchArticles,
    startObserving,
  };
})();

export default NewsList;
