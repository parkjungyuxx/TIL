import { useEffect, useState } from "react";

const UseMount = () => {
  const [isMount, setIsMount] = useState(false);
  console.log(isMount);
  useEffect(() => {
    console.log("fetching...");

    return function () {
      console.log("언마운트됨..");
    };
  }, []);
  return (
    <>
      mount
      <button
        onClick={() => {
          setIsMount(!isMount);
        }}
      >
        버튼
      </button>
    </>
  );
};

export default UseMount;
