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
    <div className="flex min-w-screen justify-center h-screen items-center">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-[8px]"
      >
        <input
          type="email"
          placeholder="email"
          className="border border-black w-[328px]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-black w-[328px]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="fullName"
          className="border border-black w-[328px]"
          onChange={(e) => setFullName(e.target.value)}
        />
        <button className="w-[328px]">signup</button>
      </form>
    </div>
  );
}
