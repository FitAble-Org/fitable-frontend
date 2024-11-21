<template>
    <div class="registration-container">
      <div class="header">
        <h2 class="title">로그인</h2>
      </div>
  
      <div class="input-fields">
        <input type="text" placeholder="아이디" class="input-field" v-model="username" />
        <input type="password" placeholder="비밀번호" class="input-field" v-model="password" />
      </div>
  
      <button class="submit-button" @click="login">로그인</button>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/axios/apiClient.js';
// import { setAuthToken } from '@/auth'; 

const router = useRouter();

// 상태 관리
const username = ref('');
const password = ref('');


// 로그인 함수
async function login() {
  if (username.value && password.value) {
    try {
      const response = await apiClient.post('users/login', {
        loginId: username.value,
        password: password.value,
      });
      // 로그인 성공 시 처리
      if (response.status === 200) {
            alert("로그인 성공!");
           // 응답 헤더에서 JWT 토큰 추출
            const token = response.headers['authorization'];
    
            if (token) {
              // Bearer 접두사가 포함되어 있을 수 있으므로 제거
              const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;
              console.log(accessToken);
              // setAuthToken(accessToken);
              localStorage.setItem('accessToken', accessToken);
            }

        router.push({ name: 'Home' });
      } else {
        alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  } else {
    alert('아이디와 비밀번호를 입력해 주세요.');
  }
}
</script>

  
<style lang="scss">
@import "@/mixins/sharedStyles.scss";
</style>

  <style scoped>
  .registration-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    height: 100vh;
    background-color: #ffffff;
    box-sizing: border-box;
    justify-content: space-between;
  }
  
  .header {
    margin-top: 100px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 8px;
  }
  </style>
  