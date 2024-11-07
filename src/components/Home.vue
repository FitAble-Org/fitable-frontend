<!-- Home.vue -->
<template>
    <div class="home-container">
      <div class="calendar-container">
        <Calendar :events="events" @dateSelected="onDateSelected" />
      </div>
      <div v-if="selectedEvents.length">
        <EventList :events="selectedEvents" type="실내운동" />
        <EventList :events="selectedEvents" type="실외운동" />
      </div>
      <p v-else class="no-records-message">아직 운동 기록이 없어요!</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import dayjs from 'dayjs';
  import Calendar from '@/components/Calendar.vue';
  import EventList from '@/components/EventList.vue';
  
  const events = ref([
    { date: "2024-11-28", activities: [{ type: "실외운동", name: "앉았다 일어서기", duration: 10 }, { type: "실내운동", name: "요가", duration: 20 }] },
    { date: "2024-11-20", activities: [{ type: "실외운동", name: "조깅", duration: 40 }] },
    { date: "2024-11-10", activities: [{ type: "실외운동", name: "앉았다 일어서기", duration: 10 }, { type: "실내운동", name: "요가", duration: 20 }, { type: "실내운동", name: "스트레칭", duration: 20 }] }
  ]);
  
  const selectedEvents = ref([]);
  
  const onDateSelected = (date) => {
    const event = events.value.find(event => event.date === date);
    selectedEvents.value = event ? event.activities : [];
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
  