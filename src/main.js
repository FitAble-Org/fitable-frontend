import { createApp } from 'vue';
import App from '../App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Button from "primevue/button"

// import { setAuthToken } from '@/axios/apiClient';

// Add the icon to the library
library.add(faPenToSquare);

// localStorage.clear();
// const token = localStorage.getItem('jwtToken');
// if (token) {
    //   setAuthToken(token);
    // }
    
    const app = createApp(App);
    
    // Register FontAwesomeIcon as a global component
    app.component('font-awesome-icon', FontAwesomeIcon);
    
    // Use the router
    app.use(router);
    
    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    });
    // Mount the app
    app.component('Button', Button);
    app.mount('#app');
    