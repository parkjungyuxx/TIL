type TodoItem = { id: number; text: string; done: boolean };

type TodoReducerAction =
  | {
      type: "AddTodo";
      payload: string;
    }
  | {
      type: "ToggleTodo";
      payload: number;
    };
