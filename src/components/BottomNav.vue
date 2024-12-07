<template>
  <div class="bottom-nav">
    <button @click="navigate('home')">
      <i class="far fa-calendar"></i>

      <span>홈</span>
    </button>
    <button @click="navigate('club')">
      <i class="far fa-heart"></i>

      <span>동호회</span>
    </button>
    <button @click="navigate('community')">
      <i class="far fa-comments"></i>



      <span>게시판</span>
    </button>
    <button @click="navigate('my-page')">
      <i class="far fa-user"></i>
      <span>내 정보</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigate = (page) => {
  if (page === "home") {
    router.push({ name: "Home" });
  } else if (page === "club") {
    router.push({ name: "Club" });
  } else if (page === "community") {
    router.push({ name: "Community" });
  } else if (page === "my-page") {
    router.push({ name: "MyPage" });
  }
};
</script>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 11px;
  background-color: #ffffff;
  border-top: 1px solid #ececec;

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
  margin-bottom: 6px;
}
</style>
