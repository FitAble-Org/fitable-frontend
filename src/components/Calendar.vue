<!-- src/components/Calendar.vue -->

<template>
    <div class="calendar">
      <h2>{{ currentMonth }} {{ currentYear }}</h2>
      <div class="calendar-grid">
        <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          :class="['day', { highlighted: hasEvent(day), today: isToday(day), selected: isSelected(day) }]"
          @click="selectDate(day)"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';
  import dayjs from 'dayjs';
  
  const props = defineProps({
    events: Array,
  });
  const emit = defineEmits(['dateSelected']);
  
  const currentYear = dayjs().year();
  const currentMonth = dayjs().format('MMMM');
  
  const selectedDate = ref(null);
  
  const daysInMonth = computed(() => {
    const days = [];
    const daysInMonth = dayjs(`${currentYear}-${dayjs().month() + 1}-01`).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  });
  
  const isToday = (day) => {
    const today = dayjs();
    return today.date() === day && today.month() === dayjs().month() && today.year() === currentYear;
  };
  
  const isSelected = (day) => selectedDate.value === formatDate(day);
  
  const hasEvent = (day) => {
    const date = formatDate(day);
    return props.events.some((event) => event.date === date);
  };
  
  const selectDate = (day) => {
    selectedDate.value = formatDate(day);
    emit('dateSelected', selectedDate.value); // 선택한 날짜를 부모 컴포넌트로 emit
  };
  
  const formatDate = (day) => {
    const month = String(dayjs().month() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${currentYear}-${month}-${dayStr}`;
  };
  </script>
  
  <style scoped>
  .calendar {
    text-align: center;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .day {
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #f0f0f0;
    color: #333;
  }
  
  .today {
    background-color: #a5d6a7;
    color: white;
  }
  
  .selected {
    border: 2px solid #28a745;
  }
  
  .highlighted {
    background-color: #a5d6a7;
    color: white;
  }
  </style>
  