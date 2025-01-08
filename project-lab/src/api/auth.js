import api from "./apiInstance"; // Axios Instance 가져오기

// 로그인 API 요청
export const login = async (id, password) => {
  try {
    const response = await api.post("/login", {
      id,
      password,
    });

    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error;
  }
};
