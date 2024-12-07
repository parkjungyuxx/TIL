const { useState, useMemo, useEffect } = require("react");

const UseMemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);

  // 리랜더링이 되어도 해당 값은 실행 x
  const result = useMemo(() => {
    console.log("실행");
    return 5 + count;
  }, [count]);
  // 다른 state가 바뀔 때는 연산 x
  // 의존성 배열에 담긴 state가 바뀔 때만 연산
  // 복작합 연산이 있을 때 연산 횟수를 최소화

  // 문제점 -> 사용 판단을 개발자에게 맡김
  // 언제 사용해야하나요? -> 이렇게 해야한다

  // 그래서 useForgot이라하는 hook 함수 연구를 시작해서 React19 사라질 예정

  // backend server data fetching
  // 반복 n개 이상
  // 반복해야하는 배열의 길이가 긴 경우
  // 분기가 많은 경우
  // 안의 반환값이 클 경우 (ex. 컴포넌트, 아이콘, switch, 반복문)
  

  return (
    <div>
      {result}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default UseMemo;
