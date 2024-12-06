<template>
  <div class="back-arrow" @click="navigate">
    <font-awesome-icon :icon="['fas', 'arrow-left']" style="color: #c2c2c2" />
  </div>
</template>

<script>
export default {
  name: "BackArrow",
  props: {
    routeName: {
      type: String,
      required: true, // 반드시 라우트 이름을 전달해야 함
    },
  },
  methods: {
    navigate() {
      this.$router.push({ name: this.routeName });
    },
  },
};
</script>

<style scoped>
.back-arrow {
  position: absolute; /* 부모 컨테이너 기준 위치 설정 */
  top: 30px; /* 위에서 30px */
  left: 40px; /* 왼쪽에서 40px */
  font-size: 24px; /* 아이콘 크기 */
  cursor: pointer; /* 클릭 가능한 표시 */
}
</style>
