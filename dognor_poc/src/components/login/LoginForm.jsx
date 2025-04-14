import React, { useState } from "react";
import { login } from "@/api/auth";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(id, password);
      console.log("로그인 성공:", data);
      // 토큰 저장 또는 리디렉션 처리
      localStorage.setItem("accessToken", data.accessToken);
    } catch (err) {
      setError(err.response?.data?.msg || "로그인에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
      {error && <p>{error}</p>}
    </form>
  );
}
