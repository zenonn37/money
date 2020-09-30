import axios from "axios";

const state = {
  accounts: []
};

const mutations = {
  SET_ACCOUNT(state, acct) {
    state.accounts = acct;
  },
  NEW_ACCOUNT(state, acct) {
    state.accounts.push(acct);
  },
  DELETE_ACCOUNT(state, id) {
    //const ids = parseInt(id);

    const newArray = state.accounts.filter(account => account.id !== id);
    state.accounts = newArray;
  },
  clear_accounts(state) {
    state.accounts = [];
  }
};

const getters = {
  GET_ACCOUNTS(state) {
    return state.accounts;
  },
  GET_ACCOUNT: state => id => {
    return state.accounts.find(acct => acct.id === id);
  }
};

const actions = {
  //get all accounts
  ALL_ACCOUNTS({ commit }) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');

    return new Promise((resolve, reject) => {
      axios
        .get("accounts")
        .then(res => {
          commit("SET_ACCOUNT", res.data.data.accounts);
          commit("base/set_total", res.data.data.total, { root: true });
          resolve(res);
        })
        .catch(err => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  NEW_ACCOUNTS({ commit, dispatch }, payload) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');

    return new Promise((resolve, reject) => {
      axios
        .post("accounts", {
          name: payload.name,
          balance: payload.balance,
          type: payload.type,
          date: payload.date.slice(0, 19).replace("T", " ")
        })
        .then(res => {
          commit("NEW_ACCOUNT", res.data);
          console.log(res.data.data.id);

          const trans = {
            name: payload.name,
            amount: payload.balance,
            type: "Deposit",
            category: "Income",
            date: payload.date,
            acct_id: res.data.data.id,
            account: true
          };
          dispatch("transactions/NEW_TRANSACTION", trans, { root: true });

          resolve(res);
        })
        .catch(err => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  UPDATE_ACCOUNT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`accounts/${payload.id}`, {
          name: payload.name,
          type: payload.type,
          date: payload.date.slice(0, 19).replace("T", " ")
        })
        .then(res => {
          commit("NEW_ACCOUNT", res.data);
          resolve(res);
        })
        .catch(err => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  DELETE_ACCOUNT({ commit }, id) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');

    return new Promise((resolve, reject) => {
      axios
        .delete(`accounts/${id}`)
        .then(res => {
          commit("DELETE_ACCOUNT", id);
          resolve(res);
        })
        .catch(err => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
