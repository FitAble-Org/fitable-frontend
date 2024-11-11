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
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        if (this.username && this.password) {
          alert("로그인 성공!");
          this.$router.push({ name: 'Home' });
        } else {
          alert("아이디와 비밀번호를 입력해 주세요.");
        }
      }
    }
  };
  </script>
  
  
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
    margin-top: 50px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 8px;
  }
  
  .input-fields {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 80%;
    max-width: 300px;
  }
  
  .input-field {
    padding: 15px;
    font-size: 18px;
    color: #333333;
    background-color: #f5f5f5;
    border: none;
    border-radius: 8px;
    text-align: center;
  }
  
  .submit-button {
    width: 80%;
    max-width: 300px;
    padding: 15px;
    font-size: 18px;
    color: #ffffff;
    background-color: #4CAF50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 50px;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  