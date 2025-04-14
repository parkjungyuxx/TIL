// let 제목 = document.querySelector("#title");
// let 링크 = document.querySelectorAll(".naver");
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Array.from(링크).forEach((link) => {
//   if (link instanceof HTMLAnchorElement) {
//     link.href = "kakao.com";
//     console.log(link);
//   }
// });
// if (제목 instanceof Element) {
//   제목.innerHTML = "반가워요";
// }
// (숙제1) Car 클래스를 만들고 싶습니다.
// 1. 대충 { model : '소나타', price : 3000 } 이렇게 생긴 object를 복사해주는 class를 만들어보십시오.
// 2. 그리고 복사된 object 자료들은 .tax() 라는 함수를 사용가능한데 현재 object에 저장된 price의 10분의1을 출력해주어야합니다.
// 3. model과 price 속성의 타입지정도 알아서 잘 해보십시오. tax() 함수의 return 타입도요.
// class Car {
//   modal: string;
//   price: number;
//   constructor() {
//     this.modal = "소나타";
//     this.price = 3000;
//   }
//   tax(): number {
//     return this.price * 0.1;
//   }
// }
var Word = /** @class */ (function () {
    function Word() {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        this.numList = __spreadArray([], props, true).filter(function (el) { return typeof el === "number"; });
        this.strList = __spreadArray([], props, true).filter(function (el) { return typeof el === "string"; });
    }
    return Word;
}());
var obj = new Word('kim', 3, 5, 'park');
console.log(obj.numList);
