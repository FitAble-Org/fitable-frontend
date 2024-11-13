<template>
    <div class="registration-container">
      <div class="header">
        <h2 class="title">회원가입</h2>
      </div>
  
      <div class="input-fields">
        <input type="text" placeholder="아이디" class="input-field" v-model="username" />
        <div v-show="usernameExists" class="error-message">존재하는 아이디입니다.</div>
  
        <input type="password" placeholder="비밀번호" class="input-field" v-model="password" />
        
        <input type="password" placeholder="비밀번호 확인" class="input-field" v-model="passwordConfirm" @input="checkPasswordMatch" />
        <div v-show="!isPasswordMatch" class="error-message">비밀번호가 일치하지 않습니다.</div>
      </div>
  
      <button class="submit-button" @click="register">회원가입</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        password: '',
        passwordConfirm: '',
        usernameExists: false, 
        isPasswordMatch: true,
      };
    },
    methods: {
      checkPasswordMatch() {
        this.isPasswordMatch = this.password === this.passwordConfirm;
      },
      async register() {
        console.log(this.$route.query);
        if (this.isPasswordMatch) {
          try {
           await axios.post('http://localhost:8080/api/users/register', {
             ...this.$route.query,
             loginId: this.username,
             password: this.password
            })
            alert("회원가입 성공!");
          }
          catch(error) {
            console.error("회원가입 오류:", error);
          alert("회원가입 중 오류가 발생했습니다.");
          }
        }
        else {
          alert("입력 정보를 확인해 주세요.");
        }
          this.$router.push({ name: 'Login' });
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
  
  .error-message {
    color: red;
    font-size: 14px;
    margin: -10px 0 10px 10px;
    text-align: left;
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
  