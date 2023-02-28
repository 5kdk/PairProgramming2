# 9. News Viewer 회고🤔💭

- [9. News Viewer 회고🤔💭](#9-news-viewer-회고)
  - [9-1. Obsever 패턴 제대로 작동시키자](#9-1-obsever-패턴-제대로-작동시키자)
    - [9-1-1. 현상🧱](#9-1-1-현상)
    - [9-1-2. 발견💡](#9-1-2-발견)
    - [9-1-3. 배운점📝](#9-1-3-배운점)
  - [9-2. Proxy 객체 사용하기](#9-2-proxy-객체-사용하기)
    - [9-2-1. 현상🧱](#9-2-1-현상)
    - [9-2-2. 발견💡](#9-2-2-발견)
    - [9-2-3. 배운점📝](#9-2-3-배운점)
  - [9-3. 선언🧎🏻](#9-3-선언)

---

## 9-1. Obsever 패턴 제대로 작동시키자

### 9-1-1. 현상🧱

- 관찰자 생성 -> 관찰 타겟 생성 -> 관찰자는 관찰 타깃을 관찰 -> 관찰 대상의 가시성이 변경될 때마다 콜백 함수를 실행
- 무한 스크롤을 위해 옵저버 패턴을 구현했지만, 콜백함수가 여러번 호출되는 문제가 생겼다.

```javascript
const infiniteScroll = () => {
  page++;
  fetchArticles();
};

const startObserving = () => {
  const $observer = new IntersectionObserver(infiniteScroll, { threshold: 0.7 });
  const target = document.querySelector('.scroll-observer');

  $observer.observe(target);
};
```

### 9-1-2. 발견💡

- `threshold` 옵션을 주었음에도 콜백 호출이 정확하지 않은 경우가 있었다.
  - 첫째, `threshold` 값이 너무 작아서 뷰포트와 타겟 엘리먼트가 일부분만 교차될때
  - 두번째, 타겟 엘리먼트가 이미 뷰포트 안에 위치할 때
- 우리의 상황은 두번째 상황이었고, 해당 상황을 타개하기 위해서는 꼭 `IntersectionObserver` 콜백에서 뷰포트와 타겟 엘리먼트가 교차했는지에 대한 boolean 값을 반환하는 `entries` 배열의 `isIntersecting`을 확인하는 것이 꼭 필요했다.

  ```javascript
  // prettier-ignore
  const startObserving = () => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].intersectingRatio === 1 || !entries[0].isIntersecting) return;
  
      page += 1;
      fetchArticles();
    }, { threshold: 0.8 });
  
    observer.observe(document.querySelector('.scroll-observer'));
  };
  ```

- 콜백함수에 `isIntersecting`의 값으로 early return 처리하여 뷰포트안에 위치하더라도 콜백함수가 호출되지 않도록 처리할 수 있었다.

### 9-1-3. 배운점📝

- `IntersectionObserverEntry` 객체의 다양한 속성을 활용하여 교차 영역에 대한 다양한 처리를 수행 할 수 있음을 배웠다.
- 옵저버 패턴에서 `threshold` 값을 조절하는것 외에, 상황에 맞게 다양한 속성을 활용해야 함을 배웠다.

## 9-2. Proxy 객체 사용하기

### 9-2-1. 현상🧱

- Proxy 객체를 활용해 전역 상태의 변화를 감지 및 자동 리렌더링을 구현하라는 과제 요구사항이 있었다.
- Proxy에 대해 들어보긴 하였으나 직접 사용해본 경험은 없었으므로 사용 방법 및 필요성에 대해 이해하지 못한 채 과제에 접근했다.

### 9-2-2. 발견💡

- Proxy 객체의 `set` 메서드를 사용하여 전역 state가 변경될 때마다 실행될 로직(즉, state 업데이트 및 구독 중인 컴포넌트 리렌더링)을 자동 실행시킬 수 있다.

  ```javascript
  state = new Proxy(initState, {
    set(target, key, newState) {
      if (target[key] === newState) return false;

      target[key] = newState;
      renderCallback();

      return true;
    },
  });
  ```

### 9-2-3. 배운점📝

- Proxy 객체는 다른 객체<sup>target</sup>에 대한 기본 작업을 가로채고 재정의한다.
- Proxy 생성자 함수로 생성하며, 매개변수로 target(Proxy 객체로 감싸질 객체)과 handler(새로 정의되는 기본 작업들에 대한 정보를 가지고 있는 객체)를 받는다

  ```javascript
  const targetProxy = new Proxy(target, handler);
  ```

- 예를 들어 `targetProxy`의 핸들러 객체에 setter 함수가 정의되어 있다면, `targetProxy` 객체의 프로퍼티가 재정의될 때마다 setter 함수가 실행되게 된다.
- 아래 예시의 경우 setter 함수가 새로 입력된 값이 문자열 타입이 아닌 경우 콘솔에 에러 메시지를 출력하도록 정의되어있다.
- 또한, `targetProxy`가 성공적으로 변경되면 원본 객체에도 변화가 자동 적용된다.

  ```javascript
  const target = {
    name: 'James',
    locataion: 'Korea',
  };

  const targetProxy = new Proxy(target, {
    set(target, prop, value) {
      if (typeof value !== 'string') {
        console.log('Value must be string.');
        return false;
      }
      target[prop] = value;
      return true;
    },
  });

  targetProxy.name = 23; // Value must be string.
  console.log(targetProxy); // { name: 'James', locataion: 'Korea' }
  targetProxy.name = 'Kevin';
  console.log(targetProxy); // { name: 'Kevin', locataion: 'Korea' }
  console.log(target); // { name: 'Kevin', locataion: 'Korea' }
  ```

- 이처럼 일반 객체의 기본동작을 가로채어 새로운 동작을 정의하는 것을 '트랩'을 설정한다고 한다.
- 주로 데이터 변화를 감지하는 logger, 데이터를 검증하는 validator로 사용하지만, 다른 트랩 로직 또한 설정할 수 있다.

## 9-3. 선언🧎🏻

- 코드를 작성하고 테스트하다 보면 항상 예외 상황이 발생하게 되는데 이를 적절히 판단하고 예외 상황을 처리해야 함을 느꼈다. (해상도 문제 포함)
- 이번 미션을 처음 시작할 때 프록시 객체를 굳이 사용해야 하는 이유에 대한 의문이 들었다(~~그래서 계속 사용하지 않아도 되는 이유에 대해서만 고민했다~~).
  - 하지만 프록시에 대한 자료들을 꾸준히 읽어보며 어떤 상황에서 사용되어야 하는 것인지에 대한 깊은 고민과 토론을 하며 프록시 객체를 유용하게 사용할 수 있음을 깨닫게 되었다.
  - 예를 들어 관리해야 하는 전역 상태가 많고, 이를 기반으로 다양한 컴포넌트를 리렌더링 해야하는 상황이라면 프록시 객체의 값이 변경됨에 따라 실행될 일련의 과정들을 정의 해두는 것이 편할 것 같다고 생각되었다.
  - 낯선 개념을 만나면 부정적인 생각보다는 빠르게 사용 방법을 파악하고, '왜' 이런 개념이 등장하게 되었는지에 대해 고민해보는 자세를 유지할 필요가 있어보인다.
