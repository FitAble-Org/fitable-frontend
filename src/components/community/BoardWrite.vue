<template>
  <div class="write-container">
    <!-- 헤더 -->
    <div class="header">
      <!-- 닫기 버튼 -->
      <button class="close-button" @click="goBack">✕</button>
      <!-- 글쓰기 텍스트 -->
      <span class="header-title">글 쓰기</span>
      <!-- 완료 버튼 -->
      <button class="complete-button" @click="submitBoard">완료</button>
    </div>

    <!-- 제목 입력 -->
    <div class="title-container">
      <input
        v-model="board.title"
        class="title-input"
        type="text"
        placeholder="제목"
      />
    </div>

    <!-- 내용 입력 -->
    <textarea
      v-model="board.content"
      class="content-input"
      placeholder="내용을 입력하세요"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

// 라우터 객체
const router = useRouter();

// 게시글 데이터
const board = ref({
  title: "",
  content: "",
});

// 게시글 등록 함수
const submitBoard = async () => {
  if (!board.value.title.trim() || !board.value.content.trim()) {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

  try {
    await apiClient.post("/boards", board.value);
    alert("게시글이 등록되었습니다.");
    router.push({ name: "Community" });
  } catch (error) {
    console.error("Error submitting board:", error);
    alert("게시글 등록 중 오류가 발생했습니다.");
  }
};

// 뒤로가기
const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* 전체 컨테이너 */
.write-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Arial", sans-serif;
  background-color: #ffffff;
}

/* 헤더 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌측 닫기, 중앙 제목, 우측 완료 정렬 */
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.complete-button {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #4caf50;
  cursor: pointer;
}

/* 제목 입력 */
.title-container {
  padding-left: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.title-input {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border: none;
  outline: none;
}

/* 내용 입력 */
.content-input {
  flex: 1;
  padding: 16px;
  padding-top: 20px;
  font-size: 16px;
  color: #333;
  border: none;
  outline: none;
  resize: none;
}
</style>
