import apiInstance from './apiInstance';

export const login = async (userId, pw) => {
  try {
    const response = await apiInstance.post('/login', {
      userId,
      pw,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};