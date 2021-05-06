import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: localStorage.getItem('token') || '',
    },
    mutations: {
        logout(state) {
            state.token = '';
        },
        auth_success(state, data) {
            state.token = data.token;
            state.user = data.user;
        }
    },
    actions: {
        login({ commit }, userData) {
            return new Promise((resolve, reject) => {
                axios({ url: 'http://localhost:8000/api/sociallogin/google', method: 'POST', data: userData })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        console.log(user);
                        commit('auth_success', { token, user });
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log('eror');
                        localStorage.removeItem('token');
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token
    }
});
