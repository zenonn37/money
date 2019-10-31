import axios from 'axios';
import { url } from '../../api/apps';

import _ from "lodash";



const state = {
    trans: [],
    links: "",
    meta: "",
    total: "",
    order: true,
    net: "",
}

const mutations = {
    SET_TRANS(state, trans) {
        state.trans = trans;
    },
    NEW_TRANS(state, trans) {
        state.trans.push(trans);

    },
    set_net(state, net) {
        state.net = net
    },

    DELETE_TRANS(state, id) {
        // console.log(id);
        const newTrans = state.trans.filter(tran => tran.id !== id)
        state.trans = newTrans


    },
    SET_TOTAL(state, total) {
        state.total = total
    },
    SET_LINKS(state, links) {
        state.links = links
    },
    SET_META(state, meta) {
        state.meta = meta
    },
    sortAmount(state) {


        if (state.order) {
            state.trans = _.sortBy(state.trans, [

                function (value) {
                    console.log('called ASC ');

                    return value.amount;

                }

            ]);
            console.log(state.trans);

        } else {
            state.trans = _.sortBy(state.trans, [

                function (value) {

                    console.log('called DESC ');
                    return value.amount * -1;

                }

            ]);
            console.log(state.trans);

        }








    },
}

const getters = {



    GET_TRANSACTIONS(state) {




        return state.trans
    },
    GET_TRANSACTION: (state) => (id) => {

        return state.trans.find(tran => tran.id === id)
    },

    GET_LINKS(state) {
        return state.links;
    },
    GET_META(state) {
        return state.meta;
    },
    GET_TOTAL(state) {
        return state.total;


    }
}

const actions = {

    sortAmounts({ commit }) {
        state.order = !state.order

        //console.log(state.order);
        commit('sortAmount');
    },
    range({ commit, dispatch, getters }, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/range/${payload.id}`, {

                date: payload.date.slice(0, 19).replace("T", " "),
                date2: payload.date2.slice(0, 19).replace("T", " ")

            }).then(res => {
                commit('SET_TRANS', res.data.data)
                commit('SET_LINKS', res.data.links)
                commit('SET_META', res.data.meta)
                resolve(res)
            }).catch(err => {
                reject(err)
                console.log(err.response.data.message);

            })
        })
    },

    find_day({ commit, dispatch, getters }, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/day/${payload.id}`, {

                date: payload.date.slice(0, 19).replace("T", " ")

            }).then(res => {
                commit('SET_TRANS', res.data.data)
                commit('SET_LINKS', res.data.links)
                commit('SET_META', res.data.meta)
                resolve(res)
            }).catch(err => {
                reject(err)
                console.log(err.response.data.message);

            })
        })
    },
    PAGE_TRANSACTIONS({ commit }, data) {
        console.log(data);

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {
            axios.get(`${url}/transactions/${data.id}?page=${data.page}`)
                // axios.get(`${url}/transactions/${id}?page=${page}`)
                .then(res => {
                    const data = res.data
                    commit('SET_TRANS', data.data)

                    resolve(res)

                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },

    ACCOUNT_TRANSACTIONS({ commit, dispatch }, id) {

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {

            axios.get(`${url}/transactions/${id}`)
                .then(res => {
                    const data = res.data
                    commit('SET_TRANS', data.data)
                    commit('SET_LINKS', data.links)
                    commit('SET_META', data.meta)

                    //dispatch('total', id)
                    axios.post(`${url}/total/${id}`)
                        .then(res => {
                            resolve(res)
                            commit('SET_TOTAL', res.data)
                        }).catch(err => {
                        })




                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },


    account_transaction({ commit, getters }, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {
            console.log(payload + "transaction type account transaction");

            axios.post(`${url}/transactions`, {
                name: payload.name,
                type: payload.type,
                amount: parseFloat(payload.amount),
                date: payload.date.slice(0, 19).replace("T", " "),
                acct_id: payload.acct_id
            })
                .then(res => {
                    console.log('called');

                    commit('NEW_TRANS', res.data)
                    const bal = getters.GET_TOTAL;
                    axios.post(`${url}/total/${payload.acct_id}`, {
                        balance: bal
                    })
                        .then(res => {
                            resolve(res)
                            commit('SET_TOTAL', res.data)
                        }).catch(err => {
                        })
                    //  resolve(res)

                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },
    total({ commit }, id) {
        return new Promise((resolve, reject) => {



            axios.post(`${url}/total/${id}`)
                .then(res => {
                    resolve(res)
                    const data = {
                        debit: res.data.debit,
                        credit: res.data.credit,
                        net: res.data.net
                    }
                    commit('SET_TOTAL', res.data)
                }).catch(err => {
                    reject(err)
                })
            //  resolve(res)

        })
    },
    NEW_TRANSACTION({ commit, dispatch }, payload) {
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

                    dispatch('total', payload.acct_id)

                    resolve(res)

                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },
    UPDATE_TRANSACTION({ commit, dispatch, getters }, payload) {
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


                    dispatch('total', payload.acct_id)
                    resolve(res)

                }).catch(err => {
                    //handle errors!!
                    console.log(err);

                    reject(err)
                })
        })
    },
    DELETE_TRANSACTION({ commit, dispatch }, payload) {
        //MAKE DRY!
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {

            console.log(payload.acct_id);


            axios.delete(`${url}/transactions/${payload.id}`)
                .then(res => {
                    console.log(res);

                    commit('DELETE_TRANS', payload.id)


                    dispatch('total', payload.acct_id)

                    //
                    // console.log(bal);
                    // //const bal = getters.GET_TOTAL;
                    // console.log(bal);

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
    namespaced: true,
    state, mutations
    , actions, getters
}