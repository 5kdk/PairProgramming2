# 1. Toggle Side Navigation 회고🤔💭

- [1. Toggle Side Navigation 회고🤔💭](#1-toggle-side-navigation-회고)
  - [1-1. 데이터 타입은 밥 말아 드셨나요?](#1-1-데이터-타입은-밥-말아-드셨나요)
    - [1-1-1. 현상🧱](#1-1-1-현상)
    - [1-1-2. 발견💡](#1-1-2-발견)
    - [1-1-3. 배운점📝](#1-1-3-배운점)
  - [1-2. 선언🧎🏻](#1-2-선언)
  - [1.3 최종 리팩터링](#13-최종-리팩터링)

## 1-1. 데이터 타입은 밥 말아 드셨나요?

### 1-1-1. 현상🧱

- 브라우저의 새로고침이나 재실행시에 navigation탭의 열림 닫힘 상태를 유지하기 위해 localStorage에 'open-status'라는 키와 boolean 값으로 저장을 했고, 로컬스토리지에는 문자열로 저장되기 때문에 NOT 연산자(`!`) 두 개를 사용하여 형 변환하여 `isOpened`라는 변수에 해당 값을 할당했다.

  ```javascript
  const isOpened = !!window.localStorage.getItem('open-status');
  ```

- 예를 들어 navigation 탭이 닫힌 경우 localStorage 'open-status'에 `false`가 들어가있지만, 다시 로드할때 localStorage에서 가져온 값과 다르게 렌더링 되었다. (무조건 `true`로 초기화 되었다)

### 1-1-2. 발견💡

- NOT 연산자를 사용하여 변환하려고 했던 localStorage에서 불러온 값은 String 타입이었기 때문에, NOT 연산자를 두번 사용하여 (`!!`) 형변환을 하면 `'false'`라는 문자열이 truthy 한 값으로 평가되어 `true`로 형변환 했기 때문에 해당 연산자를 통해 형변환 하는 것은 실수임을 깨달았다.
- JSON 문자열에 대응하는 Object를 반환하는 `JSON.parse` 메서드를 사용하면 `'true'`, `'false'`와 같은 문자열을 boolean 값으로 알맞게 변환할 수 있다는 것을 떠올렸다.

  > [_JSON.parse()에 대한 MDN문서_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

  ```javascript
  const isOpened = JSON.parse(window.localStorage.getItem('open-status'));
  ```

### 1-1-3. 배운점📝

- localStorage에 `setItem` 으로 데이터를 저장할 때 문자열로 형변환 된다는 사실을 알았다.

  > _참고_: [_Why localStorage only allows to store string values_](https://www.pixelstech.net/article/1586062871-Why-localStorage-only-allows-to-store-string-values)

- localStorage를 사용할 때도 AJAX로 서버와 데이터를 주고 받을 때 처럼 데이터 타입을 잘 확인하여 사용해야 한다는 점을 배웠다.

## 1-2. 선언🧎🏻

- 데이터 타입을 제대로 확인하지 않는 실수는 쉽게 헤맬 수 있기 때문에 실수 하지 않도록 하겠다.
- 구현에 급급해 `JSON.parse` 처럼 익숙한 메서드들에 대한 깊은 고민 없이 쉽게 넘어가지 않도록 하겠다.

## 1.3 최종 리팩터링

- `NavBar`가 토글 될 때마다 localstorage에 현재 상태를 저장되는 것은 불필요하다고 판단하여, window의 `'beforeunload'` 이벤트를 감지하여 웹 창이 닫힐때 `isOpened` 값이 저장되도록 수정하였다.
- 추후 페이지 이동 기능도 추가된다면, 페이지가 이동될 때에도 localStorage에 `isOpened` 값을 저장해주면 된다.
