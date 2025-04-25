import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const signup = async (signupData: {
  email: string;
  fullName: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post('/signup', signupData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const login = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post('/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default axiosInstance;
