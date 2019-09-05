import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Account from "./views/Account.vue";
import Transactions from './views/Transactions.vue';
import Wallet from './views/Wallet.vue';
import Expenses from './views/Expenses.vue';
import Settings from './views/Settings.vue';
import Help from './views/Help.vue';
import Auth from './views/Auth.vue';
import About from './views/About.vue';



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/wallet',
      name: "wallet",
      component: Wallet
    },
    {
      path: '/account',
      name: "account",
      component: Account
    },
    {
      path: '/transactions',
      name: "transactions",
      component: Transactions
    },
    {
      path: '/expenses',
      name: "expenses",
      component: Expenses
    },
    {
      path: '/auth',
      name: "auth",
      component: Auth
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue")
    },
    {
      path: "/help",
      name: "help",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Help.vue")
    }
  ]
});
