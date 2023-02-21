class Accordion {
  constructor({ $container, menuList, showMultiple = false }) {
    this.state = {
      $container,
      menuList,
      showMultiple,
    };

    this.intialize();
    $container.addEventListener('click', e => {
      this.handleMenu(e);
    });
  }

  setState(newState = this.state) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  intialize() {
    if (!this.state.showMultiple) {
      const _idx = this.state.menuList.findIndex(menu => menu.isOpen);

      this.setState({
        menuList: this.state.menuList.map((menu, idx) =>
          idx === _idx ? menu : { ...menu, isOpen: false }
        ),
      });
    } else {
      this.setState();
    }
  }

  // prettier-ignore
  handleMenu({ target }) {

    const { id } = target.closest('article').dataset;

    this.setState({ menuList: this.state.menuList.map(menu =>
      menu.id === +id
        ? { ...menu, isOpen: !menu.isOpen }
        : this.state.showMultiple
        ? menu
        : { ...menu, isOpen: false }),
    });
  }

  // prettier-ignore
  render() {
    this.state.$container.innerHTML = `
      <div class='accordion-container'>
      ${this.state.menuList.map(({ id, title, subMenu, isOpen }) =>
        `<article data-id='${id}' class='active'>
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
