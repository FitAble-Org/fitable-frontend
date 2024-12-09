<template>
  <div v-show="isReady" class="indoor-exercise-info-container">
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
      <button class="add-button" @click="showPopup()">
        운동 추가하기
      </button>
    </div>
  </div>
  <!-- 로딩 오버레이 -->
  <div class="loading-overlay" v-if="!isReady">
      <div class="loading-spinner"></div>
      <p>운동 정보를 가져오는 중...</p>
    </div>

  <AddToCalendarPopup
    :isVisible="isPopupVisible"
    :exercise="exercise"
    exerciseType="가정운동"
    @close="closePopup"
  />
  
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, nextTick, computed   } from "vue";
import Timeline from 'primevue/timeline';
import appClient from '@/axios/apiClient.js';
import axios from 'axios';
import AddToCalendarPopup from '@/components/popup/AddToCalendarPopup.vue';


const route = useRoute();
const isPopupVisible = ref(false);
const isReady = computed(() => isInstructionLoaded.value && isYoutubeLoaded.value);
const isYoutubeLoaded = ref(false);
const isInstructionLoaded = ref(false);

const selectedTab = ref(null);
const exerciseTypes = ref(['준비운동', '본운동', '마무리운동']);
const exerciseName = ref('');
const exerciseId = ref(null);
const exerciseSteps = ref([]);
const apiKey = 'AIzaSyD3HXT8PT2WmgLfPyyh1xdW-vwWOEu4xG4';
const exercise = ref(null)

function showPopup() {
  exercise.value = {
    exerciseName,
    exerciseId,
    exerciseStep: route.query.exerciseType
  };
  console.log( exercise.value )
  isPopupVisible.value = true;
}

function closePopup() {
  isPopupVisible.value = false;
}

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
    isYoutubeLoaded.value = true; // 데이터 로드 완료
    // isReady.value = isYoutubeLoaded.value&&
  }
}

async function loadYoutube() {
  
  await nextTick();
  
  const query = exerciseName.value; // 검색어 가져오기
  const videoContainer = document.querySelector(".video-container"); // 비디오 컨테이너
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    "국민체력100" + query
  )}&type=video&maxResults=1&key=${apiKey}`;

  try {
    // Axios GET 요청
    const response = await axios.get(url);

    // 데이터 확인 및 처리
    if (response.data.items && response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;

      // 비디오 삽입
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
  } catch (error) {
    console.error("YouTube API 요청 중 오류 발생:", error);
  } finally {
    // 로딩 상태 업데이트
    isInstructionLoaded.value = true;
  }
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
  font-size: 17px; /* 제목 크기 */
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
  font-size: 16px; /* 텍스트 크기 */
  color: #666; /* 텍스트 색상 */
}

.exercise-item {
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px; /* 동그라미와 텍스트 사이 간격 조절 */
}

.circle {
  width: 13px
  ; /* 동그라미 크기 */
  height: 13px; /* 동그라미 크기 */
  border-radius: 50%; /* 동그라미 모양 */
  background-color: rgb(255, 255, 255); /* 동그라미 색상 */
  flex-shrink: 0; /* 크기 줄어들지 않게 고정 */
  border: 4px solid #4caf50;
}

.text {
  line-height: 1.5; /* 텍스트 줄 간격 */
}

.add-button {
  width: 80%;
  height: 50px;
  background-color: #4caf50; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
  padding: 10px 20px; /* 버튼 여백 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 둥근 테두리 */
  font-size: 16px; /* 텍스트 크기 */
  cursor: pointer; /* 클릭 커서 표시 */
  margin-top: 10px; /* 상단 마진 */
  transition: background-color 0.3s ease; /* 부드러운 색상 전환 */
}

.add-button:hover {
  background-color: #45a049; /* 마우스 오버 색상 */
}
</style>
