# 2. Tic Tac Toe 회고🤔💭

- [2. Tic Tac Toe 회고🤔💭](#2-tic-tac-toe-회고)
  - [2-1. 과연 어디까지 state 객체로 관리해야 할까요?](#2-1-과연-어디까지-state-객체로-관리해야-할까요)
    - [2-1-1. 현상🧱](#2-1-1-현상)
    - [2-1-2. 발견💡](#2-1-2-발견)
    - [2-1-3. 배운점📝](#2-1-3-배운점)
  - [2-2. some or for...of](#2-2-some-or-forof)
    - [2-2-1. 현상🧱](#2-2-1-현상)
    - [2-2-2. 발견💡](#2-2-2-발견)
    - [2-2-3. 배운점📝](#2-2-3-배운점)
  - [2-3. 선언🧎🏻](#2-3-선언)

<br>

---

## 2-1. 과연 어디까지 state 객체로 관리해야 할까요?

### 2-1-1. 현상🧱

- TicTacToe 게임의 승리 및 무승부를 판단하는 `isTicTaeToe`와 `isDraw`를 전역 변수로 사용할지 state로 관리할지에 대해 고민이 있었다.
  - state로 사용한 `player`와 `board`의 경우 렌더링에 자주 영향을 주지만, `isTicTacToe`와 `isDraw`의 경우 한 번만 렌더에 영향을 주기 때문에 state로 관리할 필요성이 있는지에 대해 고민되었다.
  ```javascript
  // 전역 변수로 사용된 isDraw와 isTicTacToe
  // 둘 중 하나라도 true가 되면 게임이 종료된다
  let isDraw = false;
  let isTicTacToe = false;
  ```
  ```javascript
  // state 객체로 관리된 isDraw와 isTicTacToe
  let state = {
    player: 'X',
    board: new Array(9).fill(''),
    isDraw: false,
    isTicTacToe: false,
  };
  ```

### 2-1-2. 발견💡

- `isTicTacToe`와 `isDraw`는 `TicTacToe`라는 컴포넌트 내부에서 변할 뿐 만 아니라, 화면 렌더에 영향을 미치기 때문에 state에 추가하여 관리해야함을 알았다.
- 또한, 함수 상단에 여러가지 변수들이 선언이 되어있었기 때문에 이 변수가 어느곳에서 사용되는지 고민이 생겼으나, state라는 객체로 묶어 화면 렌더링에 관여하는 변수들이라는 것을 직관적으로 나타낼 수 있었고 응집도 또한 향상되었다.

### 2-1-3. 배운점📝

- state인지 일반 변수인지 고민이 깊어질 경우에, 간단히 생각하여 화면 렌더에 영향을 미치는 변수들은 state라고 생각하는 편이 빠른 의사결정을 할 수 있다는 것을 알았다.
- 렌더에 영향을 주는 변수들은 state로 관리하여 응집도를 높여 변수들을 관리 할 수 있음을 배웠다.

<br>

---

## 2-2. some or for...of

### 2-2-1. 현상🧱

- `board` state의 값들이 TicTacToe 인지 확인하기 위하여 `winConditions`라는 2차원 배열을 순회하였다.

  ```javascript
  for (const [one, two, three] of winConditions) {
    if (state.board[one] && state.board[one] === state.board[two] && state.board[two] === state.board[three])
      state.isTicTacToe = true;
  }
  ```

  ```javascript
  state.isTicTacToe = winConditions.some(
    ([one, two, three]) =>
      state.board[one] && state.board[one] === state.board[two] && state.board[two] === state.board[three]
  );
  ```

### 2-2-2. 발견💡

- 배열 `some` 메서드는 의미론적으로 배열을 순회하며 콜백함수 조건을 만족한 경우 하나라도 있을 경우 순회를 멈추고 바로 boolean 값으로 반환되기 때문에 좀 더 명시적으로 isTicTacToe 인지 나타낼 수 있었다.

  > **`some()`**
  >
  > `some` 메서드는 반복 메서드입니다. 이 메서드는 주어진 `callbackFn`함수가 참 같은 값을 반환할 때까지 배열 안에 있는 각각의 요소마다 한 번씩 호출합니다. 만약 그러한 요소를 찾았으면 `some()` 메서드는 그 즉시 `true`를 반환하며 배열 순회를 멈춥니다. 그렇지 않고 `callbackFn`이 모든 요소에 대해 거짓같은 값을 반환하면 some()은 `false`를 반환합니다.
  >
  > [MDN: some()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

### 2-2-3. 배운점📝

- `some()`메서드는 `for ... of`문의 early return 으로 처리하는 것과 다름없지만, `some()` 이라는 메서드 이름으로 동작을 예측하는데에 조금이나마 더 도움이 될 수 있다는 점을 배웠다.

---

## 2-3. 선언🧎🏻

- 예측 가능한 코드가 가장 가독성 높은 코드라는 점을 느꼈다.
  - `isDraw`와 `isTicTacToe`를 전역 변수가 아닌 state로 관리헀을 때와 `for...of`문 대신 `some()` 메서드를 사용했을 때의 가장 큰 장점 중 하나는 코드의 예측성 향상이었다.
  - 예를 들어 `isDraw`와 `isTicTacToe` 같은 경우 전역 변수로 관리했더라면 각 변수가 어디서 참조되어 어떻게 사용되는지 확인이 필요하지만, state 객체로 관리함으로서 두 변수가 렌더에 영향을 준다는 점을 보다 직관적으로 나타낼 수 있었다. 앞으로도, 누가 읽더라도 예측 가능한 코드를 작성하기 위해 꾸준한 노력을 해나가겠다!
