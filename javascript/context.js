
var a = "var";
const b = "const";

function foo () {
    const foo = "foo";
    bar();
    function bar() {
        const d = "bar";
        console.log("bar")
    }
}
foo()

/**
 * 
 * 1. 전역 객체 생성
 * 2. 전역 실행 컨텍스트 생성
 * 3. 전역 실행 컨텍스트 평가 (a, b, foo)
 * 4. 전역 실행 컨텍스트 실행
 * 5. 13번째 foo 함수 실행
 * 6. 함수 실행 컨텍스트 생성
 * 7. 함수 실행 컨텍스트 평가 (foo, bar - scope)
 * 8. foo 함수 실행
 * 9. bar 함수 실행 컨텍스트 생성
 * 10. bar 함수 실행 컨텍스트 평가
 * 11. bar 함수 실행
 * 12. 종료
 */