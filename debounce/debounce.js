/**
 * 디바운스 기법 (Debounce)
 * 디바운스(Debounce)는 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화하여 마지막 이벤트만 처리하는 프로그래밍 기법.
 */

// 디바운스 기법 사용 

window.addEventListener("DOMContentLoaded", () => {
  const editDiv = document.getElementById("edit-div");

  if (localStorage.getItem("context"))
    editDiv.textContent = localStorage.getItem("context");

  const debounce = (callback, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      setTimeout(() => {
        callback();
      }, delay);
    };
  };

  const saveTextContext = debounce(() => {
    localStorage.setItem("context", editDiv.textContent);
  }, 1000);
  editDiv.addEventListener("input", saveTextContext);
});
