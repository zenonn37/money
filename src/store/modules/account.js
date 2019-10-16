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
    NEW_ACCOUNT(state, acct) {
        state.accounts.push(acct);
    },
    DELETE_ACCOUNT(state, id) {
        //const ids = parseInt(id);

        const newArray = state.accounts.filter(account => account.id !== id)
        state.accounts = newArray
    }

}

const getters = {
    GET_ACCOUNTS(state) {
        return state.accounts;
    },
    GET_ACCOUNT: (state) => (id) => {

        return state.accounts.find(acct => acct.id === id)
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
                    commit('SET_ACCOUNT', res.data.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })




    },
    NEW_ACCOUNTS({ commit }, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');

        return new Promise((resolve, reject) => {
            axios.post(`${url}/${accounts}`, {
                name: payload.name,
                balance: payload.balance,
                type: payload.type


            })
                .then(res => {
                    commit('NEW_ACCOUNT', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })




    },
    UPDATE_ACCOUNT({ commit }, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');

        return new Promise((resolve, reject) => {
            axios.patch(`${url}/${accounts}/${payload.id}`, {
                name: payload.name,
                balance: payload.balance,
                type: payload.type


            })
                .then(res => {
                    commit('NEW_ACCOUNT', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })




    },
    DELETE_ACCOUNT({ commit }, id) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');

        return new Promise((resolve, reject) => {
            axios.delete(`${url}/${accounts}/${id}`)
                .then(res => {
                    commit('DELETE_ACCOUNT', id)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })




    },

}

export default {
    state, mutations, getters, actions
}