# 4. DragDrop 회고🤔💭

- [4. DragDrop 회고🤔💭](#4-dragdrop-회고)
  - [4-1. 도대체 드래그 이벤트는 몇 개를 사용해야 하는건가요?](#4-1-도대체-드래그-이벤트는-몇-개를-사용해야-하는건가요)
    - [4-1-1. 현상🧱](#4-1-1-현상)
    - [4-1-2. 발견💡](#4-1-2-발견)
    - [4-1-3. 배운점📝](#4-1-3-배운점)
  - [4-2. 정답인지 확인하는 가장 적당한 방법?](#4-2-정답인지-확인하는-가장-적당한-방법)
    - [4-2-1. 현상🧱](#4-2-1-현상)
    - [4-2-2. 발견💡](#4-2-2-발견)
    - [4-2-3. 배운점📝](#4-2-3-배운점)
  - [4-3. 선언🧎🏻](#4-3-선언)

<br>

---

## 4-1. 도대체 드래그 이벤트는 몇 개를 사용해야 하는건가요?

### 4-1-1. 현상🧱

- drag & drop을 구현하기 위해 drag 이벤트 종류에 대한 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)를 확인해보았으나 비슷한 이름을 가진 여러 이벤트가 있어 사용에 어려움을 겪었다.

### 4-1-2. 발견💡

- 초기 구현 단계에서 `dragover` 이벤트를 사용하여 현재 드래그되는 요소 밑에 있는 요소에 'over' 클래스를 추가해주었다.
  ```javascript
  $container.addEventListener('dragover', e => {
    if (e.target.closest('li')) e.target.closest('li').classList.add('over');
  });
  ```
- `dragover` 이벤트를 사용하는 것에는 두 개의 단점이 존재했다.
  1. debounce / throttle 해주지 않으면 드래그가 발생하는 동안 이벤트가 끊임없이 발생한다.
  2. 드래그 되는 요소를 놓았을 때 발생하는 `drop` 이벤트의 정상 동작을 방해한다.
- 위 내용을 토대로 `dragover` 이벤트에서는 `e.preventDefault()`만 실행하고, 드랍 가능 여부를 나타내는 'over' 클래스의 추가 및 삭제는 `dragenter`와 `dragleave` 이벤트 두 개로 toggle해주었다.

  ```javascript
  $container.addEventListener('dragover', e => {
    e.preventDefault();
  });

  $container.addEventListener('dragenter', e => {
    if (!e.target.matches('.draggable') || !e.target.closest('li')) return;

    e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('dragleave', e => {
    if (!e.target.matches('.draggable') || !e.target.closest('li')) return;

    e.target.closest('li').classList.toggle('over');
  });

  $container.addEventListener('drop', e => {
    if (e.target.matches('.draggable')) e.target.closest('li').classList.remove('over');
    // ...
  });
  ```

- 이렇게 하면 `dragover` 이벤트를 사용했을 때처럼 과도한 호출 없이도 현재 드래그 오버 중인 요소에게만 'over' 클래스를 추가 및 삭제할 수 있었으며, `drop` 이벤트 또한 정상적으로 동작하였다.

### 4-1-3. 배운점📝

- 브라우저는 디폴트 값으로 HTML 요소에 무언가가 드롭되었을 때 아무 일도 일어나지 않도록 구현되어 있다.
- 따라서 특정 요소가 드롭 지역, 즉 droppable한 요소가 되도록 하기 위해서는 해당 요소가 `ondragover`와 `ondrop` 이벤트 핸들러 속성을 가지고 있어야 한다.
- 예를 들어 위 코드에서 `e.preventDefault()` 처리 외 하는 것이 없는 `dragover` 이벤트 리스너를 제거하면 어떤 요소에도 드롭할 수 없게 된다.

<br>

---

## 4-2. 정답인지 확인하는 가장 적당한 방법?

### 4-2-1. 현상🧱

- 사용자가 변경한 순위 배열(`state.currrent`)이 정답인지 확인하기 위한 로직이 필요했기에, 처음엔 `state.currrent` 배열과 정답 배열 `languages` 두 배열을 순회하여 비교하는 방법을 사용했으나 불 필요한 순회가 필요했다.

### 4-2-2. 발견💡

- `dragstart` 와 `drop` 이벤트까지 캐치하고 있기 때문에 두 이벤트가 발생한 요소들을 활용하여 `index` 구할 수 있다면, `state.current` 배열을 복사한 배열에 특정 `index`의 값들을 서로 바꾸어 주고 `setState()`를 호출해주면 간단하게 화면 처리할 수 있다는 것을 발견했다.

  ```javascript
  let dragIdx = 0;
  let dropIdx = 0;

  // ...

  const swapRank = () => {
    const swapped = [...state.current];
    swapped[dragIdx] = state.current[dropIdx];
    swapped[dropIdx] = state.current[dragIdx];

    setState({ current: swapped });
  };

  // ...

  // dragstart 이벤트 핸들러안 할당문
  dragIdx = state.current.indexOf(e.target.firstElementChild.textContent);
  // drop 이벤트 핸들러안 할당문
  dropIdx = state.current.indexOf(e.target.firstElementChild.textContent);
  ```

### 4-2-3. 배운점📝

- 지역 변수를 적절히 활용하는 것은 코드의 성능상, 로직상 간소화 해주었으며, 직관성을 올릴 수 있는 방법임을 알았다.

<br>

---

## 4-3. 선언🧎🏻

- 자바스크립트 세상에는 비슷한 이름, 비슷한 동작을 하는 것들이 너무 많다. 급급하게 파악하려고 하지말고 천천히 MDN 문서를 읽는 습관을 가져야겠다.
- 변수는 적을 수록 좋지만, 변수를 사용해서 더 좋은 코드가 될 수 있다면 지역 변수를 적극 활용해 보겠다!
