<template>
  <div>
    <div class="bank">
      <div class="page-title">
        <div @click="goBack()">
        <i  class="fad fa-chevron-left"></i>
        </div>
        <!-- <i @click="goBack()" class="fas fa-chevron-left cursors"></i> -->
        <h1 v-if="accounts">
          {{ accounts.name }}
        </h1>
        <router-link
          :to="{ name: 'accounts.edit' }"
          tag="div"
          class="page-items"
        >
          <i class="fal fa-edit"></i>
        </router-link>
      </div>

      <ul class="page-nav" v-if="accounts">
        <router-link
          :to="{ name: 'accounts.analytics' }"
          tag="li"
          class="page-items"
          >Analytics</router-link
        >
        <router-link
          :to="{ name: 'trans.transactions', params: { account: accounts.id } }"
          tag="li"
          class="page-items"
          >Transactions</router-link
        >
        <!-- <router-link :to="{ name: 'accounts.budgets' }" tag="li" class="page-items">Budgets</router-link> -->
        <router-link :to="{ name: 'accounts.edit' }" tag="li" class="page-items"
          >Edit</router-link
        >
      </ul>

      <ul class="mobile" v-if="accounts">
        <router-link
          :to="{ name: 'accounts.analytics' }"
          tag="li"
          class="page-items"
        >
          <i class="fal fa-analytics"></i>
        </router-link>
        <router-link
          :to="{ name: 'trans.transactions', params: { account: accounts.id } }"
          tag="li"
          class="page-items"
        >
          <i class="fal fa-money-bill-wave-alt"></i>
        </router-link>
        <li class="cal-btn">
          <i class="fal fa-calendar-alt"></i>
        </li>

        <!-- <router-link :to="{ name: 'accounts.budgets' }" tag="li" class="page-items">Budgets</router-link> -->
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
import { prevRoutes } from "@/mixins/prevRoute.js";

export default {
  name: "Accounts",
  mixins: [prevRoutes],
  props: {
    account: {
      required: true
    }
  },
  components: {},
  data() {
    return {};
  },

  computed: {
    accounts() {
      if (this.account === undefined) {
        return this.$store.getters["account/GET_ACCOUNT"](
          parseInt(this.$route.params.id)
        );
      } else {
        const id = parseInt(this.account);
        return this.$store.getters["account/GET_ACCOUNT"](id);
      }
    }
  },
  methods: {},

  created() {
    if (this.accounts === undefined || this.accounts === null) {
      //change to new dispatch single account!
      this.$store.dispatch("account/ALL_ACCOUNTS").then(() => {
        //no action needed at this time possible reload warning to user
      });
    }
  }
};
</script>
