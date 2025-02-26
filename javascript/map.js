/**
 * Map 
 * 키가 있는 값을 저장하고 쌓는 다는 것은 객체와 유사
 * 다만, 문자열 뿐만이 아닌 다른 자료형도 키 값으로 허용할 수 있다는 장점
 * 
 * 다차원 배열로 구성
 * [ [key, value], [key, values], [newKey, newValue], [], []]
 * 
 * const 변수 = new Map()
 * 변수.set(newkey, newValue)
 * 변수.has(key) true/false 반환
 * 변수.delete(key)
 * 변수.clear()
 * 변수.size()
 * 변수.get(key)
 * 
 */

const erros = new Map ([[404, "Not Found"]])

erros.get(404);
erros.set(500, "Network Error")

/**
 * Set
 * 중복을 허용하지 않는 해시 테이블 구조
 * 배열의 중복되는 값을 삭제하기 위해서 많이 사용하는 자료구조
 * 
 */

const set = new Set([1,1,1,1,2,2,2,2,3,4,5,4])

set.values(); // 1,2,3
Array.from(set);

// 매서드 체이닝이됨
set.add().add().add();
set.delete(1);
