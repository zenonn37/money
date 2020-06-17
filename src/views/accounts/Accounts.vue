<template>
  <div>
    <div class="bank">
      <div class="page-title">
        <h1>{{ accounts.name }}</h1>
      </div>

      <ul class="page-nav">
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
        <router-link
          :to="{ name: 'accounts.budgets' }"
          tag="li"
          class="page-items"
          >Budgets</router-link
        >
        <router-link :to="{ name: 'accounts.edit' }" tag="li" class="page-items"
          >Edit</router-link
        >
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "Accounts",
  props: {
    account: {
      required: true
    }
  },

  computed: {
    accounts() {
      const id = parseInt(this.account);
      return this.$store.getters["account/GET_ACCOUNT"](id);
    }
  }
};
</script>
