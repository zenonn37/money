import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import account from './modules/account';
import transactions from './modules/transactions'
import base from './modules/base'

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,

  modules: {
    auth,
    account,
    transactions,
    base



  }
});
