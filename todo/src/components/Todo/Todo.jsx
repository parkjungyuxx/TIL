import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Todo({ todo, onUpdate, onDelete }) {
  const { text, status } = todo;

  const handleChange = (e) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };
  return (
    <li>
      <input
        type="checkbox"
        id="checkbox"
        checked={status === "completed"}
        onClick={handleChange}
      />
      <label htmlFor="checkbox">{text}</label>
      <button>
        <FaRegTrashAlt />
      </button>
    </li>
  );
}
