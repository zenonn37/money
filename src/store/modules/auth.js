import axios from "axios";
axios.defaults.baseURL = `${process.env.VUE_APP_API}`;

const state = {
  token: localStorage.getItem("access_token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null
};
const mutations = {
  SET_AUTH(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOGGED(state) {
    state.isLogged;
  }
};

const getters = {
  GET_AUTH(state) {
    return state.token;
  },
  GET_USER(state) {
    return state.user;
  },
  isLogged(state) {
    return state.token !== null ? true : false;
  }
};

const actions = {
  //Register
  REGISTER({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("new", data)
        .then(res => {
          // console.log(res);
          // const result = res.data;
          // console.log(result);
          commit("base/set_errors", null, { root: true });

          resolve(res);
        })
        .catch(err => {
          // console.log(err);
          // console.log(err.response.data.errors.email[0]);
          const error =
            err.response.data.errors.email[0] +
            " Please try a another email address.";

          commit("base/set_errors", error, { root: true });
          reject(err);
        });
    });
  },

  //LOGIN
  LOGIN({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("login", data)
        // this.$http.post('/login', data)
        .then(res => {
          // console.log(res);
          const result = res.data.access_token;
          //  console.log(result);

          commit("SET_AUTH", result);
          localStorage.setItem("access_token", result);
          commit("base/set_errors", null, { root: true });
          resolve(res);
        })
        .catch(err => {
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  LOGOUT({ commit }) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + state.token;
    return new Promise((resolve, reject) => {
      axios
        .post("logout")
        .then(() => {
          commit("SET_USER", null);
          commit("SET_AUTH", null);
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          commit("account/clear_accounts", { root: true });
          commit("transactions/SET_TRANS", [], { root: true });
          commit("transactions/SET_TOTAL", [], { root: true });
          commit("base/set_errors", null, { root: true });

          resolve();
        })
        .catch(err => {
          // console.log(err);
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  },
  clearUser({ commit }) {
    commit("SET_USER", null);
    commit("SET_AUTH", null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    commit("account/clear_accounts", { root: true });
    commit("transactions/SET_TRANS", [], { root: true });
    commit("transactions/SET_TOTAL", [], { root: true });
    commit("base/set_errors", null, { root: true });
  },
  USER({ commit, dispatch }) {
    // axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + state.token;
    return new Promise((resolve, reject) => {
      axios
        .get("user")
        .then(res => {
          // console.log(res);

          const result = res.data.data;
          console.log(result);

          commit("SET_USER", result);
          localStorage.setItem("user", JSON.stringify(result));
          resolve(res);
        })
        .catch(err => {
          dispatch("clearUser");
          commit("base/set_errors", err.response.data.message, { root: true });
          reject(err);
        });
    });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
