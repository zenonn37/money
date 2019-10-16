import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import account from './modules/account';
import transactions from './modules/transactions'

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,

  modules: {
    auth,
    account,



    transactions



  }
});
