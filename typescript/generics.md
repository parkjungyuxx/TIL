# 제네릭(Generics)

## 1. 제네릭이 필요한 이유

프로그래밍에서 변수는 값이 유동적으로 변할 수 있도록 하는 장치다. 반면 타입스크립트에서 사용하는 타입들은 대부분 고정되어 있다. 예를 들어 number[], string 등은 데이터의 타입을 고정시켜 제한된 타입만 받을 수 있다.

이러한 제한은 유연한 프로그래밍을 방해하며, 다양한 타입의 데이터를 처리해야 하는 상황에서 반복적인 코드가 생길 수 있다. 이를 보완하기 위해 등장한 것이 제네릭이다.

제네릭은 타입을 마치 변수처럼 처리할 수 있도록 하는 문법이다. 함수나 클래스, 인터페이스 등에 고정된 타입이 아닌, 사용 시점에 타입을 전달하여 코드의 재사용성과 타입 안정성을 동시에 높일 수 있다.

## 2. 유니온 타입의 한계

타입 유연성을 위해 유니온 타입을 사용할 수 있다. 예를 들어 string | number는 두 타입을 모두 처리할 수 있도록 허용한다.

하지만 유니온 타입을 사용할 경우 예상하지 못한 타입 조합이 들어올 수 있다. 예를 들어

```tsx
 add(x: string | number, y: string | number)
```

와 같은 함수는 x와 y가 각각 string 또는 number일 수 있기 때문에 x: string, y: number와 같은 조합도 허용된다. 이는 원하는 타입 조합만 허용하고자 하는 의도와는 다르며, 타입 안정성을 해친다.

## 3. 함수 오버로딩의 사용과 한계

이러한 문제를 해결하기 위해 타입스크립트는 함수 오버로딩을 지원한다. 즉, 동일한 함수 이름에 여러 타입 시그니처를 부여하여 타입별 동작을 구분할 수 있다.

```tsx
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any) {
  return x + y;
}
```

이 방법은 타입별 동작을 정확히 분리할 수 있지만, 타입 조합이 많아질수록 코드가 길어지고 관리가 어려워진다는 단점이 있다.

## 4. 제네릭 기본 문법과 원리

제네릭은 타입을 꺾쇠 괄호 <> 안에 변수처럼 정의한다. 가장 일반적으로 사용하는 문법은 다음과 같다.

```tsx
function add<T>(x: T, y: T): T {
  return x + y;
}
```

여기서 T는 타입 변수이며, 함수가 호출될 때 실제 타입으로 대체된다. 예를 들어 add<number>(1, 2)를 호출하면 T는 number로 대체되고 함수는 number 타입으로 동작한다. 

제네릭은 호출 시 타입을 명시하지 않아도 인자의 타입을 보고 자동으로 추론할 수 있다. 하지만 복잡한 상황에서는 추론이 어려워 명시적으로 타입을 지정해야 할 수 있다.

## 5. 제네릭의 특징

제네릭(Generic)은 함수나 클래스의 **선언 시점**이 아닌, **사용 시점에 타입을 지정할 수 있는 기능**을 제공한다.

타입을 마치 변수처럼 선언하고, 이를 통해 **재사용 가능하고 타입 안정성이 높은 코드**를 만들 수 있다.

다음은 제네릭의 주요 특징들이다.

1. 타입이 고정되는 것을 방지하고 재사용 가능한 요소를 선언할 수 있다.
    
    → 다양한 타입에 대해 동일한 로직을 작성할 수 있다.
    
2. 타입 검사를 컴파일 시점에 진행함으로써 타입 안정성을 보장한다.
    
    → 잘못된 타입 사용 시 컴파일 에러를 통해 사전에 오류를 방지할 수 있다.
    
3. 캐스팅 관련 코드를 제거할 수 있다.
    
    → as나 any같은 타입 단언을 사용하지 않아도 안전하게 동작하게 만든다.
    
4. 제네릭 로직을 이용해 다양한 타입에 대응하는 재사용 가능한 유틸리티 함수를 만들 수 있다.
    
    → Array, Promise, Map 등 대부분의 표준 라이브러리에서도 활용된다.
    

## 6. 제네릭 함수의 예

```tsx
function toArray<T>(a: T, b: T): T[] {
  return [a, b];
}
```

제네릭은 다양한 타입의 데이터를 입력받아 동일한 로직으로 처리할 수 있게 해준다.

```tsx
toArray<number>(1, 2); // [1, 2]
toArray<string>('a', 'b'); // ['a', 'b']

```

## 7. 제네릭 타입 제약 (extends)

제네릭은 모든 타입을 허용하지만, 경우에 따라 특정 타입으로 제한해야 할 필요가 있다. 이때 extends 키워드를 사용하여 타입 제한을 줄 수 있다.

```tsx
function identity<T extends string | number>(value: T): T {
  return value;
}
```

이 예시는 T가 반드시 string이나 number여야 함을 의미한다.

## 8. 속성 제약 조건

```tsx
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // 오류
  return arg;
}
```

T의 구조를 알 수 없기 때문에 컴파일러는 length가 있는지 보장할 수 없다. 이럴 땐 다음처럼 제한을 걸 수 있다.

```tsx
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 9. 매개변수별 제약조건

여러 개의 제네릭 타입을 함께 사용할 수 있고, 각각의 타입에 다른 제약을 줄 수 있다.

```tsx
function myFunc<T extends string, K extends number>(a: T, b: K): void {
  console.log(typeof a, typeof b); // string, number
}
```

## 10. keyof와 함께 쓰는 제네릭 제약

keyof는 객체 타입의 키들을 유니온 타입으로 반환한다. 이를 활용하면 객체의 속성명만 입력값으로 제한할 수 있다.

```tsx
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a'); // 성공
getProperty(x, 'm'); // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음.
```

이 방식은 리터럴 키만 허용하여 오타를 컴파일 시점에 방지한다.

## 11. 함수 제약 조건

제네릭에서는 단순한 타입 변수뿐 아니라, **함수 타입을 제네릭으로 제한**할 수도 있다.

이런 방식은 매개변수로 콜백 함수나 특정 형태의 함수를 받아야 할 때 유용하다

```tsx
function translate<T extends (a: string) => number, K extends string>(x: T, y: K): number {
  return x(y);
}
```

이 함수는 두 개의 인자를 받는다.

- x: 문자열을 입력받아 숫자를 반환하는 **함수**
- y: 문자열

그리고 내부에서 x(y)를 실행하여 그 결과를 반환한다.

```tsx
const num = translate((a) => { return +a; }, '10');
console.log(num); // 10
```

- (a) ⇒ +a: 문자열을 숫자로 바꿔주는 함수, 타입은 (a:string) ⇒ number 이므로 T 제약을 만족
- ‘10’: 문자열이므로 K 제약을 만족

### 왜 제네릭으로 작성할까?

이 함수를 아래처럼 제네릭 없이 쓸 수도 있다.

```tsx
function translate(x: (a: string) => number, y: string): number {
  return x(y);
}
```

하지만 제네릭을 사용하면 다음과 같은 장점이 있다.

- 외부에서 전달하는 함수의 타입을 명확하게 제한
- 다양한 콜백 함수에 대응할 수 있는 유연한 구조
- 향후 T, K, R 같은 타입 변수를 통해 더 일반화된 형태로 확장 가능

## 11. 제네릭 함수 타입

제네릭 함수 자체도 타입으로 정의할 수 있다.

```tsx
interface GenericIdentityFn {
   <T>(arg: T): T; // 제네릭 함수 타입 구조
}

function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: GenericIdentityFn = identity;

myIdentity<number>(100);
myIdentity<string>('100');
```

또는 인터페이스에 제네릭을 넘겨줄 수도 있다.

```tsx
interface GenericIdentityFn<T> {
   (arg: T): T;
}

function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
let myIdentity2: GenericIdentityFn<string> = identity;

myIdentity(100);
myIdentity2('100');
```

## 12. 제네릭 클래스

클래스에서도 제네릭을 사용할 수 있으며, 이를 통해 다양한 타입을 다루는 재사용 가능한 클래스 구조를 만들 수 있다.

```tsx
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(v: T, cb: (x: T, y: T) => T) {
    this.zeroValue = v;
    this.add = cb;
  }
}
```

```tsx
const num = new GenericNumber<number>(0, (x, y) => x + y);
const str = new GenericNumber<string>('0', (x, y) => x + y);
```

제네릭 클래스는 static 속성에는 사용할 수 없다.

## 13. 자료구조 구현

스택과 큐 같은 자료구조도 제네릭을 이용해 다양한 타입으로 구현할 수 있다.

```tsx
class Stack<T> {
  private items: T[] = [];
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
}
```

```tsx
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.pop(); // 1
```

## 14. 생성자 제약

함수 인자로 생성자 타입만 허용하고 싶을 경우 다음과 같은 형식으로 제네릭을 제한할 수 있다.

```tsx
function add<T extends abstract new (...args: any) => any>(x: T): T {
   return x;
}

class A {}

add(A);
```

이 방식은 React나 라이브러리 내부에서 자주 쓰인다.