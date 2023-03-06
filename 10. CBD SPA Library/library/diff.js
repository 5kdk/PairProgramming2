const updateAttributes = (oldNode, newNode) => {
  if (newNode.checked !== oldNode.checked) oldNode.checked = newNode.checked;
  // checked, value, selected 이지만 여기선 checked만 확인해도된다~

  for (const { name, value } of [...newNode.attributes]) {
    if (value !== oldNode.getAttribute(name)) oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) === undefined) oldNode.removeAttribute(name);
  }
};

const updateDOM = (parent, newNode, oldNode) => {
  if (!newNode && oldNode) return oldNode.remove();

  if (newNode && !oldNode) return parent.appendChild(newNode);

  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }

  updateAttributes(oldNode, newNode);

  const newChildNodes = [...newNode.childNodes];
  const oldChildNodes = [...oldNode.childNodes];

  const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);
  for (let i = 0; i < maxLength; i++) {
    updateDOM(oldNode, newChildNodes[i], oldChildNodes[i]);
  }
};

export default updateDOM;
