console.log(this);
// (browser) window, (node) globalThis
// 가장 상위 객체 출력

function func() {
    console.log(this);
    // window, globalThis
    // 전역함수의 주인은 전역 객체이기 때문에 콘솔 사용하면 가장 상위의 객체가 출력
}

const park = {
    print() {
        console.log(this); // park
    },

    arrow : () => {
        console.log(this); // 현재 객체가 아닌 상위 객체를 가르킴, window, globalThis
    }
}

park.print();  // park 
park.arrow(); // globalThis

// this는 애초에 동적으로 바인딩 되기 때문에 값을 수정하거나 변환할 수도 있음.
// call, apply, bind

