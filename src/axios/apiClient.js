// src/apiClient.js
import axios from 'axios';

// 서버로부터 받은 JWT 토큰을 환경 변수로 분리하거나 필요할 때 동적으로 설정할 수 있습니다.
const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYSIsImlhdCI6MTczMTM5MzA1MCwiZXhwIjoxNzMxNDE0NjUwfQ.mIcLNmKF5c_1rjrB7uwrQoQLmQaM7H6LX0cqFKa8JHM';
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    Authorization: `Bearer ${jwtToken}`
  }
});

export default apiClient;