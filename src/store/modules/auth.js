import money from '../../api/money'
import axios from 'axios';

const state = {
    token: localStorage.getItem("access_token") || null,
    user: localStorage.getItem("user") || null,

};
const mutations = {
    SET_AUTH(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.user = user
    }


}

const getters = {
    GET_AUTH(state) {
        return state.token
    },
    GET_USER(state) {
        return state.USER
    }

}

const actions = {
    //Register
    REGISTER({ commit }, data) {

        return new Promise((resolve, reject) => {
            money.post('/new', data)
                .then(res => {
                    console.log(res);
                    const result = res.data;
                    console.log(result);

                    resolve(res)

                }).catch(err => {
                    console.log(err);
                    reject(err)

                })
        });

    },

    //LOGIN
    LOGIN({ commit }, data) {

        return new Promise((resolve, reject) => {
            money.post('/login', data)
                .then(res => {
                    console.log(res);
                    const result = res.data.access_token;
                    console.log(result);

                    commit("SET_AUTH", result)
                    localStorage.setItem("access_token", result)
                    resolve(res)

                }).catch(err => {
                    console.log(err);
                    reject(err)

                })
        });

    },
    LOGOUT({ commit }) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.token;
        return new Promise((resolve, reject) => {
            axios.post('http://apps.test/api/logout')
                .then(() => {


                    commit("SET_USER", null)
                    localStorage.removeItem("user")
                    localStorage.removeItem("access_token")
                    resolve()
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    },

    USER({ commit }) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.token;
        return new Promise((resolve, reject) => {
            axios.get('http://apps.test/api/user')
                .then(res => {

                    console.log(res);

                    const result = res.data;
                    commit("SET_USER", result)
                    localStorage.setItem("user", result)
                    resolve(res)
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    },


}




export default {
    state, mutations, getters, actions
}

