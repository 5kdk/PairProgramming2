# 5. AnalogClock 회고🤔💭

## 5-1. 상수가 필요한가요?

### 5-1-1. 현상🧱

- 현재 시간을 화면에 반영하기 위해서 1초마다 현재 시간의 시/분/초를 기준으로 각 침의 위치를 계산하여 화면에 반영했다.
- 이를 위해 매 인터벌마다 360도로 곱해주어 시계에 알맞게 각 침이 위치하도록 하였는데, 이를 상수화할지 말지에 대한 고민이 있었다.

  ```javascript
  const FULL_CIRCLE = 360;

  $container.querySelector('.hand.second').style.setProperty('--deg', secDegree * FULL_CIRCLE);
  $container.querySelector('.hand.minute').style.setProperty('--deg', minDegree * FULL_CIRCLE);
  // ...
  ```

### 5-1-2. 발견💡

- 해당 과제 코드 내부에서 360 또한 상수화하여 사용하려고 하였으나, 원의 각도를 나타내는 360이 변경될 이유가 없고, 모두 degree라는 네이밍 규칙이 포함된 피연산자들과 함께 연산되기 때문에, 360도라고 유추할 수 있다 판단하여 상수화하지 않았다.
  ```javascript
  $container.querySelector('.hand.second').style.setProperty('--deg', secDegree * 360);
  $container.querySelector('.hand.minute').style.setProperty('--deg', minDegree * 360);
  // ...
  ```

### 5-1-3. 배운점📝

> 💡**매직 넘버**<sup>Magic Number</sup>
>
> 개발에서 매직넘버란 코드 안에 작성된 구체적인 수치 값을 말한다.
> 통상 매직 넘버는 코드 내에서의 역할을 명확히 하고 변경이 용이하도록 상수화하여 사용한다.

<br>

---

## 5-2. 선언🧎🏻

- 개발에 은탄환은 없다. 상황에 맞게 유도리있게 판단하여 코딩하는 것이 적절해 보인다.
