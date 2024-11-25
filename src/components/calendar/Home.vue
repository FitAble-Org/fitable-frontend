<!-- Home.vue -->
<template>
    <div class="home-container">
      <div class="calendar-container">
        <Calendar :events="events" @dateSelected="onDateSelected" />
      </div>
      <div v-if="selectedEvents.length">
        <EventList :events="indoorActivities" type="가정운동" />
        <EventList :events="outdoorActivities" type="외부운동" />
      </div>
      <p v-else class="no-records-message">아직 운동 기록이 없어요!</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import Calendar from '@/components/calendar/Calendar.vue';
  import EventList from '@/components/calendar/EventList.vue';
  import apiClient from '@/axios/apiClient.js';

  
  const events = ref([]);
const selectedEvents = ref([]);
const indoorActivities = ref([]);
const outdoorActivities = ref([]);

  async function fetchMonthlySchedule(year, month) {
    try {
    const response = await apiClient.get(`calendar/${year}/${month}`); // API 엔드포인트에 맞게 수정
    events.value = response.data;
  } catch (error) {
    console.error('이 달의 스케줄 요청 중 오류 발생:', error);
  }
}

  onMounted(async () => {
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1;
    await fetchMonthlySchedule(currentYear, currentMonth);

    const today = dayjs().format('YYYY-MM-DD');
    onDateSelected(today);
  });

  const onDateSelected = (date) => {
    selectedEvents.value = events.value.filter(event => event.datePerformed === date);

    // 운동 유형별로 데이터 필터링
  console.log(selectedEvents.value)
  indoorActivities.value = selectedEvents.value.filter(event => event.exerciseType === '가정운동');
    outdoorActivities.value = selectedEvents.value.filter(event => event.exerciseType === '외부운동');
  };
  </script>
  
  <style scoped>
  .home-container {
    max-width: 480px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .calendar-container {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .no-records-message {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 20px;
}
  </style>
  