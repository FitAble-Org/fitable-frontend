<template>
  <div class="club-container">
    <!-- 필터 -->
    <div class="filter-container">
      <div class="input-group">
        <label for="region" class="label">지역</label>
        <select id="region" v-model="filters.region" class="search-input">
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>
      <div class="input-group short-input">
        <label for="category" class="label">장애분류</label>
        <select id="category" v-model="filters.category" class="search-input">
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <button class="search-button" @click="fetchClubs">검색</button>
    </div>

    <!-- 클럽 리스트 -->
    <div v-if="clubs.length > 0" class="club-items">
      <div
        v-for="club in clubs"
        :key="club.clubId"
        class="club-item"
        @click="navigateToClubInfo(club.clubId)"
      >
        <h3 class="club-title">{{ club.clubNm }}</h3>
        <p class="club-subtitle">
          {{ `${club.disabilityType}, ${club.operTimeCn}` }}
        </p>
      </div>
    </div>
    <!-- 검색 결과가 없을 때 -->
    <div v-else class="no-results">검색 결과가 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

// 라우터
const router = useRouter();

// 필터 상태 초기화 (기본값 설정)
const filters = ref({
  region: "서울", // 기본 지역
  category: "발달(지적/자폐)장애", // 기본 장애분류
});

// 지역 및 장애분류 목록
const regions = [
  "서울",
  "인천",
  "대전",
  "경기",
  "경남",
  "전북",
  "충남",
  "제주",
  "부산",
  "광주",
  "대구",
  "강원",
  "충북",
  "전남",
  "울산",
  "경북",
  "세종",
];
const categories = [
  "발달(지적/자폐)장애",
  "지체(척수 및 절단 및 기타)장애",
  "청각장애",
  "기타장애",
  "시각장애",
  "비장애인",
  "뇌병변장애",
];

// 클럽 데이터
const clubs = ref([]);

// 클럽 데이터 가져오기
const fetchClubs = async () => {
  try {
    const response = await apiClient.get("/clubs/search", {
      params: {
        ctprvnNm: filters.value.region,
        troblTyNm: filters.value.category,
      },
    });
    clubs.value = response.data; // API로부터 받은 데이터
  } catch (error) {
    console.error("Error fetching clubs:", error);
    alert("클럽 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// 초기 데이터 로드
onMounted(() => {
  fetchClubs(); // 기본값으로 필터링된 데이터를 로드
});

// 상세 페이지 이동
const navigateToClubInfo = (clubId) => {
  if (!clubId) {
    alert("클럽 ID가 유효하지 않습니다.");
    return;
  }
  router.push({ name: "ClubInfo", params: { id: clubId } }); // 클럽 ID를 라우터로 전달
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.club-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.filter-container {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.short-input {
  flex: none;
  width: 200px;
}

.search-input {
  font-size: 16px;
  padding: 7px;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 40px;
}

.search-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-bottom: 11px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 16px;
}

.club-items {
  padding-bottom: 50px;
}
.club-item {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.club-title {
  font-size: 18px;
  margin: 5px;
  font-weight: 100;
}

.club-subtitle {
  font-size: 13px;
  color: #808080;
  margin: 15px 5px 5px 5px;
}

.label {
  font-size: 13px;
  color: #808080;
  margin-bottom: 3px;
}

/* 검색 결과 없음 스타일 */
.no-results {
  text-align: center;
  font-size: 16px;
  color: #999; /* 회색 글씨 */
  margin-top: 30px;
}
</style>
