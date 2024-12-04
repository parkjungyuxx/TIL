import { useContext } from "react";

const TodoListContext = useContext();

const TodoListContextProvider = ({ children }) => {
  return <TodoListContext.Provider>{children}</TodoListContext.Provider>;
};
export { TodoListContext, TodoListContextProvider };
