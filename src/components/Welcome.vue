<template>
    <div class="welcome-container">
      <h1 class="title">Fitable</h1>
      <p class="description">
        실내외 운동으로 건강을 챙기세요!<br />
        맞춤 운동 추천과 주변 시설, 강좌 정보로 언제 어디서나 손쉽게 운동을 시작해보세요.
      </p>
      <button class="button" @click="navigateToRegister">회원가입</button>
      <button class="button" @click="navigateToHome">로그인</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Welcome',
    methods: {
      navigateToRegister() {
        this.$router.push({ name: 'AgeSelection' }); // 변경된 라우트 이름으로 수정
      },
      navigateToHome() {
        this.$router.push({ name: 'Login' });
      },
    },
  };
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
  }
  
  .title {
    font-size: 36px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 16px;
  }
  
  .description {
    font-size: 16px;
    color: #666666;
    margin-bottom: 40px;
  }
  
  .button {
    width: 80%;
    max-width: 300px;
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
  