const { useState } = require("react");

const useUsers = () => {
  const [users, setUsers] = useState([]);

  const addUser = ({ name }) => {
    const newUsers = {
      id: Math.floor(Math.random() * 100000000),
      name,
    };
    setUsers([...users, newUsers]);
  };


  // users라는 상태와 관련된 다양한 기능의 집합

  const findUser = ({ id }) => {
    const findUser = users.find((user) => user.id === id);
    return findUser;
  };

  // return [users, addUsers, findUser] -> 배열형태도 가능 
  return {users, addUser, findUser}
};


export default useUsers;

/**
 * 커스텀 훅 만들 때
 * 하나의 커스텀훅이 너무 커지지 않도록 주의  
 * 분리 (단일책임원칙)
 * 
 */