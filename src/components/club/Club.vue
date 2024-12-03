<template>
  <div class="club-container">
    <div class="filter-container">
      <div class="input-group">
        <label for="region">지역</label>
        <input
          id="region"
          v-model="filters.region"
          class="search-input"
          placeholder="지역을 입력하세요."
        />
      </div>
      <div class="input-group">
        <label for="category">종목</label>
        <input
          id="category"
          v-model="filters.category"
          class="search-input"
          placeholder="종목을 입력하세요."
        />
      </div>
      <button class="search-button" @click="filterPosts">검색</button>
    </div>
    <div class="selected-filters">
      <span v-if="filters.region">지역: {{ filters.region }}</span>
      <span v-if="filters.category">종목: {{ filters.category }}</span>
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
    category: "축구",
  },
  {
    id: 2,
    title: "조기축구",
    content: "서울 강남구 ○○운동장에서 일요일 오전 7시...",
    region: "서울",
    category: "축구",
  },
  {
    id: 3,
    title: "배드민턴 모임",
    content: "경기도 성남시 ○○체육관에서 토요일 오전 9시...",
    region: "경기",
    category: "배드민턴",
  },
  {
    id: 4,
    title: "등산 클럽",
    content: "서울 강북구 ○○산에서 매주 토요일 오전 6시...",
    region: "서울",
    category: "등산",
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
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.search-input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

.selected-filters {
  display: flex;
  gap: 10px;
  font-size: 14px;
  margin: 10px 0;
  color: #333;
}
</style>
