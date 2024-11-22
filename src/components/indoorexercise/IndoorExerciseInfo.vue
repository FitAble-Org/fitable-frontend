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

    <div id="video-container"></div>
  </div>


</template>

<script setup>
import { useRoute } from "vue-router";
import Timeline from 'primevue/timeline';
import { ref, onMounted } from 'vue';
import appClient from '@/axios/apiClient.js';
import axios from 'axios';


const route = useRoute();
console.log(route.query);
const selectedTab = ref(route.query.exerciseType);
const exerciseTypes = ref(['준비운동', '본운동', '마무리운동']);

onMounted(async () => {
  await fetchRecommendedTraining();
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
  const apiKey = 'AIzaSyCaQJaPVv80FcQmKfgqeM3b7malJQ8sZgE'; // 발급받은 API 키
  const query = route.query.exerciseName; // 검색할 키워드

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;
      } else {
        alert('검색 결과가 없습니다.');
      }
    })
    .catch(error => {
      console.error('YouTube API 요청 중 오류 발생:', error);
    });
</script>

<style scoped>
::v-deep(.p-timeline-event-content) {
  padding: 0 !important;
  margin: 0 !important;
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

.video-container{
  width: 85%;
}
</style>
