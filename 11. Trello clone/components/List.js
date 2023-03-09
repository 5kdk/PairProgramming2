/* eslint-disable import/extensions */
import Component from '../core/Component.js';
import Card from './Card.js';

class List extends Component {
  /* eslint-disable class-methods-use-this */
  render() {
    const { lists } = this.props.state;

    // prettier-ignore
    return `
    ${lists.map(({ title, cards }) => `
      <div class="list-wrapper" draggable="true">
        <div class="list-content">
          <div class="list-header">
            <h2>${title}</h2>
          </div>
          <ul class="list">
            ${cards.map(cardTitle => new Card(cardTitle).render()).join('')}
          </ul>
          <div class="list-footer">
            <button class="add-card-btn">+ Add a card</button>
            <form id="add-card-form" class="hidden">
              <input type="text" class="card-name-input"></input>
              <button form="add-card-form">Add list</button>
              <button class="close">X</button>
            </form>
          </div>
        </div>
      </div>`).join('')}}`
  }
}

export default List;
