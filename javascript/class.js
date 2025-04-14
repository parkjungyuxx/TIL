// 기본 클래스 선언
class Person {
    // constructor: 생성자 메서드 (인스턴스 생성 시 자동 호출)
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    // 일반 메서드: 모든 인스턴스가 공유
    greet() {
      console.log(`안녕하세요, 저는 ${this.name}이고 ${this.age}살입니다.`);
    }
  
    // getter: 값을 읽을 때 실행되는 함수
    get info() {
      return `${this.name} (${this.age})`;
    }
  
    // setter: 값을 설정할 때 실행되는 함수
    set info(value) {
      const [name, age] = value.split(',');
      this.name = name;
      this.age = Number(age);
    }
  
    // static 메서드: 클래스 자체에 귀속됨 (인스턴스 X)
    static isAdult(age) {
      return age >= 20;
    }
  }
  
  // 클래스 인스턴스 생성
  const p1 = new Person("준규", 28);
  p1.greet(); // 안녕하세요, 저는 준규이고 28살입니다.
  
  console.log(p1.info); // 준규 (28)
  p1.info = "도군,29"; // setter 호출됨
  console.log(p1.info); // 도군 (29)
  
  console.log(Person.isAdult(19)); // false (static 메서드는 클래스명으로 호출)
  
  // 상속 (extends)
  class Programmer extends Person {
    constructor(name, age, language) {
      // 부모 클래스의 생성자 호출
      super(name, age);
      this.language = language;
    }
  
    // 메서드 오버라이딩
    greet() {
      super.greet(); // 부모 메서드도 호출
      console.log(`전 ${this.language} 개발자입니다.`);
    }
  }
  
  const dev = new Programmer("준규", 28, "JavaScript");
  dev.greet();
  // 안녕하세요, 저는 준규이고 28살입니다.
  // 전 JavaScript 개발자입니다.
  
  // private 필드 (#) — ES2022부터 지원
  class BankAccount {
    #balance = 0; // private 필드
  
    constructor(owner) {
      this.owner = owner;
    }
  
    deposit(amount) {
      if (amount > 0) this.#balance += amount;
    }
  
    get balance() {
      return this.#balance;
    }
  }
  
  const myAccount = new BankAccount("세영");
  myAccount.deposit(10000);
  console.log(myAccount.balance); // 10000
  // console.log(myAccount.#balance); // 오류! 직접 접근 불가
  
  // 클래스 표현식 (익명 or 이름 있는 클래스)
  const Animal = class {
    speak() {
      console.log("동물이 소리를 냅니다.");
    }
  };
  
  const cat = new Animal();
  cat.speak(); // 동물이 소리를 냅니다.
  
  // instanceof로 클래스 타입 판별
  console.log(dev instanceof Programmer); // true
  console.log(dev instanceof Person); // true
  console.log(p1 instanceof Programmer); // false
  