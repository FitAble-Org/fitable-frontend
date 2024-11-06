<template>
  <div class="calendar">
    <h2>{{ currentMonth }} {{ currentYear }}</h2>
    <div class="day-names">
      <span v-for="(day, index) in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="index">{{ day }}</span>
    </div>
    <div class="calendar-grid">
      <div
        v-for="(day, index) in daysInMonthWithOffset"
        :key="index"
        :class="[ 
          'day', 
          { highlighted: hasEvent(day), today: isToday(day), selected: isSelected(day), weekend: isWeekend(day) } 
        ]"
        @click="day ? selectDate(day) : null"
      >
        {{ day || '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  events: Array,
});
const emit = defineEmits(['dateSelected']);

const currentYear = dayjs().year();
const currentMonth = dayjs().format('MMMM');

const selectedDate = ref(null);

// Calculate days in month with offset for the first day of the week
const daysInMonthWithOffset = computed(() => {
  const days = [];
  const firstDayOfMonth = dayjs(`${currentYear}-${dayjs().month() + 1}-01`);
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const startDayOffset = (firstDayOfMonth.day() + 6) % 7; // Adjust to start week on Monday

  // Add empty days for offset
  for (let i = 0; i < startDayOffset; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
});

// Set selected date to today on component load
onMounted(() => {
  selectedDate.value = formatDate(dayjs().date());
  emit('dateSelected', selectedDate.value); // Emit today's date initially
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

const isWeekend = (day) => {
  const date = dayjs(`${currentYear}-${dayjs().month() + 1}-${day}`);
  return date.day() === 6 || date.day() === 0; // Saturday or Sunday
};

const selectDate = (day) => {
  selectedDate.value = formatDate(day);
  emit('dateSelected', selectedDate.value); // Emit selected date to parent component
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
  font-family: Arial, sans-serif;
  color: #888;
  max-width: 300px;
  margin: 0 auto;
}

h2 {
  font-size: 18px;
  font-weight: normal;
  color: #444;
  margin-bottom: 10px;
}

.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  color: #b0b0b0;
  margin-bottom: 5px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  padding: 6px; /* 패딩을 더 작게 조정 */
  width: 30px; /* 크기를 줄여서 선택 시 변화 방지 */
  height: 30px; /* 크기를 줄여서 선택 시 변화 방지 */
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box; /* border가 있어도 크기가 변하지 않도록 */
}



.selected {
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  border: 2px solid #28a745;
}

.highlighted {
  background-color: #a5d6a7;
  color: #fff;
}

/* Blue color for weekends (Saturday and Sunday) */
.weekend {
  color: #007bff;
}

.day:hover {
  background-color: #e0e0e0;
}
</style>
