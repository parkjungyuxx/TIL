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

    default:
      return {};
  }
}
