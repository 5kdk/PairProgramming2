class TreeView {
  /* do something! */
  constructor($container, tree) {
    this.$container = $container;
    this.tree = tree;

    window.addEventListener('DOMContentLoaded', () => {
      this.initialize();
    });
  }

  initialize() {
    this.$container.innerHTML = `
    <ul class="tree-container">
    ${this.tree.map(item => this.createDOMString(item)).join('')}
    </ul>`;
  }

  // prettier-ignore
  createDOMString({ name, children, isOpen }) {
    return `
      <li class="tree-node">
        <a href="#" data-name="${name}" data-event-type="${ !children ? 'select' : isOpen ? 'expand' : 'collapse'}">
          <span class="tree-switcher ${ !children ? 'noop' : isOpen ? 'expand' : 'collapse'}"></span>
          <span class="tree-content">${name}</span>
        </a>
        ${children ? children.map(item => `
        <ul class="subtree-container ${isOpen ? '' : 'hide'}">
          ${this.createDOMString(item)}
        </ul>`).join('') : ''}
      </li>`
  }

  on(eventType, e) {
    if (eventType === 'collapse') this.handleCollapse(e);
    if (eventType === 'select') this.handleSelect(e);
    if (eventType === 'expand') this.handleExpand(e);
  }
}

export default TreeView;
