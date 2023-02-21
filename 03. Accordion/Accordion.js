class Accordion {
  #state;

  constructor({ $container, menuList, showMultiple = false }) {
    this.#state = {
      $container,
      menuList,
      showMultiple,
    };

    window.addEventListener('DOMContentLoaded', () => {
      this.intialize();
    });

    $container.addEventListener('click', e => {
      this.toggleMenu(e);
    });
  }

  setState(newState = this.#state) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }

  intialize() {
    if (this.#state.showMultiple) {
      this.setState();
    } else {
      const firstTrueIdx = this.#state.menuList.findIndex(menu => menu.isOpen);
      const newMenuList = this.#state.menuList.map((menu, idx) =>
        idx === firstTrueIdx ? menu : { ...menu, isOpen: false }
      );

      this.setState({ menuList: newMenuList });
    }
  }

  // prettier-ignore
  toggleMenu({ target }) {
    const { id } = target.closest('article').dataset;

    const newMenuList = this.#state.menuList.map(menu => menu.id === +id
      ? { ...menu, isOpen: !menu.isOpen }
      : this.#state.showMultiple
      ? menu
      : { ...menu, isOpen: false }
    );

    this.setState({ menuList: newMenuList });
  }

  // prettier-ignore
  render() {
    this.#state.$container.innerHTML = `
      <div class='accordion-container'>
      ${this.#state.menuList.map(({ id, title, subMenu, isOpen }) =>
        `<article data-id='${id}' class=${isOpen? 'active' : ''}>
          <h1><i class='bx bxs-chevron-down'></i>${title}</h1>
            <ul>
              ${isOpen ? subMenu.map(({ title, path }) => `
              <li><a href='${path}'>${title}</a></li>`).join('') : ''}
            </ul>
        </article>`).join('')}
      </div>`;
  }
}

export default Accordion;
