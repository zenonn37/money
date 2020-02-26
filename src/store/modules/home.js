import axios from "axios";

const state = {
  report: null,
  month: [],
  bar: [],
  pie: []
};

const mutations = {
  set_reports(state, payload) {
    state.report = payload;
  },
  set_bar(state, payload) {
    state.bar = payload;
  },
  set_pie(state, payload) {
    state.pie = payload;
  },
  month_report(state, payload) {
    state.month = payload;
  }
};

const getters = {
  get_month_report(state) {
    return state.month;
  },
  get_reports(state) {
    return state.report;
  }
};

const actions = {
  monthReport({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("month")
        .then(res => {
          resolve(res);
          commit("month_report", res.data);
        })
        .catch(err => {
          reject(err);
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },
  get_reports({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      axios
        .get("worth")
        .then(res => {
          dispatch("monthReport");
          resolve(res);
          const data = {
            transactions: res.data.transactions,
            deposits: res.data.deposits,
            spent: res.data.spent,
            count: res.data.count,
            all: res.data.all,
            avg: res.data.avg
          };
          commit("set_reports", data);
        })
        .catch(err => {
          reject(err);
          commit("base/set_errors", err.response.data.message, { root: true });
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
