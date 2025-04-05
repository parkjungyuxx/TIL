/**
 * 디바운스 기법 (Debounce)
 * 디바운스(Debounce)는 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화하여 마지막 이벤트만 처리하는 프로그래밍 기법.
 */

// 디바운스 함수
function debounce(func, delay) {
    let timer;
    
    return function() {
      const context = this;
      const args = arguments;
      
      clearTimeout(timer);
      
      timer = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    };
  }
  
  // DOM 요소
  const searchInput = document.getElementById('search-input');
  const resultDiv = document.getElementById('result');
  const counterDiv = document.getElementById('counter');
  
  // 카운터 초기화
  let eventCount = 0;
  let processedCount = 0;
  
  // 검색 처리 함수
  function processSearch(e) {
    processedCount++;
    const searchTerm = e.target.value;
    
    resultDiv.textContent = `검색어: "${searchTerm}" (${new Date().toLocaleTimeString()})`;
    counterDiv.textContent = `이벤트 발생: ${eventCount}, 처리: ${processedCount}`;
  }
  
  // 디바운스 적용된 함수
  const debouncedSearch = debounce(processSearch, 500);
  
  // 이벤트 리스너
  searchInput.addEventListener('input', function(e) {
    eventCount++;
    counterDiv.textContent = `이벤트 발생: ${eventCount}, 처리: ${processedCount}`;
    
    // 디바운스 적용
    debouncedSearch(e);
  });