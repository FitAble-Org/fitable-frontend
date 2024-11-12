<template>
  <div class="popup-overlay" v-if="isVisible">
    <div class="popup">
      <p>운동을 추가했습니다.<br>홈화면에서 운동 후 시간을 기록해 주세요!</p>
      <button class="confirm-button" @click="addCalendar">확인</button>
    </div>
  </div>
</template>

<script>
import appClient from '@/axios/apiClient.js';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    exercise: {
      type: Object,
      required: true
    },
    exerciseType: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    async addCalendar() {
      try {
        const requestData = {
          exerciseId: this.exercise.exerciseId,
          duration: 0,
          exerciseType: this.exerciseType // this.exerciseType으로 수정
        };
        await appClient.post('/calendar', requestData);
        this.$emit('close'); // 모달 닫기 이벤트 발생
      } catch (error) {
        console.error("Failed to add exercise:", error);
      }
    }
  }
};
</script>

<style scoped>
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

.confirm-button {
  margin-top: 16px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
}
</style>
