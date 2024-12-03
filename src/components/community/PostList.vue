<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post-item">
      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-content">{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.post-list {
  background-color: white;
  border-radius: 16px;
  padding: 10px;
}

.post-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.post-item:last-child {
  border-bottom: none;
}

.post-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.post-content {
  font-size: 14px;
  color: #666;
}
</style>
