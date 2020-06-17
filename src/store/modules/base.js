const state = {
  errors: null,
  nav: true,
  auth: false,
  total: 0,
};

const mutations = {
  set_errors(state, err) {
    state.errors = err;
  },
  set_nav(state) {
    state.nav = !state.nav;
  },
  toggle_auth(state) {
    state.auth = !state.auth;
  },
  set_auth(state, bool) {
    state.auth = bool;
  },
  set_total(state, total) {
    state.total = total;
  },
};

const getters = {
  get_errors(state) {
    return state.errors;
  },
  get_nav(state) {
    return state.nav;
  },
  get_auth(state) {
    return state.auth;
  },
  get_total(state) {
    return state.total;
  },
};

const actions = {
  set_total({ commit }) {
    commit("set_total");
  },
  set_aside({ commit }) {
    commit("set_nav");
  },
  toggle_auth({ commit }) {
    commit("toggle_auth");
  },
  set_auth_login({ commit }) {
    commit("set_auth", false);
  },
  set_auth_register({ commit }) {
    commit("set_auth", true);
  },
  clear_errors({ commit }) {
    commit("set_errors", null);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
