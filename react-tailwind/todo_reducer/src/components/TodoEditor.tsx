import { ActionDispatch, ChangeEvent, FormEvent, useState } from "react";

export default function TodoEditor({
  dispatch,
}: {
  dispatch: ActionDispatch<React.AnyActionArg>;
}) {
  const [text, setText] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "AddTodo", payload: text });
    setText("");
  };
  return (
    <form className="flex p-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new todo"
        className="flex-grow p-2 border rounded-l-md focus:outline-none"
        onChange={handleInputChange}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
        Add
      </button>
    </form>
  );
}
