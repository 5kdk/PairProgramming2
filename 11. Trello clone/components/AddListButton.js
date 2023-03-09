// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class AddListButton extends Component {
  displayAddListForm(e) {
    if (e.target.closest('.empty')) this.setState({ isAddingList: true });
  }

  closeAddListForm(e) {
    if (!e.target.matches('.add-list-close')) return;

    this.setState({ isAddingList: false });
  }

  createNewList(e) {
    e.preventDefault();
    if (!e.target.matches('#add-new-list')) return;

    const newListTitle = e.target.firstElementChild.value.trim();
    if (!newListTitle) return;

    e.target.firstElementChild.value = '';

    const nextListId = Math.max(...this.state.lists.map(list => list.id)) + 1 || 0;

    this.setState({
      lists: [...this.state.lists, { id: nextListId, title: newListTitle, cards: [], isAdding: false }],
    });
  }

  /* eslint-disable class-methods-use-this */
  render() {
    const { isAddingList } = this.props.state;

    this.addEvent('click', '.empty', this.displayAddListForm.bind(this.props));
    this.addEvent('submit', '#add-new-list', this.createNewList.bind(this.props));
    this.addEvent('click', '.add-list-close', this.closeAddListForm.bind(this.props));

    return `
      <div class="list-wrapper">
        <div class="list-content add-list ${isAddingList ? '' : 'empty'}">
          <div class="add-list-txt ${isAddingList ? 'hidden' : ''}">➕ Add another list</div>
          <form id="add-new-list" class="${isAddingList ? '' : 'hidden'}" >
            <input type="text" class="new-list-name-input">
            <button type="submit">Add list</button>
            <button type="button" class="add-list-close">✖️</button>  
          </form>
        </div>
      </div>`;
  }
}

export default AddListButton;
