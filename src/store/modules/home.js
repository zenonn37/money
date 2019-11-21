import axios from 'axios'
import { url } from '../../api/apps';
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem('access_token');

const state = {

    report: null,
    month: null,
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
    month_report(state, payload) {
        state.month = payload
    }

}

const getters = {
    get_month_report(state) {
        return state.month

    },
    get_reports(state) {
        return state.report
    }
}

const actions = {

    monthReport({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/month`)
                .then(res => {
                    const data = {
                        start: res.data.current,
                        end: res.data.month,
                        trans: res.data.trans
                    }

                    resolve(res)
                    commit('month_report', data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    get_reports({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/worth`)
                .then(res => {
                    dispatch('monthReport')
                    resolve(res)
                    const data = {
                        transactions: res.data.transactions,
                        deposits: res.data.deposits,
                        spent: res.data.spent,
                        count: res.data.count,
                        all: res.data.all,
                        charts: res.data.charts
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