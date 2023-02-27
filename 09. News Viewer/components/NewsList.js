// do something!
const NewsList = $root => {
  const API_KEY = '3fb91bc39b5a462f93b8e29ae16f03d3';
  const MAX_PAGE = 5;

  let category = '';
  let page = 1;

  const render = posts => {
    if (!document.querySelector('.news-list-container')) {
      $root.innerHTML += `
        <div class="news-list-container">
          <div class="scroll-observer">
            <img src="img/ball-triangle.svg" alt="Loading..." />
          </div>
        </div>`;
    }

    posts.forEach(post => {
      const $article = document.createElement('article');
      $article.classList.add('news-list');

      $article.innerHTML = `
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
        </article>
        `;
      document.querySelector('.scroll-observer').before($article);
    });
  };

  const fetchArticles = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&page=${page}&pageSize=${MAX_PAGE}&apiKey=${API_KEY}`;
      // eslint-disable-next-line no-undef
      const response = await axios.get(url);

      render(response.data.articles);
    } catch (error) {
      throw new Error(error, '데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const infiniteScroll = () => {
    page++;
    fetchArticles();
  };

  document.addEventListener('DOMContentLoaded', async () => {
    await fetchArticles();

    const $observer = new IntersectionObserver(infiniteScroll, { threshold: 0.7 });
    const target = document.querySelector('.scroll-observer');

    $observer.observe(target);
  });

  $root.addEventListener('category-change', async e => {
    page = 1;
    category = e.detail.id;

    document.querySelector('.news-list-container').innerHTML = '';
    await fetchArticles();
  });
};

export default NewsList;
