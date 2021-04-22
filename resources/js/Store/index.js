import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      status: '',
      token: localStorage.getItem('token') || '',
    },
    mutations: {
    },
    actions: {

    },
    getters : {
        isLoggedIn: state => !!state.token
    }
});
