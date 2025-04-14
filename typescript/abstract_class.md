## 추상 클래스 (Abstract Class)
추상 클래스는 인스턴스를 생성할 수 없는 클래스이며, 다른 클래스가 상속을 통해 기능을 구현하도록 강제하는 용도로 사용된다.
일반 클래스와 달리 일부 메서드는 구현을 가지지 않고, 자식 클래스에서 반드시 구현하도록 강제할 수 있다.

### 기본 문법
```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark!");
  }
}

const dog = new Dog();
dog.makeSound(); // Bark!
dog.move();      // Moving...
```

- abstract 키워드를 사용하여 추상 클래스를 정의한다.
- abstract makeSound()처럼 구현이 없는 메서드는 자식 클래스에서 반드시 구현해야 한다.
- 일반 메서드도 포함할 수 있다 (move()처럼 구현이 있는 메서드).

### 특징
- 인스턴스를 직접 생성할 수 없다.
```ts
const a = new Animal(); // 오류: 추상 클래스는 인스턴스를 생성할 수 없음
```
- 상속을 통해서만 사용 가능하다.
- 자식 클래스는 추상 메서드를 반드시 오버라이딩해야 한다.
- 추상 클래스는 공통 로직을 정의하면서도 특정 동작은 서브 클래스에 위임할 수 있다.