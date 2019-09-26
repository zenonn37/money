import axios from 'axios';
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
            "Bearer " + state.token;

        return new Promise((resolve, reject) => {
            axios.get('http://apps.test/api/accounts')
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