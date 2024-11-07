<template>
    <div class="registration-container">
      <div class="header">
        <h2 class="title">회원가입</h2>
      </div>
  
      <div class="input-fields">
        <input type="text" placeholder="아이디" class="input-field" v-model="username" />
        <input type="password" placeholder="비밀번호" class="input-field" v-model="password" />
        <input type="password" placeholder="비밀번호 확인" class="input-field" v-model="passwordConfirm" />
      </div>
  
      <button class="submit-button" @click="register">회원가입</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        passwordConfirm: ''
      };
    },
    methods: {
      register() {
        if (this.password === this.passwordConfirm) {
          // 회원가입 처리 로직 추가
          alert("회원가입 성공!");
          // 페이지 이동을 위해 router 사용
          this.$router.push({ name: 'NextPage' }); // 여기에 원하는 페이지 경로로 변경
        } else {
          alert("비밀번호가 일치하지 않습니다.");
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
    width: 100%;
    max-width: 300px;
  }
  
  .input-field {
    width: 100%;
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
  