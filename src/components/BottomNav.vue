<template>
  <div class="bottom-nav">
    <button @click="navigate('home')">
      <i class="fas fa-home"></i>
      <span>홈</span>
    </button>
    <button @click="navigate('indoor')">
      <i class="fas fa-dumbbell"></i>
      <span>추천운동</span>
    </button>
    <button @click="navigate('outdoor')">
      <i class="fas fa-tree"></i>
      <span>추천시설</span>
    </button>
    <button @click="navigate('my-page')">
      <i class="fas fa-user"></i>
      <span>내 정보</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (page) => {
  if (page === 'home') {
    router.push({ name: 'Home' });
  } else if (page === 'indoor') {
    router.push({ name: 'IndoorExercise' });
  } else if (page === 'outdoor') {
    router.push({ name: 'DistanceSelection' });
  } else if (page === 'my-page') {
    router.push({ name: 'MyPage' });
  }
};
</script>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
}

.bottom-nav button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: #999999;
  font-size: 12px;
}

.bottom-nav i {
  font-size: 18px;
  margin-bottom: 4px;
}
</style>
