<template>
  <div class="community-container">
    <div class="filter-container">
      <select v-model="selectedFilter" class="filter-dropdown">
        <option value="title">제목</option>
        <option value="author">작성자</option>
        <option value="location">위치</option>
      </select>
      <input
        v-model="searchKeyword"
        class="search-input"
        placeholder="검색어를 입력하세요."
      />
      <button class="sort-button" @click="toggleSortOrder">조회순</button>
    </div>
    <PostList :posts="filteredPosts" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PostList from "@/components/community/PostList.vue";

// 게시글 데이터 (임의 생성)
const posts = ref([
  {
    id: 1,
    title: "골 때리는 사람들",
    content: "서울 서초구 ○○운동장에서 일요일 오전 7시...",
    views: 105,
  },
  {
    id: 2,
    title: "조기축구",
    content: "서울 강남구 ○○운동장에서 일요일 오전 7시...",
    views: 75,
  },
  {
    id: 3,
    title: "조기축구",
    content: "서울 강남구 ○○운동장에서 일요일 오전 7시...",
    views: 50,
  },
  {
    id: 4,
    title: "조기축구",
    content: "서울 강남구 ○○운동장에서 일요일 오전 7시...",
    views: 35,
  },
  {
    id: 5,
    title: "조기축구",
    content: "서울 강남구 ○○운동장에서 일요일 오전 7시...",
    views: 20,
  },
]);

// 상태 관리
const selectedFilter = ref("title");
const searchKeyword = ref("");
const sortOrder = ref("desc");

// 필터링 및 정렬된 게시글
const filteredPosts = computed(() => {
  let filtered = posts.value;

  // 검색어 필터링
  if (searchKeyword.value) {
    filtered = filtered.filter((post) =>
      post[selectedFilter.value]
        .toString()
        .toLowerCase()
        .includes(searchKeyword.value.toLowerCase())
    );
  }

  // 조회순 정렬
  return filtered.sort((a, b) =>
    sortOrder.value === "desc" ? b.views - a.views : a.views - b.views
  );
});

// 정렬 토글 함수
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
};
</script>

<style scoped>
.community-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-dropdown {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.sort-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}
</style>
