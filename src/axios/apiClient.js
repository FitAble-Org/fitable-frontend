// src/axios/apiClient.js
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://api.fitable.kro.kr',
  withCredentials: true, // CORS 허용
});


// 요청 인터셉터 추가: Access Token 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가: 401 발생 시 Refresh Token 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      try {
        // Refresh Token 갱신 요청
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('https://api.fitable.kro.kr/auth/refresh', {
          refreshToken,
        });
        const newAccessToken = data.accessToken;

        // Access Token 갱신 및 재시도
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
