class TreeView {
  /* do something! */
  constructor($container, tree) {
    this.$container = $container;
    this.tree = tree;

    this.addClickReplacer();
    this.initialize();
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
        <a href="#" data-name="${name}" data-event-type="${!children ? 'select' : isOpen ? 'collapse' : 'expand'}">
          <span class="tree-switcher ${!children ? 'noop' : isOpen ? 'expand' : 'collapse'}"></span>
          <span class="tree-content">${name}</span>
        </a>
        ${children ? children.map(item => `
        <ul class="subtree-container ${isOpen ? '' : 'hide'}">
          ${this.createDOMString(item)}
        </ul>`).join('') : ''}
      </li>`
  }

  on(eventType, eventHandler) {
    if (!['collapse', 'expand', 'select'].includes(eventType)) throw new Error('잘못된 이벤트입니다.');

    this.$container.addEventListener(eventType, e => {
      if (e.detail.eventType === 'expand' || e.detail.eventType === 'collapse') {
        this.tree = this.traverseAndToggle(this.tree, e.detail.name);
        this.initialize();
      }

      eventHandler(e);
    });
  }

  addClickReplacer() {
    this.$container.addEventListener('click', e => {
      if (!e.target.closest('a')) return;
      const $a = e.target.closest('a');
      const { name, eventType } = $a.dataset;

      const customEvent = new CustomEvent(eventType, { detail: { name, eventType } });
      this.$container.dispatchEvent(customEvent);
    });
  }

  // prettier-ignore
  traverseAndToggle(targetArray, targetName) {
    return targetArray.map(({ name, isOpen, children }) =>
      name === targetName
        ? { name, isOpen: !isOpen, children: children ? this.traverseAndToggle(children, targetName) : children }
        : { name, isOpen, children: children ? this.traverseAndToggle(children, targetName) : children }
    );
  }
}

export default TreeView;

