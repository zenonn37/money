import axios from 'axios';
import { url } from '../../api/apps'
const accounts = "accounts";
const state = {
    accounts: []

}

const mutations = {
    SET_ACCOUNT(state, acct) {
        state.accounts = acct;
    },

}

const getters = {
    GET_ACCOUNTS(state) {
        return state.accounts;
    },

}

const actions = {
    //get all accounts
    ALL_ACCOUNTS({ commit }) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');

        return new Promise((resolve, reject) => {
            axios.get(`${url}/${accounts}`)
                .then(res => {
                    commit('SET_ACCOUNT', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })




    }
}

export default {
    state, mutations, getters, actions
}