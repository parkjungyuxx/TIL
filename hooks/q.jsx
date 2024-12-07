import { useEffect, useState } from "react";

const Q1 = () => {
  // 해당 문제에서는 필요없는 상태가 1가지 존재합니다
  // 삭제하고 최적화
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <>
      <h1>Q1</h1>
      <div>
        <label>성</label>
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div>
        <label>이름</label>
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div>성명: {lastName + firstName}</div>
    </>
  );
};

const Rope = () => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 3000);
  
      return function () {
        clearInterval(interval);
        setCount(0);
      };
    }, []);
    return <div>count : {count}</div>;
  };
  
  const Q2 = () => {
    const [isVisibleRope, setIsVisibleRope] = useState();
    // Rope 컴포넌트 존재
    // Rope라는 컴포넌트는 마운트 된 순간 3초마다 1회 씩 증가, 콘솔 출력
    // setInterval()
    // 1회, 2회, 3회, 4회
    // 횟수는 Rope의 text로 지정
    // unMount되면 횟수는 0으로 초기화 되고 증가는 멈춥니다
    return (
      <>
        <h1>Q2</h1>
        <button
          onClick={() => {
            setIsVisibleRope(!isVisibleRope);
          }}
        >
          버튼이요
        </button>
        {isVisibleRope && <Rope />}
      </>
    );
  };
  
  export { Q1, Q2 };


  // 과제
  // 타이머 만들기

  // 00 : 00 : 00
  // 23 : 59 : 59
  // start, record, stop, pause

  // start를 누르면 초가 1초식 증가
  // record를 누르면 아래 현재 HH : MM : SS 기록되어야함, 누적
  // stop을 누르면 0초로 돌아가면서 stop
  // pause를 누르면 일시 정지 다시 start누르면 재실행
  // setInterval, clearInterval, useRef, props
