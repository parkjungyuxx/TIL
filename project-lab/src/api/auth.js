import apiInstance from './apiInstance';

export const login = async (userId, pw) => {
    try {
      const response = await apiInstance.post('/login', { userId, pw });
      return response.data; // 성공적인 응답 데이터 반환
    } catch (error) {
      // 실패 시 상태 코드 확인 및 처리
      if (error.response) {
        const { status, data } = error.response;
  
        // 상태 코드에 따른 커스텀 에러 처리
        switch (status) {
          case 400:
            throw new Error('Invalid request. Please check your input.');
          case 401:
            throw new Error('Unauthorized. Check your credentials.');
          case 500:
            throw new Error('Server error. Please try again later.');
          default:
            throw new Error(data?.msg || 'An unexpected error occurred.');
        }
      } else {
        // 네트워크 오류 또는 다른 이유로 응답이 없는 경우
        throw new Error('Network error. Please check your connection.');
      }
    }
  };
  
  // axios