import { BASE_URL, LOGIN_API_URL } from '@/apis/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiLoginClient = axios.create({
  baseURL: BASE_URL + LOGIN_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiLoginClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.data?.message || '로그인에 실패하였습니다.';

    if (status >= 400 && status < 500) {
      toast.error(message);
    } else if (status >= 500) {
      toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else {
      toast.error('알 수 없는 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  }
);

export default apiLoginClient;
