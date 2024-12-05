import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
    console.log(todos);
  };

  return (
    <section>
      <ul>
        {todos.map((item) => (
          <li>{item.text}</li>
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
