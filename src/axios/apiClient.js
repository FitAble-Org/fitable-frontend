// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  // baseURL: 'http://43.201.248.185:8081/api/',
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