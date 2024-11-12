<!-- src/components/EventList.vue -->

<template>
  <!-- 선택한 일정의 활동들을 렌더링하는 단일 박스 -->
  <div v-if="type && events.length" class="event-box">
  <div class="event-header">
    <div class="total-duration">{{ totalDuration }}분</div>
    <div :class="['activity-type', { 'indoor': type === '가정운동', 'outdoor': type === '외부운동' }]">{{ type }}</div>
  </div>
  <div class="divider"></div>
  <div v-for="(activity, index) in events" :key="index" class="activity-item">
    <div>
      <div class="activity-name">{{ activity.exerciseName }}</div>
      <div class="activity-duration">{{ activity.duration }}분</div>
    </div>
    <font-awesome-icon icon="fa-regular fa-pen-to-square" class="edit-icon" @click="openEditPopup(index)" />
  </div>
</div>


  <div v-if="isEditPopupVisible" class="popup-overlay">
    <div class="popup">
      <p>몇 분 운동하셨나요?</p>
      <input type="number" v-model="newDuration" placeholder="시간을 입력하세요" />
      <button class="confirm-button" @click="saveDuration">저장</button>
      <button class="cancel-button" @click="closeEditPopup">취소</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: ''
  },
});


// 총 운동 시간을 계산
const totalDuration = computed(() => {
  return (props.events || []).reduce((sum, activity) => sum + activity.duration, 0);
});
// 팝업 상태와 수정할 시간 관련 상태 변수
const isEditPopupVisible = ref(false);
const editingIndex = ref(null);
const newDuration = ref(0);

// 팝업 열기
function openEditPopup(index) {
  if (props.events && props.events[index]) {
    editingIndex.value = index;
    newDuration.value = props.events[index].duration;
    isEditPopupVisible.value = true;
  }
}

// 팝업 닫기
function closeEditPopup() {
  isEditPopupVisible.value = false;
  editingIndex.value = null;
}

// 시간 저장
function saveDuration() {

  if (editingIndex.value !== null && newDuration.value >= 0) {
    props.events[editingIndex.value].duration = newDuration.value;
    closeEditPopup();
  }
}
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
/*   
.activity-item {
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
} */

.activity-item {
display: flex;
justify-content: space-between; /* 아이콘을 오른쪽 끝으로 배치 */
align-items: center;
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


.edit-icon {
cursor: pointer;
color: #4caf50;
font-size: 18px;
}


.popup-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
}

.popup {
background-color: white;
padding: 24px;
border-radius: 12px;
text-align: center;
width: 80%;
max-width: 300px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.popup p {
margin: 0;
font-size: 16px;
color: #333;
}

input[type="number"] {
width: 100%;
padding: 8px;
margin-top: 10px;
border-radius: 4px;
border: 1px solid #ccc;
}

.confirm-button,
.cancel-button {
margin-top: 16px;
padding: 10px 20px;
border: none;
cursor: pointer;
border-radius: 8px;
font-size: 16px;
}

.confirm-button {
background-color: #4caf50;
color: white;
margin-right: 8px;
}

.cancel-button {
background-color: #f5f5f5;
color: #333;
}
</style>
