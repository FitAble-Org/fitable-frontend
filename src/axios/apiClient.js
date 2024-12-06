// src/axios/apiClient.js
import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "https://api.fitable.kro.kr/api/",
  // baseURL: "http://localhost:8081/api/",
  withCredentials: true, // CORS 허용
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// 요청 인터셉터 추가: Access Token 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
    const originalRequest = error.config;

    // 로그인 요청이나 특정 요청에서는 Refresh Token 처리 제외
    if (
      originalRequest._isLoginRequest || // 플래그 확인
      (originalRequest.url && originalRequest.url.includes("/login")) // 특정 URL 확인
    ) {
      return Promise.reject(error); // 기본 에러 처리
    }

    if (error.response && error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("리프레시 토큰이 없습니다.");
          }

          // Refresh Token으로 Access Token 갱신
          const { data } = await axios.post(
            "http://localhost:8081/api/users/refresh",
            {
              refreshToken,
            }
          );

          const newAccessToken = data.accessToken;

          // 새 Access Token 저장
          localStorage.setItem("accessToken", newAccessToken);
          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // 로그인 페이지로 이동
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
