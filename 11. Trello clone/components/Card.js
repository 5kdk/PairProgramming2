// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class Card extends Component {
  render() {
    const { cardId, cardTitle, description } = this.props;

    return `
      <li data-id="${cardId}" class="card" draggable="true">
        <div>
          <span>${cardTitle}</span>
          <input class="hidden" />
          <i class="bi bi-pencil"></i>
        </div>
        ${description ? '<i class="bi bi-list-nested"></i>' : ''}
      </li>
    `;
  }
}

export default Card;
