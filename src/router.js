import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Account from "./views/Account.vue";
import Transactions from './views/Transactions.vue';
import Wallet from './views/Wallet.vue';
import Expenses from './views/Expenses.vue';
import New from './views/New'
import Edit from './views/Edit'
import NewAccount from './views/NewAccount'
import EditAccount from './views/EditAccount'
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
        layout: "user",
        requiresAuth: true
      },
      component: Home
    },
    {
      path: '/wallet',
      name: "wallet",
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: Wallet
    },
    {
      path: '/account',
      name: "account",
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: Account
    },
    {
      path: '/transactions/:id',
      name: "transactions",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: Transactions
    },
    {
      path: '/expenses',
      name: "expenses",
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: Expenses
    },

    {
      path: '/new/:id',
      name: "new",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: New
    },
    {
      path: '/new',
      name: "new_account",
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: NewAccount
    },
    {
      path: '/edit/:acct/:id',
      name: "edit",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: Edit
    },
    {
      path: '/edit/:id',
      name: "edit_account",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true
      },
      component: EditAccount
    },

    {
      path: '/auth',
      name: "auth",
      meta: {
        layout: "no-user",
        requiresVisitor: true

      },
      component: Auth
    },

    {
      path: "/about",
      name: "about",
      meta: {
        layout: "user",
        requiresAuth: true

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
        layout: "user",
        requiresAuth: true
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
        layout: "user",
        requiresAuth: true

      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Help.vue")
    }
  ]
});
