import { useMutation } from "@tanstack/react-query";
import loginUser from "../api/loginUser";

export const useLogin = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      alert("로그인에 성공했습니다!");
    },
    onError: (error) => {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error("Login failed:", error.message);
    },
  });
};
