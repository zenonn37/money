import axios from 'axios';
import { url } from '../../api/apps';


const state = {
    trans: []
}

const mutations = {
    SET_TRANS(state, trans) {
        state.trans = trans;
    },
    NEW_TRANS(state, trans) {
        state.trans.push(trans);
    }
}

const getters = {
    GET_TRANSACTIONS(state) {
        return state.trans
    },
    GET_TRANSACTION: (state) => (id) => {
        console.log(id);
        console.log(state.trans.find(t => t.id === 7));

        return state.trans.find(tran => tran.id === id)
    }
}

const actions = {

    ACCOUNT_TRANSACTIONS({ commit }, id) {

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {

            axios.get(`${url}/transactions/${id}`)
                .then(res => {

                    commit('SET_TRANS', res.data)
                    resolve(res)

                }).catch(err => {
                    console.log(err);

                    reject(err)
                })
        })
    },
    NEW_TRANSACTION({ commit }, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {
            console.log(payload);

            axios.post(`${url}/transactions`, {
                name: payload.name,
                type: payload.type,
                amount: parseFloat(payload.amount),
                acct_id: payload.acct_id
            })
                .then(res => {

                    commit('NEW_TRANS', res.data)
                    resolve(res)

                }).catch(err => {
                    console.log(err);

                    reject(err)
                })
        })
    }
}

export default {
    state, mutations
    , actions, getters
}