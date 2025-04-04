class Accordion {
  constructor({ $container, menuList, showMultiple = false }) {
    this.props = {
      $container,
      menuList,
      showMultiple,
    };

    this.state = { menuList: [...this.props.menuList] };

    window.addEventListener('DOMContentLoaded', () => {
      this.intialize();
    });

    $container.addEventListener('click', e => {
      if (e.target.closest('h1')) this.toggleMenu(e);
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  intialize() {
    if (this.props.showMultiple) {
      this.setState(this.state);
    } else {
      const firstTrueIdx = this.props.menuList.findIndex(menu => menu.isOpen);
      const newMenuList = this.props.menuList.map((menu, idx) =>
        idx === firstTrueIdx ? menu : { ...menu, isOpen: false }
      );

      this.setState({ menuList: newMenuList });
    }
  }

  toggleMenu({ target }) {
    const { id } = target.closest('article').dataset;
    const { menuList } = this.state;

    const newMenuList = this.props.showMultiple
      ? menuList.map(menu => (menu.id === +id ? { ...menu, isOpen: !menu.isOpen } : menu))
      : menuList.map(menu => (menu.id === +id ? { ...menu, isOpen: !menu.isOpen } : { ...menu, isOpen: false }));

    this.setState({ menuList: newMenuList });
  }

  // prettier-ignore
  render() {
    this.props.$container.innerHTML = `
      <div class='accordion-container'>
      ${this.state.menuList.map(({ id, title, subMenu, isOpen }) =>
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
