import { ActionDispatch, useState } from "react";

export default function TodoListItem({
  todo,
  dispatch,
}: {
  key: number;
  todo: TodoItem;
  dispatch: ActionDispatch<[action: TodoReducerAction]>;
}) {
  return (
    <li className="flex items-center justify-between p-3 border-b hover:bg-gray-100 transition-colors">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400"
          onChange={() => dispatch({ type: "ToggleTodo", payload: todo.id })}
          checked={todo.done}
        />
        <label style={{ textDecoration: todo.done ? "line-through" : "" }}>
          {todo.text}
        </label>
      </div>
      <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
    </li>
  );
}
