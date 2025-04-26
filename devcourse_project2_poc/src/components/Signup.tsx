import { useState } from "react";
import { signup } from "../apis/axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      alert("다시 입력해라");
      return;
    }

    signup({ email, password, fullName });
  };
  return (
    <>
      <form action="submit" onSubmit={handleSubmit}></form>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="fullName"
        onChange={(e) => setFullName(e.target.value)}
      />
      <button>signup</button>
    </>
  );
}
