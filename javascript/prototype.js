function Person(name, age) {
  this.name = name;
  this.age = age;
}

class PersonB {
  constructure(name, age) {
    this.name = name;
    this.age = age;
  }

  print() {
    console.log(this.name);
  }
}

Person.prototype.print = function () {
  console.log(this.name);
};

const user = new Person();
user.print();
// user.name;
// user.age;

// copySort는 원래 없는 매서드지만
// 프로토타입 활용해서 모든 어레이 객체에 copySort는 함수를 추가

Array.prototype.copySort = function () {
  console.log("arary");
};

// new 생성자를 통해 생성된 Array 객체는 우리가 정의한 프로토타입의 함수(copySort)가 상속된 인스턴스가 생성

const array = new Array();

// 프로토타입을 사용하는 가장 큰 이유는 -> 객체의 재사용성
// ES6(ECMAScript2015)에 새로 추가된 class 문법이 추가되면서 사용이 굉장히 줄어든 편
