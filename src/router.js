import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

import Account from "@/views/accounts/Account.vue";
import Accounts from "@/views/accounts/Accounts.vue";
import Analytics from "@/views/accounts/Analytics.vue";
import Budget from "@/views/accounts/Budgets.vue";

import Transactions from "@/views/accounts/Transactions.vue";
import TransactionsTable from "@/views/accounts/transactions/TransactionsTable.vue";
import Users from "@/views/users/Users.vue";
import Info from "@/views/users/Info.vue";
import Expenses from "@/views/expense/Expenses.vue";
import NewExpense from "@/views/expense/NewExpense.vue";
import EditExpense from "@/views/expense/EditExpense.vue";
import DetailExpense from "@/views/expense/DetailExpense.vue";
import ExpenseTable from "@/views/expense/ExpenseTable.vue";
import New from "@/views/accounts/New";
import Edit from "@/views/Edit";
import NewAccount from "@/views/accounts/NewAccount";
import EditAccount from "@/views/accounts/EditAccount";
import Cover from "@/views/Cover";
//import Settings from "./views/Settings.vue";
//import Help from "./views/Help.vue";

//import About from "./views/About.vue";
import Auth from "@/views/Auth.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "cover",
      meta: {
        layout: "no-user",
        requiresVisitor: true,
      },
      component: Cover,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: Home,
    },
    {
      path: "/user",
      name: "Users",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: Users,
      children: [
        {
          path: "",
          name: "Info",
          meta: {
            layout: "user",
            requiresAuth: true,
          },
          component: Info,
        },
      ],
    },
    {
      path: "/account",
      name: "accounts",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: Account,
    },

    {
      path: "/accounts/:account",
      name: "account",
      component: Accounts,
      props: true,
      children: [
        {
          path: "",
          component: Analytics,

          name: "accounts.analytics",
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
        {
          path: "transactions",
          component: Transactions,
          name: "accounts.transactions",
          meta: {
            layout: "user",
            requiresAuth: true,
          },
          children: [
            {
              path: "",
              component: TransactionsTable,
              name: "trans.transactions",
              props: true,
              meta: {
                layout: "user",
                requiresAuth: true,
              },
            },
            {
              path: "new",
              component: New,
              name: "trans.new",
              meta: {
                layout: "user",
                requiresAuth: true,
              },
            },
            {
              path: "edit/:id",
              component: Edit,
              name: "trans.edit",
              props: true,
              meta: {
                layout: "user",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "budget",
          component: Budget,
          name: "accounts.budgets",
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
        {
          path: "edit",
          component: EditAccount,
          name: "accounts.edit",
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
      ],
      meta: {
        layout: "user",
        requiresAuth: true,
      },
    },
    {
      path: "/transactions/:id",
      name: "transactions",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: Transactions,
    },
    {
      path: "/expenses",
      name: "expenses",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: Expenses,
      children: [
        {
          path: "",
          name: "expense.table",
          component: ExpenseTable,
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
        {
          path: "new",
          name: "expense.new",
          component: NewExpense,
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
        {
          path: "edit/:id",
          name: "expense.edit",
          component: EditExpense,
          props: true,
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
        {
          path: "detail/:id",
          name: "expense.detail",
          component: DetailExpense,
          meta: {
            layout: "user",
            requiresAuth: true,
          },
        },
      ],
    },

    // {
    //   path: "/new/:id",
    //   name: "new",
    //   props: true,
    //   meta: {
    //     layout: "user",
    //     requiresAuth: true,
    //   },
    //   component: New,
    // },
    {
      path: "/new",
      name: "new_account",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: NewAccount,
    },
    {
      path: "/edit/:acct/:id",
      name: "edit",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: Edit,
    },
    {
      path: "/edit/:id",
      name: "edit_account",
      props: true,
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      component: EditAccount,
    },

    {
      path: "/auth",
      name: "auth",
      meta: {
        layout: "no-user",
        requiresVisitor: true,
      },
      component: Auth,
    },

    {
      path: "/about",
      name: "about",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue"),
    },
    {
      path: "/help",
      name: "help",
      meta: {
        layout: "user",
        requiresAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Help.vue"),
    },
  ],
});
