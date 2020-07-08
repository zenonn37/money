import axios from "axios";

import _ from "lodash";

const state = {
  trans: [],
  links: "",
  meta: "",
  total: "",
  order: true,
  net: "",
};

const mutations = {
  SET_TRANS(state, trans) {
    state.trans = trans;
  },
  NEW_TRANS(state, trans) {
    state.trans.push(trans);
  },
  set_net(state, net) {
    state.net = net;
  },

  DELETE_TRANS(state, id) {
    // console.log(id);
    const newTrans = state.trans.filter((tran) => tran.id !== id);
    state.trans = newTrans;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_LINKS(state, links) {
    state.links = links;
  },
  SET_META(state, meta) {
    state.meta = meta;
  },
  sortDate(state) {
    if (!state.order) {
      state.trans = _.sortBy(state.trans, [
        function(value) {
          // console.log('called ASC ');

          return new Date(value.date);
        },
      ]);
      // console.log(state.trans);
    } else {
      state.trans = _.sortBy(state.trans, [
        function(value) {
          // console.log('called DESC ');
          return new Date(value.date) * -1;
        },
      ]);
      //console.log(state.trans);
    }
  },
  sortAmount(state) {
    if (state.order) {
      state.trans = _.sortBy(state.trans, [
        function(value) {
          return value.amount;
        },
      ]);
    } else {
      state.trans = _.sortBy(state.trans, [
        function(value) {
          return value.amount * -1;
        },
      ]);
    }
  },
};

const getters = {
  GET_TRANSACTIONS(state) {
    return state.trans;
  },
  GET_TRANSACTION: (state) => (id) => {
    return state.trans.find((tran) => tran.id === id);
  },

  GET_LINKS(state) {
    return state.links;
  },
  GET_META(state) {
    return state.meta;
  },
  GET_TOTAL(state) {
    return state.total;
  },
};

const actions = {
  sortAmounts({ commit }) {
    state.order = !state.order;

    //console.log(state.order);
    commit("sortAmount");
  },
  sortDate({ commit }) {
    state.order = !state.order;

    //console.log(state.order);
    commit("sortDate");
  },

  filter_category({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`category/${payload.term}/${payload.id}`)
        .then((res) => {
          commit("SET_TRANS", res.data.data);
          resolve(res);
        })
        .catch((err) => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  range({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`range/${payload.id}`, {
          date: payload.date.slice(0, 19).replace("T", " "),
          date2: payload.date2.slice(0, 19).replace("T", " "),
        })
        .then((res) => {
          commit("SET_TRANS", res.data.data);
          commit("SET_LINKS", res.data.links);
          commit("SET_META", res.data.meta);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },

  find_day({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`day/${payload.id}`, {
          date: payload.date.slice(0, 19).replace("T", " "),
        })
        .then((res) => {
          commit("SET_TRANS", res.data.data);
          commit("SET_LINKS", res.data.links);
          commit("SET_META", res.data.meta);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },
  PAGE_TRANSACTIONS({ commit }, data) {
    // console.log(data);

    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      axios
        .get(`transactions/${data.id}?page=${data.page}`)
        // axios.get(`${url}/transactions/${id}?page=${page}`)
        .then((res) => {
          const data = res.data;
          commit("SET_TRANS", data.data);

          resolve(res);
        })
        .catch((err) => {
          //handle errors!!
          commit("base/set_errors", err.response.data.message, { root: true });

          reject(err);
        });
    });
  },

  ACCOUNT_TRANSACTIONS({ commit }, id) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      axios
        .get(`transactions/${id}`)
        .then((res) => {
          const data = res.data;
          commit("SET_TRANS", data.data);
          commit("SET_LINKS", data.links);
          commit("SET_META", data.meta);

          //dispatch('total', id)
          axios
            .post(`total/${id}`)
            .then((res) => {
              resolve(res);
              commit("SET_TOTAL", res.data);
            })
            .catch((err) => {
              commit("base/set_errors", err.response.data.message, {
                root: true,
              });
            });
        })
        .catch((err) => {
          //handle errors!!
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },

  account_transaction({ commit, getters }, payload) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      //console.log(payload + "transaction type account transaction");

      axios
        .post(`transactions`, {
          name: payload.name,
          type: payload.type,
          amount: parseFloat(payload.amount),
          date: payload.date.slice(0, 19).replace("T", " "),
          acct_id: payload.acct_id,
        })
        .then((res) => {
          // console.log('called');

          commit("NEW_TRANS", res.data);
          const bal = getters.GET_TOTAL;
          axios
            .post(`total/${payload.acct_id}`, {
              balance: bal,
            })
            .then((res) => {
              resolve(res);
              commit("SET_TOTAL", res.data);
            })
            .catch((err) => {
              commit("base/set_errors", err.response.data.message, {
                root: true,
              });
            });
          //  resolve(res)
        })
        .catch((err) => {
          //handle errors!!
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  total({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`total/${id}`)
        .then((res) => {
          resolve(res);

          commit("set_total", res.data, { root: true });
        })
        .catch((err) => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
      //  resolve(res)
    });
  },
  NEW_TRANSACTION({ commit, dispatch }, payload) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      axios
        .post(`transactions`, {
          name: payload.name,
          type: payload.type,
          category: payload.category,
          amount: parseFloat(payload.amount),
          date: payload.date.slice(0, 19).replace("T", " "),
          acct_id: payload.acct_id,
        })
        .then((res) => {
          commit("NEW_TRANS", res.data);

          dispatch("total", payload.acct_id);
          // dispatch('home/monthReport', { root: true })
          // dispatch('transactions/NEW_TRANSACTION', trans, { root: true })

          resolve(res);
        })
        .catch((err) => {
          //handle errors!!
          commit("base/set_errors", err.response.data.message, { root: true });

          reject(err);
        });
    });
  },
  UPDATE_TRANSACTION({ commit, dispatch }, payload) {
    //MAKE DRY!
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      axios
        .patch(`transactions/${payload.id}`, {
          name: payload.name,
          type: payload.type,
          amount: payload.amount,
          category: payload.category,
          date: payload.date.slice(0, 19).replace("T", " "),
        })
        .then((res) => {
          commit("NEW_TRANS", res.data);

          dispatch("total", payload.acct_id);
          resolve(res);
        })
        .catch((err) => {
          //handle errors!!
          commit("base/set_errors", err.response.data.message, { root: true });

          reject(err);
        });
    });
  },
  DELETE_TRANSACTION({ commit, dispatch }, payload) {
    //MAKE DRY!
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      // console.log(payload.acct_id);

      axios
        .delete(`transactions/${payload.id}`)
        .then((res) => {
          commit("DELETE_TRANS", payload.id);

          dispatch("total", payload.acct_id);

          //
          // console.log(bal);
          // //const bal = getters.GET_TOTAL;
          // console.log(bal);

          resolve(res);
        })
        .catch((err) => {
          //handle errors!!
          commit("base/set_errors", err.response.data.message, { root: true });

          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
