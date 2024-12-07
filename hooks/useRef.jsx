// react의 rerendering 함수를 다시 실행하는 것
// 함수가 다시 실행되면 변수가 초기화
// 초기화 -> useState(?)
// state를 쓰고 싶지는 않은데 변수가 초기화 되지도 않았으면 좋겠어
// useRef는 리랜더링이 되더라도 초기화 되지않는 성질을 가지고 있음 -- 그래서 dom api에 접근할 일이 있다면 useRef를 사용 (document.querySelector가 아닌)

import { useImperativeHandle, useRef, useState } from "react";

const UseRef = () => {
  let isSelected = false;

  const isSelectedRef = useRef(false); // 값이 유지
  const [forceRender, setForceRender] = useState(false);

  const handleClick = () => {
    isSelectedRef.current = !isSelectedRef.current;
    isSelected = !isSelected;
    console.log(isSelectedRef.current);
  };



  const handleFoceRender = () => {
    setForceRender(!forceRender);
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
      <button onClick={handleFoceRender}>render</button>
    </>
  );
};

export default UseRef;
