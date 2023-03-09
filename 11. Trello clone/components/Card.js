// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class Card extends Component {
  render() {
    return `
      <li class="card" draggable="true">
        <span>${this.props}</span>
        <input class="hidden" />
        <i class="bi bi-pencil hidden"></i>
      </li>`;
  }
}

export default Card;
