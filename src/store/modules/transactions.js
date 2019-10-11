import axios from 'axios';
import { url } from '../../api/apps';
import { totalTransaction } from '../../math/math'


const state = {
    trans: [],
    links: "",
    meta: "",
    total: [],
    order: false,
}

const mutations = {
    SET_TRANS(state, trans) {
        state.trans = trans;
    },
    NEW_TRANS(state, trans) {
        state.trans.push(trans);
        state.total.push(trans);
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
    sortDate(state) {

        state.order = !state.order
        state.trans.sort(function (n1, n2) {
            // const x = n1.createdAt.seconds
            // const y = n2.createdAt.seconds

            const x = n1.date
            const y = n2.date

            let test = state.order ? x == y : x > y

            if (test) {
                return 1
            } else {
                return -1
            }
        })
    },
}

const getters = {




    // function compare(a, b) {

    //     const dateA = a.date;
    //     const dateB = a.date;

    //     let comparison = 0;

    //     if (dateA > dateB) {
    //         comparison = 1;
    //     } else if (dateA < dateB) {
    //         comparison = -1;
    //     }
    //     return comparison;


    // }
    // const sorts = sort(compare);




    GET_TRANSACTIONS(state) {




        return state.trans
    },
    GET_TRANSACTION: (state) => (id) => {

        return state.trans.find(tran => tran.id === id)
    },
    TOTAL_TRANSACTION(state, getters) {
        let array = state.total;
        return totalTransaction(array);
    },
    GET_LINKS(state) {
        return state.links;
    },
    GET_META(state) {
        return state.meta;
    },
    GET_TOTAL(state) {
        let array = state.total;
        return totalTransaction(array);

    }
}

const actions = {

    sortDates({ commit }) {
        commit('sortDate');
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

    ACCOUNT_TRANSACTIONS({ commit }, id) {

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {

            axios.get(`${url}/transactions/${id}`)
                .then(res => {
                    const data = res.data
                    commit('SET_TRANS', data.data)
                    commit('SET_LINKS', data.links)
                    commit('SET_META', data.meta)


                    axios.get(`${url}/total/${id}`)
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
                    axios.get(`${url}/total/${payload.acct_id}`)
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