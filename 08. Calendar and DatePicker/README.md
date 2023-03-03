# 8. Calendar and Date 회고🤔💭

- [8. Calendar and Date 회고🤔💭](#8-calendar-and-date-회고)
  - [8-1. 커스텀 이벤트 장인이 되어가는 중](#8-1-커스텀-이벤트-장인이-되어가는-중)
    - [8-1-1. 현상🧱](#8-1-1-현상)
    - [8-1-2. 발견💡](#8-1-2-발견)
    - [8-1-3. 배운점📝](#8-1-3-배운점)
  - [8-2. state 관련 이야기](#8-2-state-관련-이야기)
    - [8-2-1. 현상🧱](#8-2-1-현상)
    - [8-2-2. 발견💡](#8-2-2-발견)
    - [8-2-3. 배운점📝](#8-2-3-배운점)
  - [8-3. 선언🧎🏻](#8-3-선언)

---

## 8-1. 커스텀 이벤트 장인이 되어가는 중

### 8-1-1. 현상🧱

- `.calendar` 요소가 다시 열릴 때 숨김처리되는 시점에 선택되어 있는 날짜를 기준으로 다시 렌더링 되어야 한다. 즉, '23년 3월 30일을 선택한 후, `.prev` 버튼을 클릭해서 '23년 1월까지 이동한 다음 `.calendar`를 숨김처리 하더라도, 재오픈할 때는 '23년 3월로 렌더링 되어야 한다.

- 선택된 날짜를 `.date-picker-input` 요소에 저장해두기 때문에, 이를 기준으로 `state`를 변경하려고 했으나, 숨김처리는 '/date-picker/index.js'에서, `state`는 '/calendar/index.js'에서, 즉 서로 다른 파일에서 관리되고 있어 직접 변경할 수 없었다.

### 8-1-2. 발견💡

- 다른 파일에 있는 변수(해당 과제의 경우 `state`)를 export 하더라도 타 파일에서 변경할 수는 없다. (사실 변경할 방법은 있곘지만, state를 그렇게 관리하는 것이 올바른지에 대한 의문이 들었다)
- 대신 `.calendar` 요소가 숨김처리될 때마다 커스텀 이벤트를 발생시키고, 이를 '/calendar/index.js'에서 잡아서 `state`를 변경하도록 했다.

  <span style="background-color: lime; color: black"><strong>1. '/date-picker/index.js' 에서 `calendar-hidden`이라는 커스텀 이벤트를 발생시킨다</strong></span>

  ```javascript
  $container.addEventListener('click', e => {
    // ...기타 로직

    const customEvent = new CustomEvent('calendar-hidden', { detail: { selectedDate: e.target.value } });

    $container.dispatchEvent(customEvent);
  });
  ```

  <span style="background-color: lime; color: black"><strong>2. '/calendar/index.js' 에서 `calendar-hidden`이라는 커스텀 이벤트를 잡아서 `state`를 변경한다</strong></span>

  ```javascript
  $container.addEventListener('calendar-hidden', e => {
    setState({
      year: new Date(e.detail.selectedDate).getFullYear(),
      month: new Date(e.detail.selectedDate).getMonth(),
    });
  });
  ```

### 8-1-3. 배운점📝

- 이전 과제들에서는 커스텀 이벤트를 왜 사용해야 하는지 모른채 커스텀 이벤트 사용을 강요받았다면, 이번 과제에서는 커스텀 이벤트를 어떤 상황에서 유용하게 사용할 수 있는지 배웠다.

---

## 8-2. 메서드

### 8-2-1. 현상🧱

- date에 대한 상태를 currDate 하나로 사용하느냐 year과 month로 나누느냐에 대한 고민이 생겼다.

### 8-2-2. 발견💡

- 사실상 화면 전체 레이아웃에 영향을 주는 변수는 년도와 달이었고, currDate 하나로 상태를 사용할 경우 `getFullYear()`, `getMonth()`가 계속 호출되야 했기 때문에 계속된 메서드 호출이 일어났다.

- `state`수가 많지 않았기 때문에 `state`가 추가되더라도 코드 가독성 문제가 없었고, 메서드 호출이 성능상 유리하기 때문에 `state`를 늘리고 메서드 호출을 줄이는 방향을 선택했다.

### 8-2-3. 배운점📝

- 일반적으로 메서드 호출을 줄이는 것이 성능상 유리하다.(메서드 호출마다 함수 스택에 새로운 프레임을 추가하고 제거해야하기때문)
- `state`의 수를 너무 많이 추가하면 관리하기가 어려워지고 코드의 가독성이 떨어질 수 있으므로 적절한 균형을 유지해야하는 점을 배웠다.

---

## 8-3. 선언🧎🏻

- 이번 과제 전까지만 해도 커스텀 이벤트가 훨씬 낯설게 느껴졌다. 자주 사용하지 않는 개념이니까 이 정도만 이해해도 된다고 애써 스스로를 속였다. 근데 바로 다음 과제에서 사용해야 하는 상황이 발생했고, 처음 커스텀 이벤트를 다룰 때 깊게 이해하고 넘어갔으면 좋았을 것 같다고 생각됐다. 앞으로는 익숙하지 않은 개념을 얕게 이해하고 넘기지 않겠다.

- 일반적으로 작은 프로젝트에서는 메서드 호출을 줄이는 것이 더 중요하다고 생각하므로 상태를 추가하고 메서드를 줄였다. 하지만, 코드의 관계와 균형은 각 상황에 따라 다르기 때문에, 계속 고민해 나아갈 부분인것 같다.
