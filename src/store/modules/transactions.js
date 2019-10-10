import axios from 'axios';
import { url } from '../../api/apps';
import { totalTransaction } from '../../math/math'


const state = {
    trans: []
}

const mutations = {
    SET_TRANS(state, trans) {
        state.trans = trans;
    },
    NEW_TRANS(state, trans) {
        state.trans.push(trans);
    },
    DELETE_TRANS(state, id) {
        console.log(id);
        const newTrans = state.trans.filter(tran => tran.id !== id)
        state.trans = newTrans


    }
}

const getters = {
    GET_TRANSACTIONS(state) {
        return state.trans
    },
    GET_TRANSACTION: (state) => (id) => {

        return state.trans.find(tran => tran.id === id)
    },
    TOTAL_TRANSACTION(state, getters) {
        let array = state.trans;
        return totalTransaction(array);
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
                    //handle errors!!
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
                date: payload.date.slice(0, 19).replace("T", " "),
                acct_id: payload.acct_id
            })
                .then(res => {

                    commit('NEW_TRANS', res.data)
                    resolve(res)

                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },
    UPDATE_TRANSACTION({ commit }, payload) {
        //MAKE DRY!
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {
            console.log(payload);

            axios.patch(`${url}/transactions/${payload.id}`, {
                name: payload.name,
                type: payload.type,
                amount: payload.amount,
                acct_id: payload.acct_id,
                date: payload.date.slice(0, 19).replace("T", " "),
            })
                .then(res => {


                    commit('NEW_TRANS', res.data)
                    resolve(res)

                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },
    DELETE_TRANSACTION({ commit }, id) {
        //MAKE DRY!
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {


            axios.delete(`${url}/transactions/${id}`)
                .then(res => {
                    console.log(res);

                    commit('DELETE_TRANS', id)
                    resolve(res)

                }).catch(err => {
                    //handle errors!!
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