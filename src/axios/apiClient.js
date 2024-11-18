// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:8080/api/',
  baseURL: 'https://api.fitable.kro.kr/api/',
  withCredentials: true
});

// JWT 토큰을 설정하는 함수
export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(token)
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
}

export default apiClient;