import TodoListItem from "./TodoListItem";

export default function TodoList({
  todos,
  dispatch,
}: {
  todos: TodoItem[];
  dispatch: React.ActionDispatch<[action: TodoReducerAction]>;
}) {
  return (
    <ul className="divide-y divide-gray-200">
      {todos &&
        todos.map((todo) => {
          return <TodoListItem key={todo.id} dispatch={dispatch} todo={todo} />;
        })}
    </ul>
  );
}
