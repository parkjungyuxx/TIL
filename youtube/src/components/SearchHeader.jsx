import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsYoutube, BsSearch } from "react-icons/bs";

export default function SearchHeader() {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="w-full flex p-4 text-2xl border-zinc-600 mb-4">
      <div>
        <Link to="/" className="flex">
          <BsYoutube />
          <h1>Youtube</h1>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seacrh..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
