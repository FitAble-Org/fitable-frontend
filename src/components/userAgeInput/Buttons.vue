<template>
    <div class="buttons">
      <button
        v-for="option in options"
        :key="option"
        :class="['secondary', { selected: selectedAge === option }]"
        @click="select(option)"
      >
        {{ option }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Buttons',
    data() {
      return {
        selectedAge: null,
        options: ['10대', '20-30대', '40-50대', '60대 이상']
      };
    },
    methods: {
      select(age) {
        this.selectedAge = age;
        this.$emit('selectAge', age);
      }
    }
  };
  </script>
  
  <style scoped>
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  button.secondary {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    font-size: 1.2em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #f1f1f1;
    color: #333;
  }
  
  button.secondary.selected {
    background-color: #4CAF50;
    color: white;
  }
  
  @media (min-width: 600px) {
    button.secondary {
      padding: 25px;
      font-size: 1.3em;
    }
  }
  
  @media (min-width: 1024px) {
    button.secondary {
      padding: 30px;
      font-size: 1.4em;
    }
  }
  </style>
  