// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class Footer extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return `
      <div class="list-wrapper">
        <div class="list-content empty">
          <div class="add-list-txt">+ Add another list</div>
          <form id="add-list-form" class="hidden">
            <input type="text" class="list-name-input"></input>
            <button form="add-list-form">Add list</button>
            <button class="close">X</button>
          </form>
        </div>
      </div>`;
  }
}

export default Footer;
