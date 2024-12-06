<template>
  <div class="board-detail-container">
    <!-- 상단 네비게이션 -->
    <div class="navbar">
      <button class="back-button" @click="goBack">←</button>
      <h1 class="navbar-title">게시글</h1>
    </div>

    <!-- 게시글 상세 -->
    <div class="post-container">
      <div class="post-header">
        <div class="post-avatar"></div>
        <div class="post-meta">
          <p class="post-author">{{ board.loginId }}</p>
          <p class="post-date">{{ formatDate(board.createdAt) }}</p>
        </div>
      </div>
      <button
        v-if="board.loginId === userId"
        class="delete-board-text"
        @click="deleteBoard"
      >
        삭제
      </button>
      <h2 class="post-title">{{ board.title }}</h2>
      <p class="post-content">{{ board.content }}</p>
    </div>

    <!-- 댓글 섹션 -->
    <div class="comments-section">
      <ul v-if="comments.length > 0" class="comments-list">
        <li v-for="comment in comments" :key="comment.commentId" class="comment-item">
          <div class="comment-header">
            <div class="comment-avatar"></div>
            <div class="comment-meta">
              <p class="comment-author">{{ comment.loginId }}</p>
              <p class="comment-date">{{ formatDate(comment.createdAt) }}</p>
            </div>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
          <button
            v-if="comment.loginId === userId"
            class="delete-button"
            @click="deleteComment(comment.commentId)"
          >
            삭제
          </button>
        </li>
      </ul>
      <p v-else class="no-comments">댓글이 없습니다. 첫 댓글을 작성해 보세요!</p>
    </div>

    <!-- 댓글 작성 -->
    <div class="comment-form">
      <textarea
        v-model="newComment"
        class="comment-textarea"
        placeholder="댓글을 입력하세요..."
      ></textarea>
      <button class="submit-comment-button" @click="submitComment">
        작성
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import apiClient from "@/axios/apiClient.js";

const router = useRouter();
const route = useRoute();
const board = ref({});
const comments = ref([]);
const newComment = ref("");
const userId = ref("");

// 게시글 가져오기
const fetchBoard = async () => {
  try {
    const response = await apiClient.get(`/boards/${route.params.boardId}`);
    board.value = response.data;
  } catch (error) {
    console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
  }
};

// 게시글 삭제
const deleteBoard = async () => {
  if (!confirm("게시글을 삭제하시겠습니까?")) return;
  try {
    await apiClient.delete(`/boards/${route.params.boardId}`);
    alert("게시글이 삭제되었습니다.");
    router.push("/boards"); // 게시판 목록 페이지로 이동
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
    alert("게시글 삭제에 실패했습니다.");
  }
};

// 댓글 가져오기
const fetchComments = async () => {
  try {
    const response = await apiClient.get(
      `/boards/${route.params.boardId}/comments`
    );
    comments.value = response.data;
  } catch (error) {
    console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
  }
};

// 댓글 작성
const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }
  try {
    await apiClient.post(`/boards/${route.params.boardId}/comments`, {
      content: newComment.value,
    });
    newComment.value = ""; // 입력창 초기화
    fetchComments(); // 댓글 목록 새로고침
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
  }
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  if (!confirm("댓글을 삭제하시겠습니까?")) return;
  try {
    await apiClient.delete(`/boards/${route.params.boardId}/comments/${commentId}`);
    fetchComments(); // 댓글 목록 새로고침
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
  }
};

// 날짜 포맷 함수
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 뒤로가기
const goBack = () => {
  router.back();
};

// 로그인 사용자 ID 가져오기
const fetchUserId = async () => {
  try {
    const response = await apiClient.get("/users/id");
    userId.value = response.data || "";
  } catch (error) {
    console.error("로그인 사용자 ID를 가져오는 중 오류 발생:", error);
  }
};

// 컴포넌트가 마운트될 때 게시글, 댓글, 로그인 ID 데이터를 가져옴
onMounted(() => {
  fetchUserId();
  fetchBoard();
  fetchComments();
});
</script>

<style scoped>
/* 게시글 삭제 버튼 */
.delete-board-text {
  position: absolute;
  top: 20px;
  right: 10px;
  background: none;
  border: none;
  color: #888; /* 회색 글자 */
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
}

.delete-board-text:hover {
  color: #555; /* 더 짙은 회색 */
}

/* 게시글 상단 설정 */
.post-container {
  position: relative; /* 삭제 버튼 위치 조정 */
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

/* 전체 컨테이너 */
.board-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 16px 80px; /* 하단 네비게이션 바를 고려한 여백 */
  font-family: Arial, sans-serif;
  background-color: #ffffff;
}

/* 상단 네비게이션 */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.navbar-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

/* 게시글 */
.post-container {
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 10px;
}

.post-meta {
  font-size: 14px;
  color: #888;
}

.post-author {
  font-weight: bold;
  margin: 0;
}

.post-date {
  margin: 4px 0 0;
  font-size: 12px;
}

.post-title {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.post-content {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

/* 댓글 섹션 */
.comments-section {
  padding: 20px 10px;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 10px;
}

.comment-meta {
  font-size: 13px;
  color: #888;
}

.comment-author {
  font-weight: bold;
  margin: 0;
}

.comment-date {
  margin: 4px 0 0;
  font-size: 12px;
}

.comment-content {
  font-size: 14px;
  color: #333;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #c7c7c7;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d32f2f;
}

/* 댓글 작성 */
.comment-form {
  position: fixed;
  bottom: 60px; /* 하단 네비게이션 바 높이 고려 */
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  padding: 10px 16px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.comment-textarea {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  margin-right: 10px;
  resize: none;
}

.submit-comment-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.submit-comment-button:hover {
  background-color: #388e3c;
}

/* 댓글 없을 때 */
.no-comments {
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-top: 20px;
}
</style>
