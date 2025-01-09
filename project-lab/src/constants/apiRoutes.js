import { login } from './auth';

export const authenticateUser = async (credentials) => {
  const { userId, pw } = credentials;
  try {
    const data = await login(userId, pw);
    return data;
  } catch (error) {
    throw error;
  }
};