<!-- src/components/EventList.vue -->

<template>
    <!-- 선택한 일정의 활동들을 렌더링하는 단일 박스 -->
    <div v-if="filteredActivities.length" class="event-box">
      <!-- 총 운동 시간과 유형 표시 -->
      <div class="event-header">
        <div class="total-duration">{{ totalDuration }}분</div>
        <div :class="['activity-type', { 'indoor': type === '실내운동', 'outdoor': type === '실외운동' }]">{{ type }}</div>
      </div>
      
      <!-- 구분선 -->
      <div class="divider"></div>
  
      <!-- 각 활동 표시 -->
      <div v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
        <div class="activity-name">{{ activity.name }}</div>
        <div class="activity-duration">{{ activity.duration }}분</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    events: Array,
    type: String,
  });
  
  // type에 따라 실내운동 또는 실외운동만 필터링
  const filteredActivities = computed(() => props.events.filter(activity => activity.type === props.type));
  
  // 총 운동 시간을 계산
  const totalDuration = computed(() => filteredActivities.value.reduce((sum, activity) => sum + activity.duration, 0));
  </script>
  
  <style scoped>
  .event-box {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .event-header {
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .total-duration {
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
  }
  
  .activity-type {
    display: inline-block; /* 텍스트 크기에 맞게 줄어들도록 설정 */
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 4px;
  }
  
  .activity-type.indoor {
    background-color: #ffe4b5; /* 실내운동 배경색 */
    color: #ff8c00;
  }
  
  .activity-type.outdoor {
    background-color: #b0e0e6; /* 실외운동 배경색 */
    color: #1e90ff;
  }
  
  .divider {
    height: 1px;
    background-color: #e0e0e0;
    margin: 10px 0;
  }
  
  .activity-item {
    display: flex;
    flex-direction: column; /* 세로 배치 */
    align-items: flex-start;
    padding: 10px 0;
    font-size: 14px;
    color: #333;
  }
  
  .activity-name {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .activity-duration {
    font-size: 12px;
    color: #888;
  }
  </style>
  