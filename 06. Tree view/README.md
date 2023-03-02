# 6. Tree View 회고🤔💭

- [6. Tree View 회고🤔💭](#6-tree-view-회고)
  - [6-1. DOM 생성을 현명하게 하는 방법](#6-1-dom-생성을-현명하게-하는-방법)
    - [6-1-1. 현상🧱](#6-1-1-현상)
    - [6-1-2. 발견💡](#6-1-2-발견)
    - [6-1-3. 배운점📝](#6-1-3-배운점)
  - [6-2. 커스텀 이벤트와 on 메서드](#6-2-커스텀-이벤트와-on-메서드)
    - [6-2-1. 현상🧱](#6-2-1-현상)
    - [6-2-2. 발견💡](#6-2-2-발견)
    - [6-2-3. 배운점📝](#6-2-3-배운점)
  - [6-3. 커스텀 이벤트 이벤트 리스너](#6-3-커스텀-이벤트-이벤트-리스너)
    - [6-3-1. 현상🧱](#6-3-1-현상)
    - [6-3-2. 발견💡](#6-3-2-발견)
    - [6-3-3. 배운점📝](#6-3-3-배운점)
  - [6-4. 선언🧎🏻](#6-4-선언)
  - [6-5 최종 리팩토링](#6-5-최종-리팩토링)

---

## 6-1. DOM 생성을 현명하게 하는 방법

### 6-1-1. 현상🧱

- 주어진 tree 구조의 데이터를 바탕으로 DOM을 생성했기 때문에, 해당 데이터를 순회하면서 다음 depth를 확인하여 또 다음 순회를 하고 그 순회하면서 또 순회를 하는 반복적인 현상이 나타났다.
  - 다행히도 depth가 3개 였기에 구현할 수 있었으나 코드가 매우 불친절하여 직관성이 매우 떨어졌다.

### 6-1-2. 발견💡

- depth가 늘어날 수록 DOM 요소가 계속 반복되어 생성되므로, DOM을 그려주는 함수를 재귀함수로 만들어 이를 해결 할 수 있음을 발견했다.

### 6-1-3. 배운점📝

- tree 구조의 데이터를 바탕으로 DOM 요소로 만들어야 할 때는 재귀함수를 활용하여 이를 좀 더 직관적으로 해결 할 수 있음을 배웠다.

  ```javascript
  createDOMString({ name, children, isOpen }) {
    return `
      <li class="tree-node">
        <a href="#" data-name="${name}" data-event-type="${!children ? 'select' : isOpen ? 'collapse' : 'expand'}">
          <span class="tree-switcher ${!children ? 'noop' : isOpen ? 'expand' : 'collapse'}"></span>
          <span class="tree-content">${name}</span>
        </a>
        ${children ? children.map(node => `
        <ul class="subtree-container ${isOpen ? '' : 'hide'}">
          ${this.createDOMString(node)}
        </ul>`).join('') : ''}
      </li>`
  }

  ```

<br>

---

## 6-2. 커스텀 이벤트와 on 메서드

### 6-2-1. 현상🧱

- 이번 과제에서는 세 개의 커스텀 이벤트('select', 'collapse', 'expand')를 사용하여 애플리케이션의 동작을 제어해야 했다.
- 제공된 템플릿 코드에 `on`이라는 메서드를 사용하여 각 커스텀 이벤트 및 이벤트 콜백을 매개변수로 전달해주었다. (`on` 메서드 구현은 과제 요구사항 중 하나)

  ```javascript
  treeView.on('select', e => {
    console.log('select event has occurred', e);
    document.querySelector('main').textContent = e.detail.name;
  });

  treeView.on('expand', e => {
    console.log('expand event has occurred', e);
  });

  treeView.on('collapse', e => {
    console.log('collapse event has occurred', e);
  });
  ```

- 커스텀 이벤트를 사용하고 `on` 메서드에 대한 이해 및 구현하는 단계에서 어려움을 겪었다.

### 6-2-2. 발견💡

- 클릭이 발생되면 `e.target.closest('a')` 요소의 속성을 기준으로 커스텀 이벤트를 구분하고 커스텀 이벤트를 발생시켰다.

  ```javascript
  $container.addEventListener('click', e => {
    if (!e.target.closest('a')) return;

    const { eventType } = e.target.closest('a').dataset;
    const customEvent = new CustomEvent(eventType);

    $container.dispatchEvent(customEvent);
  });
  ```

- 하지만 `dispatchEvent`에게 (클릭으로 인해 구분되어 생성된) 커스텀 이벤트만 매개변수로 전달하니, 커스텀 이벤트의 이벤트 리스너 내부에서 `e.target`으로 현재 요소를 식별할 수 없었다. (커스텀 이벤트를 발생<sup>dispatch</sup>시킨 요소가 `$container`이기 때문에 `e.target`이 항상 `$container`였다)
- 클릭 이벤트 리스너에서 `e.target.closest('a')` 요소의 dataset에서 `eventType`만 가져오는 것이 아니라, `name`값 또한 가져와 `CustomEvent.detail` 프로퍼티 에 넣어 `dispatchEvent`의 두 번째 매개변수로 넘겨주어 해결했다.

  ```javascript
  $container.addEventListener('click', e => {
    if (!e.target.closest('a')) return;

    const { name, eventType } = e.target.closest('a').dataset;
    const customEvent = new CustomEvent(eventType, { detail: { name } });

    $container.dispatchEvent(customEvent);
  });
  ```

- `on` 메서드 내부에서는 템플릿 코드에서 매개변수로 전달된 커스텀 이벤트 타입 및 이벤트 콜백을 토대로 각 커스텀 이벤트를 다루는 이벤트 리스너를 달아주고, 이벤트 리스너 내부에는 커스텀 이벤트가 발생할 때마다 다뤄야하는 추가 로직을 구현해두었다.

  > <sub>_'on' 메서드 내부 로직은 추후 리팩토링 과정에서 다시 수정되었습니다._</sub>  
  > [<sub>_6-3. 커스텀 이벤트 이벤트 리스너 참고_</sub>](#6-3-커스텀-이벤트-이벤트-리스너)

  ```javascript
  on(eventType, eventHandler) {
    if (!['collapse', 'expand', 'select'].includes(eventType)) throw new Error('Wrong custom event.');

    this.$container.addEventListener(eventType, e => {
      // ...(매개변수로 전달받은 이벤트 콜백이 실행되기 전 실행될 추가 로직)
      eventHandler(e);
    });
  }
  ```

- 즉, 클릭이 발생하면 클릭된 요소를 기준으로 발생시킬 커스텀 이벤트를 구분하고, 각 커스텀 이벤트의 이벤트 리스너에서 처리되도록 구현해두었다.

### 6-2-3. 배운점📝

- 커스텀 이벤트를 사용한다는 것은 임의적으로 정의된 이벤트 객체를 발생시키는 것이다.(throw Error 하는 과정과 비슷함).
- `CustomEvent` 생성자 함수로 생성되며, 임의적으로 발생시키기 위해서는 `dispatch` 메서드를 사용해준다.
- 임의적으로 발생한 이벤트를 캐치하기 위해서는 각 커스텀 이벤트에 대한 이벤트 리스너가 따로 정의되어 있어야 한다.

<br>

---

## 6-3. 커스텀 이벤트 이벤트 리스너

### 6-3-1. 현상🧱

- `on` 메서드의 매개변수로 전달받은 이벤트 타입을 메서드 내에서 이벤트 리스너를 등록해 줄 경우, 해당 이벤트 타입을 가진 여러 `on` 메서드를 호출하면 이벤트 콜백에 `this.setTree()`메서드가 중복 호출되는 현상이 발견되었다.

  ```javascript
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
  ```

### 6-3-2. 발견💡

- 메서드 내에서 매번 이벤트 리스너를 등록해 주었기 때문에, 같은 타입이라도 여러 이벤트 리스너가 등록되며 이벤트 콜백함수에 있는 `setTree()`메서드가 중복 호출된다는 것을 발견했다.

### 6-3-3. 배운점📝

- 초기 구현 단계에서는 `on` 메서드의 의도와 구현 방법을 잘 이해하지 못했지만, `on` 메서드가 어떤 역할을 하고자 존재하는지 알게된 후 코드에 대한 이해도가 한층 높아졌다.
- 기본 동작들을 초기화 함수 내부에서 등록을 해주면 콜백함수의 로직(ex:`setTree()`)의 중복 호출을 줄일 수 있었다.
- `forEach`를 활용하여 이벤트 리스너 등록하면 코드양을 줄이고 가독성을 높일 수 있다는 것을 배웟다.

```javascript
// ...
constructor($container, tree) {
  // ...
  window.addEventListener('DOMContentLoaded', () => this.render());

  $container.addEventListener('click', e => {
    if (!e.target.closest('a')) return;

    const { name, eventType } = e.target.closest('a').dataset;
    const customEvent = new CustomEvent(eventType, { detail: { name } });

    $container.dispatchEvent(customEvent);
  });

  ['collapse', 'expand'].forEach(eventType =>
    $container.addEventListener(eventType, e => this.setTree(this.traverseToggle(this.tree, e.detail.name)))
  );
}
// ...
on(eventType, eventHandler) {
  if (!['collapse', 'expand', 'select'].includes(eventType)) throw new Error('Wrong custom event.');

  this.$container.addEventListener(eventType, eventHandler);
}
```

<br>

---

## 6-4. 선언🧎🏻

- 재귀함수, 커스텀 이벤트 모두 사용 빈도가 높지 않아 구현에 어려움을 겪었다. 침착하게 접근해보니 사실 어렵지 않았다. 너무 겁먹을 필요 없다.

## 6-5 최종 리팩토링

- 같은 패턴이 있는 코드의 중복을 지양하여 코드의 가독성이 좋아지도록 수시로 정리하자

```javascript
// 변경 전
traverseToggle(elements, targetId) {
  return elements.map(({ id, name, isOpen, children }) => id === +targetId
      ? { id, name, isOpen: !isOpen, children: children ? this.traverseToggle(children, targetId) : children }
      : { id, name, isOpen, children: children ? this.traverseToggle(children, targetId) : children }
  );
}
```

```javascript
// 변경 후
traverseToggle(elements, targetId) {
  return elements.map(({ id, name, isOpen, children }) => ({
    id,
    name,
    isOpen: id === +targetId ? !isOpen : isOpen,
    children: children ? this.traverseToggle(children, targetId) : children,
  }));
}
```
