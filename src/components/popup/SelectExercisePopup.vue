<template>
    <div class="popup-overlay" v-if="isVisible">
      <div class="popup">
        <p>운동을 선택하시겠습니까? </p>
        <div class="btn-conatainer">
          <button class="confirm-button" @click="addCalendar">확인</button>
          <button class="cancle-button" @click="emit('close')">취소</button>
        </div>
      </div>
    </div>
  </template>
<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/axios/apiClient.js';

  
  
  const router = useRouter();
  
  // Props 및 Emits 정의
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    exercise: {
      type: Object,
      required: true,
    },
    exerciseType: {
      type: String,
      required: true,
    },
  });
  
  const { exercise, exerciseType } = toRefs(props);
  
  
  const emit = defineEmits(['close']);
  
  // 캘린더에 운동 추가 함수
  async function addCalendar() {
    console.log(exercise.value)
    console.log( {
        exerciseName: exercise.value.exerciseName,
        exerciseId: exercise.value.exerciseId,
        exerciseType: exercise.value.sportsStep
    })
        
    router.push({
        name: "IndoorExerciseInfo",
        query: {
        exerciseName: exercise.value.exerciseName,
        exerciseId: exercise.value.exerciseId,
        exerciseType: exercise.value.sportsStep
        }
    });

  }
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
  .cancle-button{
    margin-top: 16px;
    background-color: #b3b3b3;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .btn-conatainer{
    display: flex;
    gap: 16px; /* 버튼 사이 간격 */
    justify-content: center; /* 버튼을 가운데 정렬 */
    margin-top: 16px; /* 버튼 컨테이너와 위 요소 간격 */
  }
  </style>
  