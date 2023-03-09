// eslint-disable-next-line import/extensions
import Component from '../core/Component.js';

class Header extends Component {
  /* eslint-disable class-methods-use-this */
  render() {
    return `
      <header>
        <h1>MyTrello</h1>
      </header>`;
  }
}

export default Header;
