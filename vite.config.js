import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true; // 모든 요청에 세션 쿠키 포함


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@'는 'src' 폴더를 가리킴
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",  // 쿠키가 프론트엔드에서 올바르게 인식되도록 설정
      },
    },
  },
});