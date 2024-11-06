<template>
    <header class="header-container">
      <h1>오늘의 운동</h1>
    </header>
  </template>
  
  <script setup>
  // No additional logic is needed for the header component
  </script>
  
  <style scoped>
  .header-container {
    background-color: #ffffff;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  </style>
  