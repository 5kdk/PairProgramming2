class TreeView {
  /* do something! */
  constructor($container, tree) {
    this.$container = $container;
    this.tree = tree;

    window.addEventListener('DOMContentLoaded', () => this.render());

    $container.addEventListener('click', e => {
      if (!e.target.closest('a')) return;

      const { id, eventType } = e.target.closest('a').dataset;
      const customEvent = new CustomEvent(eventType, { detail: { id } });

      $container.dispatchEvent(customEvent);
    });

    ['collapse', 'expand'].forEach(eventType =>
      $container.addEventListener(eventType, e => this.setTree(this.traverseToggle(this.tree, e.detail.id)))
    );
  }

  setTree(newTree) {
    this.tree = newTree;
    this.render();
  }

  render() {
    this.$container.innerHTML = `
      <ul class="tree-container">
        ${this.tree.map(node => this.createDOMString(node)).join('')}
      </ul>`;
  }

  // prettier-ignore
  createDOMString({ id, name, children, isOpen }) {
    return `
      <li class="tree-node">
        <a href="#" data-id="${id}" data-name="${name}" data-event-type="${!children ? 'select' : isOpen ? 'collapse' : 'expand'}">
          <span class="tree-switcher ${!children ? 'noop' : isOpen ? 'expand' : 'collapse'}"></span>
          <span class="tree-content">${name}</span>
        </a>
        ${children ? children.map(node => `
        <ul class="subtree-container ${isOpen ? '' : 'hide'}">
          ${this.createDOMString(node)}
        </ul>`).join('') : ''}
      </li>`
  }

  on(eventType, eventHandler) {
    if (!['collapse', 'expand', 'select'].includes(eventType)) throw new Error('Wrong custom event.');

    this.$container.addEventListener(eventType, eventHandler);
  }

  // prettier-ignore
  traverseToggle(elements, targetId) {
    return elements.map(({ id, name, isOpen, children }) => id === +targetId
        ? { id, name, isOpen: !isOpen, children: children ? this.traverseToggle(children, targetId) : children }
        : { id, name, isOpen, children: children ? this.traverseToggle(children, targetId) : children }
    );
  }
}

export default TreeView;
