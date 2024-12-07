import { useState } from "react";

const UseState = () => {
  // react가 어떻게 동작했는지
  // react는 dom의 복사본을 생성해서 가상 dom (object)
  // react에서는 변화르 일으켜도 가상돔 -> 실제돔 적용되지 않아요
  // react에서는 개발자의 의도에 따라 가상돔과 실제돔을 동기화
  // 그 의도 === 상태(state)가 변경되면 실제돔과 가상돔이 동기화, 해당 state가 변화된 함수만(컴포넌트)
  // => 개바자의 의도에 따라 상태가 변경되고, 상태가 변경 된 함수(컴포넌트)만 실제 돔과 동기화

  const [isSelect, setIsSelect] = useState(false);

  return (
    <>
      {isSelect ? "hello" : "bye"}
      <button
        onClick={() => {
          setIsSelect(!isSelect);
        }}
      >
        button
      </button>
    </>
  );
};

/**
 * useState는 react에서 가상돔과 실제돔을 동기화해줄 trigger
 * 상태(변수)를 생성하고 관리하는 훅 함수
 * 
 * 1. const [상태, 상태변경함수] = useState()
 * 구조분해할당
 */

export default UseState;
