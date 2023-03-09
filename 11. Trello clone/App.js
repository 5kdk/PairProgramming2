/* eslint-disable import/extensions */
import Component from './core/Component.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import List from './components/List.js';

class App extends Component {
  state = {
    lists: [
      {
        title: 'Things to do',
        cards: ['JavaScript', 'Trello'],
      },
      {
        title: '트릴로 조지기',
        cards: ['오늘 할수있을까', '너무 좋다'],
      },
      {
        title: '집가서 할거',
        cards: ['잠', '잠'],
      },
    ],
  };

  // prettier-ignore
  render() {
    return `
      ${new Header().render()}
      <div class="board">
        ${new List(this).render()}
        ${new Footer().render()}
      </div>`;
  }
}

export default App;
