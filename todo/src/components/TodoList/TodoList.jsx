import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState({
    id: 123,
    text: "안녕하세요",
    status: "active",
  });

  return (
    <section>
      <ul>
        {todos.map((item) => (
          <li>{item.text}</li>
        ))}
      </ul>
    </section>
  );
}
