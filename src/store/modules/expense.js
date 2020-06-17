import Axios from "axios";

const state = {
  expenses: [],
  total: 0,
};

const mutations = {
  set_expense(state, exp) {
    state.expenses = exp;
  },
  new_expense(state, exp) {
    state.expenses.push(exp);
  },

  delete_exp(state, id) {
    // console.log(id);
    const newExp = state.expenses.filter((exp) => exp.id !== id);
    state.expenses = newExp;
  },
  set_total(state, total) {
    state.total = total;
  },
};

const getters = {
  get_expenses(state) {
    return state.expenses;
  },
  get_expense: (state) => (id) => {
    return state.expenses.find((exp) => exp.id === id);
  },
  get_total(state) {
    return state.total;
  },
};

const actions = {
  get_expenses({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get("expenses")
        .then((res) => {
          commit("set_expenses", res.data);
          resolve(res);
        })
        .catch((err) => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  new_expense({ commit, dispatch }, payload) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      Axios.post(`expense`, {
        name: payload.name,
        repeat: payload.repeat,
        category: payload.category,
        amount: parseFloat(payload.amount),

        due: payload.date.slice(0, 19).replace("T", " "),
      })
        .then((res) => {
          commit("new_expense", res.data);

          dispatch("total");
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
  delete_expense({ commit, dispatch }, payload) {
    //MAKE DRY!
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      // console.log(payload.acct_id);

      Axios.delete(`expenses/${payload.id}`)
        .then((res) => {
          commit("delete_expense", payload.id);

          dispatch("total", payload.id);

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

  total({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get(`expense_total`)
        .then((res) => {
          resolve(res);

          commit("base/set_total", res.data, { root: true });
        })
        .catch((err) => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
      //  resolve(res)
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
