import axios from "axios";

const state = {
  report: "",
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
          commit("month_report", res.data);
          resolve(res);
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
          let all = res.data;
          let data = {
            transactions: all.amount,
            deposits: all.deposits,
            spent: all.net,
            count: all.count,
            avg: all.average,
            daily: all.daily
          };

          commit("set_reports", data);
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
