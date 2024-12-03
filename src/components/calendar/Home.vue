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
    <!-- 고정된 + 버튼 -->
    <div
      class="floating-action-button"
      @click="togglePopup"
      :style="{ zIndex: showPopup ? 1005 : 'auto' }"
    >
      <span v-if="!showPopup">+</span>
      <span v-else>x</span>
    </div>

    <!-- 팝업 오버레이 -->
    <div
      class="popup-overlay"
      v-show="isAnimating || showPopup"
      @click.self="togglePopup"
    >
      <div
        class="popup-menu"
        :class="{ 'popup-enter': showPopup, 'popup-exit': !showPopup }"
        @animationend="onAnimationEnd"
      >
        <!-- 팝업 버튼: 라우터 이동 -->
        <div class="popup-item" @click="navigateTo('IndoorExercise')">
          <!-- 아이콘 자리 -->
          <span class="popup-icon"></span>
          <span>가정 운동 추천</span>
        </div>
        <div class="popup-item" @click="navigateTo('DistanceSelection')">
          <!-- 아이콘 자리 -->
          <span class="popup-icon"></span>
          <span>운동 시설 및 강좌 추천</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // 라우터 기능 추가
import dayjs from "dayjs";
import Calendar from "@/components/calendar/Calendar.vue";
import EventList from "@/components/calendar/EventList.vue";
import apiClient from "@/axios/apiClient.js";

const router = useRouter(); // 라우터 초기화
const events = ref([]);
const selectedEvents = ref([]);
const indoorActivities = ref([]);
const outdoorActivities = ref([]);
const showPopup = ref(false); // 팝업 상태를 관리하는 변수
const isAnimating = ref(false); // 애니메이션 중인지 상태

async function fetchMonthlySchedule(year, month) {
  try {
    const response = await apiClient.get(`calendar/${year}/${month}`); // API 엔드포인트에 맞게 수정
    events.value = response.data;
    console.log(response.data);
    console.log(response);
  } catch (error) {
    console.error("이 달의 스케줄 요청 중 오류 발생:", error);
  }
}

onMounted(async () => {
  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;
  await fetchMonthlySchedule(currentYear, currentMonth);

  const today = dayjs().format("YYYY-MM-DD");
  onDateSelected(today);
});

const onDateSelected = (date) => {
  selectedEvents.value = events.value.filter((event) => {
    const eventDate = dayjs(event.datePerformed).format("YYYY-MM-DD"); // event.datePerformed 포맷 변경
    return eventDate === date; // date는 이미 YYYY-MM-DD 형식이라고 가정
  });

  // 운동 유형별로 데이터 필터링
  console.log(selectedEvents.value);
  indoorActivities.value = selectedEvents.value.filter(
    (event) => event.exerciseType === "가정운동"
  );
  outdoorActivities.value = selectedEvents.value.filter(
    (event) => event.exerciseType === "외부운동"
  );
};

// 팝업 메뉴에서 선택 시 라우터 이동
const navigateTo = (route) => {
  showPopup.value = false; // 팝업 닫기
  router.push({ name: route }); // 지정된 라우터로 이동
};

// 팝업 열기/닫기 토글 함수
const togglePopup = () => {
  if (!showPopup.value) {
    openPopup();
  } else {
    closePopup();
  }
};

const openPopup = () => {
  isAnimating.value = true;
  showPopup.value = true;
};

const closePopup = () => {
  isAnimating.value = true;
  showPopup.value = false;
};

const onAnimationEnd = () => {
  isAnimating.value = false;
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

/* 고정된 + 버튼 스타일 */
.floating-action-button {
  /* position을 fixed에서 absolute로 변경 */
  position: absolute;
  bottom: 85px;
  right: 25px;
  width: 56px;
  height: 56px;
  background-color: #4caf50;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* 팝업 오버레이 스타일 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); /* 배경 어둡게 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 팝업 메뉴 스타일 */
.popup-menu {
  position: absolute;
  bottom: 160px;
  right: 25px;
  background: white;
  border-radius: 16px;
  padding: 18px 0 18px 0;
  display: flex;
  flex-direction: column;
  width: 230px;
  opacity: 0;
  transform: translateY(20px);
}

/* 나타나는 애니메이션 */
.popup-enter {
  animation: slide-in 0.2s ease forwards;
}

/* 사라지는 애니메이션 */
.popup-exit {
  animation: slide-out 0.2s ease forwards;
}

/* 애니메이션 정의 */
@keyframes slide-in {
  0% {
    transform: translateY(20px); /* 아래에서 위로 시작 */
    opacity: 0; /* 보이지 않음 */
  }
  100% {
    transform: translateY(0); /* 원래 위치 */
    opacity: 1; /* 보이게 함 */
  }
}
@keyframes slide-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}

.popup-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.popup-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  /* 아이콘 배치를 위한 자리만 확보 */
}
</style>
