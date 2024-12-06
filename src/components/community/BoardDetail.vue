<template>
  <div class="board-detail-container">
    <h1 class="board-title">{{ board.title }}</h1>
    <p class="board-content">{{ board.content }}</p>
    <div class="board-meta">
      <span class="board-author">작성자: {{ board.author }}</span>
      <span class="board-date">{{ formatDate(board.createdAt) }}</span>
    </div>
    <button class="back-button" @click="goBack">뒤로가기</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

const route = useRoute();
const router = useRouter();
const board = ref(null);

// 게시글 데이터 가져오기
const fetchBoard = async () => {
  try {
    const response = await apiClient.get(`/boards/${route.params.boardId}`);
    board.value = response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
    alert("게시글 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// 날짜 포맷 함수
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 뒤로가기
const goBack = () => {
  router.back();
};

// 컴포넌트가 마운트될 때 게시글 데이터 가져오기
onMounted(fetchBoard);
</script>

<style scoped>
.board-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4caf50;
  text-align: center;
}

.board-content {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.board-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #888;
  margin-bottom: 20px;
}

.back-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
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
