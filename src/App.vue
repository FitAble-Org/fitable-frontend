<template>
  <div class="app-container">
    <Header />
    <div class="calendar-container">
      <Calendar :events="events" @dateSelected="onDateSelected" />
    </div>
    <div v-if="selectedEvents.length">
      <EventList :events="selectedEvents" type="실내운동" />
      <EventList :events="selectedEvents" type="실외운동" />
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import Header from './components/Header.vue';
import Calendar from './components/Calendar.vue';
import EventList from './components/EventList.vue';
import BottomNav from './components/BottomNav.vue';

const events = ref([
  { date: "2024-11-28", activities: [{ type: "실외운동", name: "앉았다 일어서기", duration: 10 }, { type: "실내운동", name: "요가", duration: 20 }] },
  { date: "2024-11-20", activities: [{ type: "실외운동", name: "조깅", duration: 40 }] },
  { date: "2024-11-10", activities: [{ type: "실외운동", name: "앉았다 일어서기", duration: 10 }, { type: "실내운동", name: "요가", duration: 20 }] }
]);
const selectedEvents = ref([]);

const onDateSelected = (date) => {
  const event = events.value.find(event => event.date === date);
  selectedEvents.value = event ? event.activities : [];
};
</script>

<style scoped>
.app-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.calendar-container {
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  margin: 20px 20px;
}

.calendar-container h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
