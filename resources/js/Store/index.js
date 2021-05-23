import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: null
    },
    mutations: {
        logout(state) {
            state.token = null;
            state.user = null;
        },
        auth_success(state, data) {
            state.token = data.token;
            state.user = data.user;
        }
    },
    actions: {
        login({ commit }, userData) {
            return new Promise((resolve, reject) => {
                axios({ url: 'api/sociallogin/google', method: 'POST', data: userData })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', { token, user });
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log('eror');
                        reject(err);
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                delete axios.defaults.headers.common['Authorization'];
                resolve();
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
    },
    plugins: [createPersistedState()]
});
