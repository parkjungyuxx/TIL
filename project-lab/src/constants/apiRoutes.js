import { login } from './auth';

export const authenticateUser = async (credentials) => {
  const { userId, pw } = credentials;
  try {
    const data = await login(userId, pw);
    return data; // 성공 시 데이터를 반환
  } catch (error) {
    // auth.js에서 넘어온 에러를 로깅하거나 UI에 적합한 메시지로 변환
    console.error('Authentication failed:', error.message);

    // 사용자에게 보여줄 메시지 처리
    if (error.message.includes('Unauthorized')) {
      throw new Error('Login failed. Please check your username and password.');
    } else if (error.message.includes('Server error')) {
      throw new Error('We are currently experiencing issues. Please try again later.');
    } else {
      throw error; // 나머지는 기본 에러 메시지로 전달
    }
  }
};
