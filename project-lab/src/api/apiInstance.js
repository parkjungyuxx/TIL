import axios from "axios";

const api = axios.create({
  baseURL: "https://example.com/api", // 공통 API 주소
  timeout: 5000, // 요청 제한 시간 설정 (5초)
  headers: {
    "Content-Type": "application/json", // 기본 Content-Type
  },
});

// 요청 인터셉터: 요청 전에 작업 추가 (예: 인증 토큰 추가)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 인증 헤더 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 응답 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
