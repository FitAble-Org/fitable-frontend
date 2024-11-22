<template>
  <div class="welcome-container">
    <img class="logo" src="@/assets/fitable.png" alt="Fitable Logo" />
    <h1 class="title">FitAble</h1>
    <p class="description">
      경증 장애인분들을 위한 운동 및 시설 추천 어플<br />
      맞춤형 운동을 통한 건강 관리를 시작해 보세요!
    </p>
    <button class="button" @click="navigateToRegister">회원가입</button>
    <button class="button" @click="navigateToHome">로그인</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 회원가입 페이지로 이동
function navigateToRegister() {
  router.push({ name: 'AgeSelection' });
}

// 로그인 페이지로 이동
function navigateToHome() {
  router.push({ name: 'Login' });
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  height: 100vh;
  background-color: #ffffff;
}

.logo {
  width: 300px; /* 로고 크기 조정 */
  height: auto;
  padding-top: 60px;
}

.title {
  font-size: 36px;
  color: #333333;
  margin-bottom: 16px;
}

.description {
  font-size: 16px;
  color: #666666;
  margin-bottom: 40px;
}

.button {
  width: 90%;
  height: 60px;
  padding: 12px;
  font-size: 18px;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 8px 0;
  text-align: center;
}

.button:hover {
  background-color: #45a049;
}
</style>
