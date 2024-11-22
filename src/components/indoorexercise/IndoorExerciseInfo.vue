<template>
  <div class="indoor-exercise-info-container">
    <!-- 운동 탭 -->
    <div class="exercise-tabs">
      <button
        :class="{ active: selectedTab === '준비운동' }"
      >
        준비운동
      </button>
      <button
        :class="{ active: selectedTab === '본운동' }"
      >
        본운동
      </button>
      <button
        :class="{ active: selectedTab === '마무리운동' }"
      >
        마무리운동
      </button>
    </div>

    <!-- 타임라인 -->
    <Timeline :value="exerciseTypes" layout="horizontal" align="bottom" class="custom-timeline">
      <template #marker="slotProps">
        <span
          class="timeline-marker"
          :style="{
            borderColor: slotProps.item === selectedTab ? '#4caf50' : '#ccc',
          }"
        ></span>
      </template>
    </Timeline>

    <div class="content-container">
      <div class="video-container"></div>
      <div class="exercise-instruction-card">
        <h3 class="exercise-title">양팔 벌려 높이 뛰기</h3>
        <ul class="exercise-steps">
          <li>어깨너비로 다리를 벌리고 서세요.</li>
          <li>엉덩이를 뒤로 빼면서 천천히 앉습니다.</li>
          <li>허벅지가 바닥과 평행할 때까지 내려갑니다.</li>
          <li>다시 일어나면서 처음 자세로 돌아갑니다.</li>
        </ul>
     </div>
    </div>
  </div>


</template>

<script setup>
import { useRoute } from "vue-router";
import Timeline from 'primevue/timeline';
import { ref, onMounted } from 'vue';
import appClient from '@/axios/apiClient.js';
import axios from 'axios';


const route = useRoute();
// console.log(route.query);
const selectedTab = ref(route.query.exerciseType);
const exerciseTypes = ref(['준비운동', '본운동', '마무리운동']);
const apiKey = 'AIzaSyCaQJaPVv80FcQmKfgqeM3b7malJQ8sZgE'; // 발급받은 API 키

onMounted(async () => {
  await fetchRecommendedTraining();
  await loadYoutube();
});

async function fetchRecommendedTraining() {
  try {
    const response = await appClient.get(`home-training`);
    console.log(response.data); // 데이터를 필요에 따라 추가적으로 처리
  } catch (error) {
    console.error('추천 가정운동 요청 중 오류 발생:', error);
  }
}

console.log(route.query.exerciseName);

async function loadYoutube() {
  const query = route.query.exerciseName; // 검색할 키워드
  console.log("왜 안댕");
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent("국민체력100"+query)}&type=video&maxResults=1&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        const videoContainer = document.querySelector('.video-container'); // 단일 요소 선택
        videoContainer.innerHTML = `
        <iframe
          width="80%"
          height="170"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `;
      console.log("유튜브")
      } else {
        alert('검색 결과가 없습니다.');
      }
    })
    .catch(error => {
      console.error('YouTube API 요청 중 오류 발생:', error);
    });
}
</script>

<style scoped>
::v-deep(.p-timeline-event-content) {
  padding: 0 !important;
  margin: 0 !important;
}

::deep(.p-timeline-event-opposite){
  padding: 0 !important;
  margin: 0 !important;
}

h3{
  margin: 10px;
}

.indoor-exercise-info-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.exercise-tabs {
  display: flex;
  justify-content: space-around;
  margin: 20px 0 0 0;
}

.exercise-tabs button {
  flex: 1;
  border: none;
  background-color: #f5f5f5;
  font-size: 16px;
  cursor: pointer;
  color: #333;
}

.exercise-tabs .active {
  color: #4caf50;
}

.custom-timeline {
  width: 70%;
  margin: auto;
}

.timeline-marker {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 4px solid;
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}

.content-container{
  display: flex; /* Flexbox로 컨테이너 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-direction: column; /* 내부 요소를 세로로 배치 */
  margin: 20px 0 70px 0; /* 컨테이너 상단 여백 */
  width: 100%; /* 컨테이너 너비를 부모에 맞춤 */
  /* min-height: 300px; 컨테이너 최소 높이 설정 (필요에 따라 조정) */
  box-sizing: border-box; /* 테두리 및 패딩 포함 */
  gap: 20PX;
}
.video-container {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column;
  width: 100%;
  /* min-height: 300px;  */
  box-sizing: border-box; 
  /* gap: 40PX; */
}

.video-container iframe {
  border: none; /* 불필요한 테두리 제거 */
  border-radius: 8px; /* 선택적으로 둥근 테두리 */
}

.exercise-instruction-card {
  background-color: #ffffff; /* 카드 배경 */
  border: 1px solid #e0e0e0; /* 외곽선 */
  border-radius: 4px; /* 둥근 모서리 */
  padding: 12px; /* 내부 여백 */
  width: 80%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  font-family: Arial, sans-serif; /* 기본 글꼴 */
}

.exercise-title {
  font-size: 18px; /* 제목 크기 */
  font-weight: bold; /* 제목 굵게 */
  color: #333; /* 제목 색상 */
  margin-bottom: 12px; /* 제목과 리스트 간격 */
}

.exercise-steps {
  list-style: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 리스트 패딩 제거 */
  margin: 0; /* 리스트 마진 제거 */
}

.exercise-steps li {
  display: flex; /* 아이콘과 텍스트를 수평으로 배치 */
  align-items: flex-start; /* 아이콘과 텍스트 위쪽 정렬 */
  margin-bottom: 8px; /* 리스트 간격 */
  font-size: 14px; /* 텍스트 크기 */
  color: #666; /* 텍스트 색상 */
}

.exercise-steps li::before {
  content: "●"; /* 아이콘으로 동그라미 사용 */
  color: #4caf50; /* 동그라미 색상 */
  font-size: 12px; /* 동그라미 크기 */
  margin-right: 8px; /* 동그라미와 텍스트 간격 */
  line-height: 1; /* 동그라미 위치 조정 */
}
</style>
