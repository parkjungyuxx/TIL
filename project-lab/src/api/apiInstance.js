import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://mj3000.iptime.org:8889',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance;

// axios