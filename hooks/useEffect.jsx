import { useEffect, useState } from "react";
import UseMount from "./useMount";

const UseEffect = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClickSelected = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    console.log(isSelected);
    if (isSelected) {
    }
  }, [isSelected]);
  // useEffects는 컴포넌트가 마운트 되었을때 한번 실행
  // useEffect에서 사용하는 callbackfunction에 사용되는 모든 state는 의존성 배열
  // 의존성 배열은 개발자의도에 따라 넣는게 아니라, 반드시 필요한 state, function


  return (
    <>
      <button onClick={handleClickSelected}>select</button>
      {isSelected && <UseMount />}
    </>
  );
};

export default UseEffect;
