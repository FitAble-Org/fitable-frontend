<template>
  <div class="registration-container">
    <div class="header">
      <h2 class="title">회원가입</h2>
    </div>

    <div class="input-fields">
      <input 
        type="text" 
        placeholder="아이디 (4글자 이상)" 
        class="input-field" 
        v-model="username" 
      />
      <div v-show="!isUsernameValid" class="error-message">아이디는 4글자 이상이어야 합니다.</div>

      <input 
        type="password" 
        placeholder="비밀번호 (4글자 이상)" 
        class="input-field" 
        v-model="password" 
      />
      <div v-show="!isPasswordValid" class="error-message">비밀번호는 4글자 이상이어야 합니다.</div>
      
      <input 
        type="password" 
        placeholder="비밀번호 확인" 
        class="input-field" 
        v-model="passwordConfirm" 
      />
      <div v-show="!isPasswordMatch" class="error-message">비밀번호가 일치하지 않습니다.</div>
    </div>

    <button 
      class="submit-button" 
      @click="register"
    >
      회원가입
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

const router = useRouter();

// 입력값 상태
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");

// 유효성 검사 상태
const isUsernameValid = ref(true);
const isPasswordValid = ref(true);
const isPasswordMatch = ref(true);

// 유효성 검사 함수
function validateFields() {
  isUsernameValid.value = username.value.length >= 4;
  isPasswordValid.value = password.value.length >= 4;
  isPasswordMatch.value = password.value === passwordConfirm.value;
}

// 실시간 유효성 검사
watch(username, (newUsername) => {
  isUsernameValid.value = newUsername.length >= 4;
});

watch(password, (newPassword) => {
  isPasswordValid.value = newPassword.length >= 4;
  isPasswordMatch.value = newPassword === passwordConfirm.value; // 비밀번호 확인도 함께 업데이트
});

watch(passwordConfirm, (newPasswordConfirm) => {
  isPasswordMatch.value = password.value === newPasswordConfirm;
});

// 회원가입 함수
async function register() {
  // 최종 유효성 확인
  validateFields();

  if (!isUsernameValid.value || !isPasswordValid.value || !isPasswordMatch.value) {
    alert("입력 정보를 확인해 주세요.");
    return;
  }

  try {
    // 회원가입 요청
    await apiClient.post("/users/register", {
      loginId: username.value,
      password: password.value,
    });

    alert("회원가입 성공!");
    router.push({ name: "Login" });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert("이미 존재하는 아이디입니다.");
    } else {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }
}
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
  margin-bottom: 30px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin: -10px 0 10px 10px;
  text-align: left;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
