export default function todoReducer(
  todos: TodoItem[],
  action: TodoReducerAction
) {
  switch (action.type) {
    case "AddTodo":
      return [
        ...todos,
        {
          id: Math.random(),
          text: action.payload,
          done: false,
        },
      ];
    case "ToggleTodo":
      return todos.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case "DeleteTodo":
      return todos.filter((todo) => todo.id !== action.payload);

    default:
      return {};
  }
}
