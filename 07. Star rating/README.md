# 7. Star rating 회고🤔💭

- [7. Star rating 회고🤔💭](#7-star-rating-회고)
  - [7-1. 텍스트로 html을 만들때 (feat. 공백 텍스트 노드)](#7-1-텍스트로-html을-만들때-feat-공백-텍스트-노드)
    - [7-1-1. 현상🧱](#7-1-1-현상)
    - [7-1-2. 발견💡](#7-1-2-발견)
    - [7-1-3. 배운점📝](#7-1-3-배운점)
  - [7-2. 이벤트 리스너는 우리 같이 무거워요](#7-2-이벤트-리스너는-우리-같이-무거워요)
    - [7-2-1. 현상🧱](#7-2-1-현상)
    - [7-2-2. 발견💡](#7-2-2-발견)
    - [7-2-3. 배운점📝](#7-2-3-배운점)
  - [7-3. 선언🧎🏻](#7-3-선언)

---

## 7-1. 텍스트로 html을 만들때 (feat. 공백 텍스트 노드)

### 7-1-1. 현상🧱

- `star` 들을 `mouseover` 할 때 깜빡이는 현상이 존재하다는 것을 알았다.

### 7-1-2. 발견💡

- HTML 요소 사이의 스페이스, 탭, 개행 등 공백 문자는 텍스트 노드를 생성하고 이 때문에 `star` 사이에 노드가 생성된 다는 것을 발견했고, 이를 해결하기 위해 HTML을 동적으로 생성할 요소들을 한 줄로 표현하여 깜빡임을 억제할 수 있었다.
  ```javascript
  // ...
  $container.innerHTML = `
    <div class="star-rating-container">
      ${"<i class='bx bxs-star'></i>".repeat(maxRating)}
    </div>`;
  ```

### 7-1-3. 배운점📝

- `innerHTML`이나 `innerAjacentHTML` 과 같은 프로퍼티로 동적으로 DOM을 그려줄 경우, 공백 텍스트 노드로 문제가 생길 수 있기 때문에 이를 확인하여 처리해야함을 배웠다.

---

## 7-2. 이벤트 리스너는 우리 같이 무거워요

### 7-2-1. 현상🧱

- 초기 구현 단계에서는 `StarRating` 함수 내부에서 이벤트 리스너 등록 등 모든 로직을 구현하고자 했다.
- 호출되는 `StarRating`이 많아질수록 `$container` 수가 많아질 수록 이벤트 리스너의 수가 계속 증가한다는 점이 우려되었다.

  ```javascript
  const StarRating = $container => {
    // ...(기타 로직)

    // StarRating 로직을 위해 이벤트 리스너를 3개 사용해야 했다
    // $container 수가 100개면 총 300개의 이벤트 리스너가 등록된다
    $container.addEventListener('click', callBackFunc);
    $container.addEventListener('mouseover', callBackFunc);
    $container.addEventListener('mouseout', callBackFunc);
  };
  ```

### 7-2-2. 발견💡

- `StarRating` 함수 밖으로 이벤트 리스너를 빼면 전달 받은 `$container` 변수에 별도 전역 변수에 할당 외의 방법으로 접근할 수 없었다.
- 구현에 필요한 세 개의 이벤트 리스너를 `document`에 위임하고, 각 이벤트 콜백 함수에서 이벤트가 발생한 `$container`를 식별해서 로직을 수행하도록 했다. (한 `$container`에서 발생한 이벤트가 타 `$container`들에 영향을 주면 안되기 때문)
- 또한, 각 이벤트 콜백 함수에서 사용되는 로직이 겹쳤기 때문에 하나의 함수에 여러 중첩 함수를 만들고, 전달 받은 `e.type`에 따라 다른 중첩 함수가 실행되도록 했다.

  ```javascript 
  const starHandler = e => {
    // 공통되는 얼리 리턴문 및 변수 
    if (!e.target.matches('.star-rating-container > i')) return;

    const $stars = [...e.target.parentNode.children];
    const eventIdx = $stars.indexOf(e.target);

    // 콜백 함수로 사용될 중첩 함수들
    const handleMouseover = () => { /* 중첩 함수 1 */ }
    const handleMouseout = () => { /* 중첩 함수 2 */ }
    const handleClick = () => { /* 중첩 함수 3 */ }

    if (e.type === 'mouseover') handleMouseover();
    if (e.type === 'mouseout') handleMouseout();
    if (e.type === 'click') handleClick();
  };
  ```

### 7-2-3. 배운점📝

- 이벤트 콜백들의 로직이 중복될 땐, 여러 중첩 함수를 정의하고 이벤트 타입에 맞게 특정 중첩 함수를 실행시켜 주는 하나의 함수를 이벤트 리스너의 콜백 참조로 넣어주면 코드를 간략화 할 수 있다는 점을 배웠다.

---

## 7-3. 선언🧎🏻

- 텍스트로 DOM 을 동적 생성하는 일이 많은데, 공백 텍스트노드로 인한 사소한 문제들이 생기지 않도록 잘 확인해보자.
- 모든 이벤트 콜백 함수를 하나의 외부 함수로 모아두어 과도한 이벤트 리스너 생성을 방지했을 뿐 아니라, 비슷한 패턴을 동일한 로직으로 구현하여 하나의 함수안에서 공유하기 때문에 코드의 양이 줄었으며, 전체적인 코드 응집도가 높아져 가독성이 향상되었다. 앞으로도 비슷한 패턴을 발견하고 코드의 응집도를 높히는데 노력하자.