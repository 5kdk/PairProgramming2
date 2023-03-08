// eslint-disable-next-line import/extensions
import diff from '../utils/diff.js';

class Component {
  constructor(props) {
    this.props = props;
    this.$fragment = document.createElement('template');

    this.registered = [];
    this.register = this.register.bind(this);
  }

  register(renderFunction) {
    this.registered = [...this.registered, renderFunction];
  }

  sync(parent) {
    let newNodes = [];

    this.registered.forEach(f => {
      newNodes = f();
    });

    diff(parent, newNodes, parent.childNodes);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.sync(this.$root);
  }

  /** @abstract */
  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error(`Component의 서브 클래스는 'render' 메서드를 구현해야 합니다.`);
  }
}

export default Component;
