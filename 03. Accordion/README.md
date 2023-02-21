# 3. Accordion 회고🤔💭

- [3. Accordion 회고🤔💭](#3-accordion-회고)
  - [3-1. this는 미워요](#3-1-this는-미워요)
    - [3-1-1. 현상🧱](#3-1-1-현상)
    - [3-1-2. 발견💡](#3-1-2-발견)
    - [3-1-3. 배운점📝](#3-1-3-배운점)
  - [3-2. 선언🧎🏻](#3-2-선언)

<br>

---

## 3-1. this는 미워요

### 3-1-1. 현상🧱

- 클래스 생성자 함수 내부에서 호출된 이벤트 리스너의 두 번째 매개변수로 함수 참조를 전달하자 인스턴스 메서드안의 `this`를 참조해야 하는 코드로직이 예상대로 동작하지 않았다.

  ```javascript
  class Accordion {
    constructor({ $container, menuList, showMultiple = false }) {
      // ...
      window.addEventListener('DOMContentLoaded', this.initialize);
      $container.addEventListener('click', this.toggleMenu);
    }
    // ...
  }
  ```

### 3-1-2. 발견💡

- 콜백 함수 참조로 실행될 메서드 내부의 `this`들을 console로 확인해보니 콜백 함수 참조로 호출할 경우와, 화살표 함수로 호출할 경우의 `this`가 다르게 확인되었다.

  - 이벤트리스너의 참조로 전달한 콜백함수의 `this`는 이벤트타겟을 가리키는 것을 발견했다.

  ```javascript
  // window 이벤트리스너의 참조의 this
  Window {window: Window, self: Window, document: document, name: '', location: Location, … }

  // window 이벤트리스너의 화살표 함수 this
  Accordion {#state: {…}}

  ```

  > [**MDN**: EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

### 3-1-3. 배운점📝

- 이벤트리스너의 콜백 함수를 참조로 사용할 경우에는 `this`가 제대로 바인딩 되지 않기 때문에, 콜백 함수로 `this`를 사용하게 될 경우에는 화살표 함수로 이벤트리스너 콜백 함수를 호출해야함을 배웠다.

<br>

---

## 3-2. 선언🧎🏻

- 함수형 컴포넌트와 클래스 컴포넌트의 가장 큰 차이점 중 하나는 `this`의 사용여부다. `this` 사용이 필요 없었던 함수형 컴포넌트와 달리 클래스 컴포넌트에서는 내부 메서드 등의 참조를 해야하므로 `this` 사용이 불가피하다. 이로 인해 잘못된 `this` 바인딩이 생겨 코드에 오류가 발생할 수 있다. 앞으로 `this`에 대한 추가 고민을 하게 만드는 클래스 컴포넌트보다는 함수형 컴포넌트의 사용을 지향할 것이다.
