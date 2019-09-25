import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Account from "./views/Account.vue";
import Transactions from './views/Transactions.vue';
import Wallet from './views/Wallet.vue';
import Expenses from './views/Expenses.vue';
import Settings from './views/Settings.vue';
import Help from './views/Help.vue';

import About from './views/About.vue';
import Auth from "./views/Auth.vue";



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        layout: "user"
      },
      component: Home
    },
    {
      path: '/wallet',
      name: "wallet",
      meta: {
        layout: "user"
      },
      component: Wallet
    },
    {
      path: '/account',
      name: "account",
      meta: {
        layout: "user"
      },
      component: Account
    },
    {
      path: '/transactions/:id',
      name: "transactions",
      meta: {
        layout: "user"
      },
      component: Transactions
    },
    {
      path: '/expenses',
      name: "expenses",
      meta: {
        layout: "user"
      },
      component: Expenses
    },
    {
      path: '/auth',
      name: "auth",
      meta: {
        layout: "no-user"
      },
      component: Auth
    },

    {
      path: "/about",
      name: "about",
      meta: {
        layout: "user"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/settings",
      name: "settings",
      meta: {
        layout: "user"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue")
    },
    {
      path: "/help",
      name: "help",
      meta: {
        layout: "user"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Help.vue")
    }
  ]
});
