import { createApp } from 'vue';
import App from '../App.vue';
import router from './router';
import './assets/styles.css';

// FontAwesome 설정
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// PrimeVue 설정
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";

// FontAwesome 라이브러리에 아이콘 추가
library.add(faPenToSquare, faArrowLeft);

const app = createApp(App);

// FontAwesomeIcon을 전역 컴포넌트로 등록
app.component('font-awesome-icon', FontAwesomeIcon);

// PrimeVue 및 기타 설정
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Button', Button);

// 앱 마운트
app.mount('#app');
