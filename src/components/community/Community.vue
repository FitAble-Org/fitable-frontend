<template>
  <div class="community-container">
    <!-- 게시글 리스트 -->
    <div v-if="boards.length > 0">
      <div
        v-for="board in boards"
        :key="board.boardId"
        class="board-item"
        @click="navigateToBoardDetail(board.boardId)"
      >
        <p class="board-title">{{ board.title }}</p>
        <p class="board-content">{{ board.content }}</p>
        <div class="board-meta">
          <div class="board-comments">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="icon"
            >
              <path
                d="M12 3C6.48 3 2 6.92 2 12c0 3.19 1.94 6.13 5.03 7.61-.09.69-.22 1.62-.47 2.51-.06.21-.01.43.14.59.15.16.37.2.57.12.95-.38 2.19-.99 3.2-1.76.86.17 1.75.27 2.66.27 5.52 0 10-3.92 10-9s-4.48-9-10-9z"
              />
            </svg>
            {{ board.commentCount }}
          </div>
          <div class="board-info">
            <span class="board-time">{{ formatTime(board.createdAt) }}</span>
            <span class="board-author">{{ board.loginId || "익명" }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 없음 -->
    <div v-else class="no-results">게시글이 없습니다.</div>

    <!-- 글쓰기 버튼 -->
    <div class="floating-button" @click="navigateToWrite">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16.862 3.487a2.375 2.375 0 013.351 3.352L7.208 19.843a4.5 4.5 0 01-1.878 1.126l-3.682 1.104 1.104-3.682a4.5 4.5 0 011.126-1.878L16.862 3.487z"
        />
      </svg>
      <span>글쓰기</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

const boards = ref([]);
const router = useRouter();

// 게시글 데이터 가져오기
const fetchBoards = async () => {
  try {
    const response = await apiClient.get("/boards");
    // 시간순으로 정렬 (최신 게시글이 위로)
    boards.value = response.data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((board) => ({
        ...board,
      }));
  } catch (error) {
    console.error("Error fetching boards:", error);
    alert("게시글 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// 상세 페이지로 이동
const navigateToBoardDetail = (boardId) => {
  router.push({ name: "BoardDetail", params: { boardId } });
};

// 글쓰기 페이지로 이동
const navigateToWrite = () => {
  router.push({ name: "BoardWrite" });
};

// 시간 포맷팅 함수
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
};

// 초기 데이터 로드
onMounted(fetchBoards);
</script>

<style scoped>
.community-container {
  max-width: 600px;
  margin: 7px auto; /* 위 여백 줄임 */
  font-family: "Arial", sans-serif;
  background-color: white;
}

/* 게시글 아이템 */
.board-item {
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.board-item:hover {
  background-color: #f9f9f9;
}

/* 제목 */
.board-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px; /* 제목과 내용 사이 여백 */
  color: #333;
}

/* 내용 */
.board-content {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 메타 정보 */
.board-meta {
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.board-comments {
  display: flex;
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

/* 작성 시간과 작성자 정렬 */
.board-info {
  display: flex;
  gap: 8px;
}

.board-time,
.board-author {
  font-size: 12px;
  color: #888;
}

/* 게시글 없음 */
.no-results {
  text-align: center;
  font-size: 16px;
  color: #aaa;
  margin-top: 20px;
}

/* 글쓰기 버튼 */
.floating-button {
  position: fixed;
  bottom: 70px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 100;
}

.floating-button:hover {
  background-color: #388e3c;
}
</style>
