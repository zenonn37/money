import axios from 'axios'
import { url } from '../../api/apps';
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem('access_token');

const state = {

    report: null,
    bar: [],
    pie: []
}

const mutations = {
    set_reports(state, payload) {
        state.report = payload
    },
    set_bar(state, payload) {
        state.bar = payload
    },
    set_pie(state, payload) {
        state.pie = payload
    },

}

const getters = {
    get_reports(state) {
        return state.report
    }
}

const actions = {
    get_reports({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/worth`)
                .then(res => {
                    resolve(res)
                    const data = {
                        transactions: res.data.transactions,
                        deposits: res.data.deposits,
                        spent: res.data.spent,
                        count: res.data.count,
                        all: res.data.all
                    }
                    commit('set_reports', data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    get_bar({ commit, dispatch }) {

    },
    get_pie({ commit, dispatch }) {

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}