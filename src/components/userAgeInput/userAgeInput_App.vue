<template>
  <div id="app">
    <Header />
    <Buttons @selectAge="selectAge" />
    <Footer :age="age" @submit="submit" />
  </div>
</template>

<script>
import Header from './components/UserStateSelection/Header.vue';
import Buttons from './components/UserStateSelection/Buttons.vue';
import Footer from './components/UserStateSelection/Footer.vue';

export default {
  components: {
    Header,
    Buttons,
    Footer,
  },
  data() {
    return {
      age: null,
    };
  },
  methods: {
    selectAge(age) {
      this.age = age;
    },
    submit() {
      alert(`선택한 나이: ${this.age}`);
      // 서버에 전송하는 로직을 추가할 수 있습니다.
    },
  },
};
</script>

<style>
/* 기본 스타일 */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
}
</style>
