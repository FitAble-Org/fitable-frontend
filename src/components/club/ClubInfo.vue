<template>
  <div class="club-info-container">
    <!-- 클럽 상세 정보 -->
    <div v-if="club" class="info-card">
      <h1 class="club-title">{{ club.clubNm }}</h1>
      <p class="club-location">{{ club.ctprvnNm }} {{ club.signguNm }}</p>
      <div class="divider"></div>

      <section class="info-section">
        <h2 class="section-title">운영 정보</h2>
        <ul class="info-list">
          <li>
            <strong>운영 시간:</strong> {{ club.operTimeCn || "정보 없음" }}
          </li>
          <li>
            <strong>장애 분류:</strong> {{ club.troblTyNm || "정보 없음" }}
          </li>
        </ul>
      </section>

      <section class="info-section">
        <h2 class="section-title">소개</h2>
        <p class="info-description">
          {{ club.clubIntrcnCn || "소개 정보가 없습니다." }}
        </p>
      </section>

      <section class="info-section">
        <h2 class="section-title">카테고리</h2>
        <p class="info-category">{{ club.itemNm }} - {{ club.subitemNm }}</p>
      </section>
    </div>

    <!-- 로딩 상태 -->
    <div v-else class="loading-container">
      <p>클럽 정보를 불러오는 중...</p>
    </div>

    <!-- 뒤로가기 버튼 -->
    <button class="back-button" @click="goBack">이전으로</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

// 라우터
const route = useRoute();
const router = useRouter();

// 클럽 데이터 상태
const club = ref(null);

// 클럽 데이터 요청
onMounted(async () => {
  const { id } = route.params;
  try {
    const response = await apiClient.get(`/clubs/${id}`);
    club.value = response.data;
  } catch (error) {
    console.error("클럽 정보를 가져오는 데 실패했습니다:", error);
    alert("클럽 정보를 가져오는 중 오류가 발생했습니다.");
  }
});

// 뒤로가기 함수
const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* 컨테이너 */
.club-info-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

/* 정보 카드 */
.info-card {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 제목 */
.club-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.club-location {
  font-size: 16px;
  color: #777;
  text-align: center;
}

/* 구분선 */
.divider {
  margin: 20px 0;
  height: 1px;
  background-color: #ddd;
}

/* 섹션 스타일 */
.info-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  color: #4caf50;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

/* 정보 리스트 */
.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
}

.info-list strong {
  color: #333;
}

/* 설명 스타일 */
.info-description {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
}

/* 카테고리 스타일 */
.info-category {
  font-size: 16px;
  color: #444;
}

/* 로딩 컨테이너 */
.loading-container {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 20px;
}

/* 뒤로가기 버튼 */
.back-button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 17px;
  color: #ffffff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #388e3c;
}
</style>
