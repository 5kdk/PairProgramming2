/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { state, subscribe } from '../state.js';

const NewsList = () => {
  const $newsList = document.querySelector('.news-list');
  const $observer = document.querySelector('.scroll-observer');

  const API_KEY = '5d62f4885aa74eb2a6674c56d41200d2';
  const MAX_PAGE = 5;

  let localCategory = '';
  let page = 1;

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

    $observer.style.display = 'none';
    page = 1;
    localCategory = state.category;
    $newsList.innerHTML = '';
  };

  // prettier-ignore
  const fetchArticles = async () => {
    try {
      handleCategoryChange();
      const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${localCategory === 'all' ? '' : localCategory}&page=${page}&pageSize=${MAX_PAGE}&apiKey=${API_KEY}`;
      const response = await axios.get(url);
      $newsList.insertAdjacentHTML('beforeend', createDOMStr(response.data.articles));
    } catch (error) {
      throw new Error(error);
    } finally {
      $observer.style.display = 'block';
    }
  };

  // prettier-ignore
  const startObserving = () => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].intersectingRatio === 1 || !entries[0].isIntersecting) return;

      page += 1;
      fetchArticles();
    }, { threshold: 0.8 });

    observer.observe($observer);
  };

  startObserving();
  subscribe(fetchArticles);
};

export default NewsList;

// 퍼포먼스에 많은 영향을 미치는 이미지들이 많을때 이를 관리하려면?
// lazy loading 솔루션 (ex: 100px to 2560px)
