<template>
  <div v-if="isReady" class="indoor-exercise-info-container">
    <!-- 운동 탭 -->
    <div class="exercise-tabs">
      <button :class="{ active: selectedTab === '준비운동' }">준비운동</button>
      <button :class="{ active: selectedTab === '본운동' }">본운동</button>
      <button :class="{ active: selectedTab === '마무리운동' }">마무리운동</button>
    </div>

    <!-- 타임라인 -->
    <Timeline :value="exerciseTypes" layout="horizontal" align="bottom" class="custom-timeline">
      <template #marker="slotProps">
        <span
          class="timeline-marker"
          :style="{ borderColor: slotProps.item === selectedTab ? '#4caf50' : '#ccc' }"
        ></span>
      </template>
    </Timeline>

    <div class="content-container">
      <div class="video-container"></div>
      <div class="exercise-instruction-card">
        <p class="exercise-title">{{ exerciseName }}</p>
        <ul class="exercise-steps">
          <li v-for="(step, index) in exerciseSteps" :key="index">
            <div class="exercise-item">
              <div class="circle"></div>
              <div class="text">{{ step }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="loading-container">로딩 중...</div>
</template>

<script setup>
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref, watch } from "vue";
import Timeline from 'primevue/timeline';
import appClient from '@/axios/apiClient.js';

const route = useRoute();

const isReady = ref(false); // 데이터 로드 여부
const selectedTab = ref(null);
const exerciseTypes = ref(['준비운동', '본운동', '마무리운동']);
const exerciseName = ref('');
const exerciseId = ref(null);
const exerciseSteps = ref([]);
const apiKey = 'AIzaSyD3HXT8PT2WmgLfPyyh1xdW-vwWOEu4xG4';

// 라우트 변화 시 데이터 로드
function loadRouteData() {
  selectedTab.value = route.query.exerciseType || null;
  exerciseName.value = route.query.exerciseName || '';
  exerciseId.value = route.query.exerciseId || null;

  if (exerciseId.value && exerciseName.value) {
    fetchExerciseInstructions();
    loadYoutube();
  } else {
    console.warn("운동 ID가 제공되지 않았습니다.");
  }
}

// Watch route query changes
watch(() => route.query, loadRouteData, { immediate: true });

async function fetchExerciseInstructions() {
  try {
    if (!exerciseId.value) return;

    const response = await appClient.get(`home-training/instruction`, {
      params: { exerciseId: exerciseId.value },
    });
    const instruction = response.data || '';
    exerciseSteps.value = instruction.split('/');
  } catch (error) {
    console.error("운동 방법 요청 중 오류 발생:", error);
  } finally {
    isReady.value = true; // 데이터 로드 완료
  }
}

async function loadYoutube() {
  const query = exerciseName.value;
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent("국민체력100" + query)}&type=video&maxResults=1&key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        const videoContainer = document.querySelector(".video-container");
        videoContainer.innerHTML = `
          <iframe
            width="80%"
            height="170"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen
          ></iframe>
        `;
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("YouTube API 요청 중 오류 발생:", error);
    });
}
</script>

<style scoped>
::v-deep(.p-timeline-event-content) {
  padding: 0 !important;
  margin: 0 !important;
}


.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #666;
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
  font-size: 13px;
  cursor: pointer;
  color: #a0a0a0;
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
  margin: 0 0 70px 0; /* 컨테이너 상단 여백 */
  width: 100%; /* 컨테이너 너비를 부모에 맞춤 */
  /* min-height: 300px; 컨테이너 최소 높이 설정 (필요에 따라 조정) */
  box-sizing: border-box; /* 테두리 및 패딩 포함 */
  gap: 40PX;
}
.video-container {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column;
  width: 100%;
  box-sizing: border-box; 
}

.video-container iframe {
  border: none; /* 불필요한 테두리 제거 */
  border-radius: 8px; /* 선택적으로 둥근 테두리 */
}

.exercise-instruction-card {
  background-color: #ffffff; /* 카드 배경 */
  /* border: 1px solid #e0e0e0;  */
  border-radius: 4px; /* 둥근 모서리 */
  padding: 12px; /* 내부 여백 */
  width: 80%;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.01); 
}

.exercise-title {
  font-size: 14px; /* 제목 크기 */
  margin: 0;
  /* font-weight: 600;  */
  color: #333; /* 제목 색상 */
  margin-bottom: 18px; 
}

.exercise-steps {
  list-style: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 리스트 패딩 제거 */
  margin: 0; /* 리스트 마진 제거 */
}

.exercise-steps li {
  display: flex; /* 아이콘과 텍스트를 수평으로 배치 */
  align-items: flex-start; /* 아이콘과 텍스트 위쪽 정렬 */
  margin-bottom: 18px; /* 리스트 간격 */
  font-size: 13px; /* 텍스트 크기 */
  color: #666; /* 텍스트 색상 */
}

.exercise-item {
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px; /* 동그라미와 텍스트 사이 간격 조절 */
}

.circle {
  width: 10px
  ; /* 동그라미 크기 */
  height: 10px; /* 동그라미 크기 */
  border-radius: 50%; /* 동그라미 모양 */
  background-color: rgb(255, 255, 255); /* 동그라미 색상 */
  flex-shrink: 0; /* 크기 줄어들지 않게 고정 */
  border: 3px solid #4caf50;
}

.text {
  line-height: 1.5; /* 텍스트 줄 간격 */
}
</style>
