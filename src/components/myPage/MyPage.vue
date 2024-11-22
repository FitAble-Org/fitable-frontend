<template>
  <div class="my-page">
    <!-- 사용자 정보 표시 -->
    <div class="content-container">
      <div class="user-info">
        <h2>내 정보</h2>
        <p class="username">{{ user.username }} 님</p>
      </div>
      <div class="user-tags">
        <span v-for="(tag, index) in user.tags" :key="index" class="user-tag">{{
          tag
        }}</span>
      </div>
    </div>

    <!-- 회색 직사각형 구역 (화면 분할) -->
    <div class="section-divider"></div>

    <!-- 메뉴 항목 -->
    <div class="menu-container">
      <div class="menu-item" @click="goToProfileSettings">프로필 재설정</div>
      <div class="menu-item logout" @click="logout">로그아웃</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/axios/apiClient";
import { useRouter } from "vue-router";

const user = ref({
  username: "",
  tags: null,
});

const router = useRouter();

// 사용자 정보 가져오기
const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get("users/profile");
    const { loginId, ...tag } = response.data;
    user.value.username = loginId;
    user.value.tags = tag;
    user.value.tags.gender = user.value.tags.gender === "F" ? "여성" : "남성";
    user.value.tags.ageGroup = user.value.tags.ageGroup.replace(" ", "~");
    console.log(user.value.tags.ageGroup);
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

// 프로필 재설정 페이지로 이동
const goToProfileSettings = () => {
  router.push({ name: "ProfileAgeSelection" }); // 변경된 라우트 이름으로 수정
};

// 로그아웃 처리
const logout = () => {
  localStorage.removeItem("accessToken");
  apiClient.defaults.headers.common["Authorization"] = null;
  router.push("/");
};

// 페이지 마운트 시 사용자 정보 가져오기
onMounted(fetchUserInfo);
</script>

<style scoped>
.my-page {
  width: 100%;
  height: 100vh; /* 전체 화면 높이 사용 */
  background-color: #fff;
  overflow: hidden;
}

.content-container {
  padding: 40px 20px 30px 20px;
  /* height: 30%; */
  /* 사용자 정보 영역 고정 높이 */
  box-sizing: border-box;
}

.user-info {
  padding-left: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
}

.username {
  font-size: 17px;
  color: #222222;
  margin-bottom: 18px;
}

.user-tags {
  display: flex;
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.user-tag {
  background-color: #e6f4ea;
  color: #4caf50;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 15px;
}

/* 회색 직사각형 */
.section-divider {
  background-color: #f0f0f0;
  height: 10px; /* 고정된 높이 */
  width: 100%;
  margin: 0;
}

/* 메뉴 항목 */
.menu-container {
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}

.menu-item {
  font-size: 17px;
  width: 90%;
  color: #333;
  padding: 15px 0;
  margin: auto;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
}

.logout {
  color: #f44336;
}
</style>
