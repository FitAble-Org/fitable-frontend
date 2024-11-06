<template>
    <div class="footer">
      <button class="primary" @click="submit" :disabled="!age">선택 완료</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    props: {
      age: {
        type: String,
        required: false,
      },
    },
    methods: {
      submit() {
        this.$emit('submit');
      },
    },
  };
  </script>
  
  <style scoped>
  .footer {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    text-align: center;
  }
  
  button.primary {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    font-size: 1.2em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
  }
  
  button:active {
    transform: scale(0.98);
  }
  
  @media (min-width: 600px) {
    button.primary {
      padding: 25px;
      font-size: 1.3em;
    }
  }
  
  @media (min-width: 1024px) {
    button.primary {
      padding: 30px;
      font-size: 1.4em;
    }
  }
  </style>
  