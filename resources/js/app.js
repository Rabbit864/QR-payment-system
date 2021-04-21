require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocialauth from 'vue-social-auth';
import VueAxios from 'vue-axios';
import axios from 'axios'


import router from './Router/index';
import App from './App.vue';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VueSocialauth, {
    providers: {
      google: {
        clientId: '333429272007-it580ggnm02d3ibs6dfpdppkruc99fmk.apps.googleusercontent.com',
        redirectUri: 'http://localhost:8000/auth/google/callback'
      }
    }
});


const app = new Vue({
    el: '#app',
    router,
    components: { App }
});
