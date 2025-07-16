import { BASE_URL } from '@/apis/constants';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 500) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else if (status === 404) {
      alert('요청하신 페이지를 찾을 수 없습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
