import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocialauth from 'vue-social-auth';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import config from './vue.config';
import store from './Store/index';
import router from './Router/index';
import App from './App.vue';

require('./bootstrap');

window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = config.baseUrl;
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
Vue.prototype.$http = axios;
const { token } = store.state;
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: config.googleClientId,
      redirectUri: config.redirectGoogle,
    },
  },
});

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  store,
  router,
  components: { App },
});
