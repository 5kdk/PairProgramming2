/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import render from '../utils/render.js';
import eventStorage from '../utils/eventStorage.js';

class Component {
  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render(this.render());
  }

  /** @abstract */
  render() {
    throw new Error("Component의 서브 클래스는 'render' 메서드를 구현해야 합니다.");
  }

  addEvent(eType, el, callback) {
    if (eventStorage.some(({ eventType, selector }) => eventType === eType && selector === el)) return;

    const event = { eventType: eType, selector: el, handler: callback };

    eventStorage.push(event);
  }
}

export default Component;
