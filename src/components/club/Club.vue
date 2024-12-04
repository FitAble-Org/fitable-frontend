<template>
  <div class="club-container">
    <div class="filter-container">
      <!-- 지역 필터 -->
      <div class="input-group">
        <label for="region" class="label">지역</label>
        <select id="region" v-model="filters.region" class="search-input">
          <option value="">전체</option>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>
      <!-- 장애분류 필터 -->
      <div class="input-group short-input">
        <label for="category" class="label">장애분류</label>
        <select id="category" v-model="filters.category" class="search-input">
          <option value="">전체</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <!-- 검색 버튼 -->
      <button class="search-button" @click="filterPosts">검색</button>
    </div>
    <div class="selected-filters">
      <span v-if="filters.region">지역: {{ filters.region }}</span>
      <span v-if="filters.category">장애분류: {{ filters.category }}</span>
    </div>
    <PostList :posts="displayedPosts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PostList from "@/components/community/PostList.vue"; // 경로 변경

// 필터 상태
const filters = ref({
  region: "",
  category: "",
});

// 지역 및 장애분류 목록
const regions = [
  "인천",
  "대전",
  "경기",
  "경남",
  "전북",
  "충남",
  "제주",
  "서울",
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

// 게시글 데이터
const posts = ref([]); // 전체 데이터
const displayedPosts = ref([]); // 화면에 표시할 데이터

// 임시 데이터
const mockData = [
  {
    id: 1,
    title: "골 때리는 사람들",
    content: "서울 서초구 ○○운동장에서 일요일 오전 7시...",
    region: "서울",
    category: "비장애인",
  },
  {
    id: 2,
    title: "조기축구",
    content: "서울 강남구 ○○운동장에서 일요일 오전 7시...",
    region: "서울",
    category: "발달(지적/자폐)장애",
  },
  {
    id: 3,
    title: "배드민턴 모임",
    content: "경기도 성남시 ○○체육관에서 토요일 오전 9시...",
    region: "경기",
    category: "지체(척수 및 절단 및 기타)장애",
  },
  {
    id: 4,
    title: "등산 클럽",
    content: "서울 강북구 ○○산에서 매주 토요일 오전 6시...",
    region: "서울",
    category: "시각장애",
  },
];

// 초기 데이터 로드
onMounted(() => {
  posts.value = mockData; // 전체 데이터를 posts에 로드
  displayedPosts.value = [...posts.value]; // 처음엔 전체 데이터를 표시
});

// 게시글 필터링 함수
const filterPosts = () => {
  displayedPosts.value = posts.value.filter((post) => {
    const matchesRegion =
      !filters.value.region || post.region.includes(filters.value.region);
    const matchesCategory =
      !filters.value.category || post.category.includes(filters.value.category);
    return matchesRegion && matchesCategory;
  });
};
</script>

<style scoped>
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
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.short-input {
  flex: none; /* 부모 컨테이너의 flex 속성 영향을 받지 않음 */
  width: 200px; /* 원하는 고정 너비 설정 */
}

/* 셀렉트박스 */
.search-input {
  font-size: 16px;
  padding: 7px; /* 상하좌우 패딩 */
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 40px;
}

/*검색 버튼 */
.search-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 16px; /* 버튼 글자 크기 */
}

.selected-filters {
  display: flex;
  gap: 10px;
  font-size: 14px;
  margin: 10px 0;
  color: #333;
}

.label {
  font-size: 13px; /* 레이블 글자 크기 */
  color: #808080; /* 레이블 글자 색상 */
  margin-bottom: 3px; /* 아래 패딩 효과 */
}
</style>
