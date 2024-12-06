<template>
  <div class="board-detail-container" v-if="board">
    <BackArrow routeName="Community" />
    <h1 class="board-title">{{ board.title }}</h1>
    <p class="board-content">{{ board.content }}</p>
    <div class="board-meta">
      <span class="board-author">작성자: {{ board.author }}</span>
      <span class="board-date">{{ formatDate(board.createdAt) }}</span>
    </div>
    <button class="back-button" @click="goBack">뒤로가기</button>
  </div>

  <!-- 댓글 섹션 -->
  <div class="comments-section">
    <h2>댓글</h2>
    <ul v-if="comments.length > 0" class="comments-list">
      <li
        v-for="comment in comments"
        :key="comment.commentId"
        class="comment-item"
      >
        <p class="comment-content">{{ comment.content }}</p>
        <div class="comment-meta">
          <span class="comment-author">{{ comment.loginId }}</span>
          <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
        </div>
      </li>
    </ul>
    <p v-else class="no-comments">댓글이 없습니다. 첫 댓글을 작성해 보세요!</p>

    <!-- 댓글 작성 -->
    <div class="comment-form">
      <textarea
        v-model="newComment"
        placeholder="댓글을 입력하세요..."
        rows="3"
        class="comment-textarea"
      ></textarea>
      <button class="submit-comment-button" @click="submitComment">
        댓글 작성
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackArrow from "../common/BackArrow.vue";
import apiClient from "@/axios/apiClient.js";

const route = useRoute();
const router = useRouter();
const board = ref(null);
const comments = ref([]);
const newComment = ref("");

// 게시글 데이터 가져오기
const fetchBoard = async () => {
  try {
    const response = await apiClient.get(`/boards/${route.params.boardId}`);
    board.value = response.data;

    // const dummyData = {
    //   id: 1,
    //   title: "Vue.js 게시글 테스트",
    //   content:
    //     "이 게시글은 Vue.js 테스트를 위해 작성된 더미 데이터입니다. 게시글 내용을 여기에 작성합니다.",
    //   author: "홍길동",
    //   createdAt: "2024-12-01T12:30:00Z",
    // };
    // alert(dummyData);

    // board.value = dummyData;
  } catch (error) {
    console.error("Error fetching board:", error);
    alert("게시글 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

const fetchComments = async () => {
  try {
    // const dummyComments = [
    //   {
    //     commentId: 1,
    //     content: "정말 좋은 게시글입니다!",
    //     loginId: "user123",
    //     createdAt: "2024-12-02T10:00:00Z",
    //     updatedAt: "2024-12-02T10:00:00Z",
    //   },
    //   {
    //     commentId: 2,
    //     content: "감사합니다. 많은 도움이 되었습니다.",
    //     loginId: "user456",
    //     createdAt: "2024-12-02T12:30:00Z",
    //     updatedAt: "2024-12-02T12:30:00Z",
    //   },
    // ];
    // comments.value = dummyComments;

    const response = await apiClient.get(
      `/boards/${route.params.boardId}/comments`
    );
    comments.value = response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    alert("댓글 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// 댓글 작성
const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert("댓글 내용을 입력하세요.");
    return;
  }

  try {
    const newCommentData = {
      content: newComment.value,
    };

    // 서버로 전송 (여기서는 더미 데이터에 바로 추가)
    // comments.value.push(newCommentData);
    await apiClient.post(
      `/boards/${route.params.boardId}/comments`,
      newCommentData
    );
    await fetchComments();
    newComment.value = ""; // 입력 창 초기화
  } catch (error) {
    console.error("Error submitting comment:", error);
    alert("댓글 작성 중 오류가 발생했습니다.");
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
onMounted(() => {
  fetchBoard();
  fetchComments();
});
</script>

<style scoped>
.board-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
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
  margin: auto;
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

.comments-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff; /* 배경색 변경 */
  border: 1px solid #ddd; /* 구분선 추가 */
  border-radius: 8px; /* 모서리 라운딩 */
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.comment-content {
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

.comment-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.no-comments {
  font-size: 14px;
  color: #888;
  text-align: center;
}

/* 댓글 작성 폼 스타일 */
.comment-form {
  margin-top: 20px;
}

.comment-textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  margin-bottom: 10px;
}

.submit-comment-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-comment-button:hover {
  background-color: #388e3c;
}
</style>
