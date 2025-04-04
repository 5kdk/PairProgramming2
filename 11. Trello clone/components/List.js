/* eslint-disable import/extensions */
import Component from '../core/Component.js';
import Card from './Card.js';
import AddListButton from './AddListButton.js';

class List extends Component {
  displayAddCardForm(e) {
    if (!e.target.closest('.list-content')) return;

    const { id: targetId } = e.target.closest('.list-wrapper').dataset;
    const newLists = this.state.lists.map(list => (list.id === +targetId ? { ...list, isAdding: true } : list));

    this.setState({ lists: newLists });
  }

  closeAddCardForm(e) {
    if (!e.target.matches('.add-card>button[type="button"]')) return;

    const { id: targetId } = e.target.closest('.list-wrapper').dataset;
    const newLists = this.state.lists.map(list => (list.id === +targetId ? { ...list, isAdding: false } : list));

    this.setState({ lists: newLists });
  }

  createNewCard(e) {
    e.preventDefault();
    if (!e.target.matches('.add-card')) return;

    const newCardTitle = e.target.firstElementChild.value.trim();
    if (!newCardTitle) return;

    e.target.firstElementChild.value = '';

    const { id: targetId } = e.target.closest('.list-wrapper').dataset;

    const newCard = { cardId: 999, cardTitle: newCardTitle, description: '' };
    const updatedLists = this.state.lists.map(list =>
      list.id === +targetId ? { ...list, cards: [...list.cards, newCard] } : list
    );

    this.setState({ lists: updatedLists });
  }

  render() {
    const { lists } = this.props.state;

    this.addEvent('click', '.add-card-btn', this.displayAddCardForm.bind(this.props));
    this.addEvent('click', '.add-card>button[type="button"]', this.closeAddCardForm.bind(this.props));
    this.addEvent('submit', '.add-card', this.createNewCard.bind(this.props));

    // prettier-ignore
    return `
      ${lists.map(({ id, title, cards, isAdding }) => `
        <div class="list-wrapper" data-id="${id}" draggable="true">
          <div class="list-content">
            <div class="list-header"> 
              <h2>${title}</h2>
            </div>
            <ul class="list">
              ${cards.map(card => new Card(card).render()).join('')}
            </ul>
            <button class="add-card-btn ${isAdding ? 'hidden' : ''}">➕ Add a card</button>
            <form class="add-form add-card ${isAdding ? '' : 'hidden'}">
              <textarea placeholder="Enter a new title."></textarea>
              <button type="submit">Add list</button>
              <button type="button">✖️</button>
            </form>
          </div>
        </div>`).join('')}
        ${new AddListButton(this.props).render()}`
  }
}

export default List;

// ${isEditingTitle ? '<input type="text" class="hidden" />' : `<h2>${title}</h2>`}
