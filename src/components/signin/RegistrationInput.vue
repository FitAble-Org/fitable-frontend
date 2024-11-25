<template>
  <div class="registration-container">
    <div class="header">
      <h2 class="title">회원가입</h2>
    </div>

    <div class="input-fields">
      <input 
        type="text" 
        placeholder="아이디 (5글자 이상)" 
        class="input-field" 
        v-model="username" 
      />
      <div v-show="!isUsernameValid" class="error-message">아이디는 5글자 이상이어야 합니다.</div>
      <div v-show="usernameExists" class="error-message">존재하는 아이디입니다.</div>

      <input 
        type="password" 
        placeholder="비밀번호 (5글자 이상)" 
        class="input-field" 
        v-model="password" 
      />
      <div v-show="!isPasswordValid" class="error-message">비밀번호는 5글자 이상이어야 합니다.</div>
      
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
      :disabled="!canSubmit" 
      @click="register"
    >
      회원가입
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/axios/apiClient.js';

const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const usernameExists = ref(false);
const isPasswordMatch = ref(true);
const isUsernameValid = ref(true);
const isPasswordValid = ref(true);

const canSubmit = computed(() => 
  isUsernameValid.value && 
  isPasswordValid.value && 
  isPasswordMatch.value &&
  !usernameExists.value
);

// 유효성 검사
watch(username, (newUsername) => {
  isUsernameValid.value = newUsername.length >= 5;
  // 추가적으로 서버로 중복 확인 요청 가능
  // 예시:
  // apiClient.post('/users/check-username', { username: newUsername })
  //   .then(() => usernameExists.value = false)
  //   .catch(() => usernameExists.value = true);
});

watch(password, (newPassword) => {
  isPasswordValid.value = newPassword.length >= 5;
  checkPasswordMatch();
});

watch(passwordConfirm, () => {
  checkPasswordMatch();
});

function checkPasswordMatch() {
  isPasswordMatch.value = password.value === passwordConfirm.value;
}

async function register() {
  if (canSubmit.value) {
    try {
      await apiClient.post('users/register', {
        ...route.query,
        loginId: username.value,
        password: password.value,
      });
      alert('회원가입 성공!');
      router.push({ name: 'Login' });
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  } else {
    alert('입력 정보를 확인해 주세요.');
  }
}
</script>

<style lang="scss">
@use "@/mixins/sharedStyles.scss";
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

.submit-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
