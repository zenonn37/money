<template>
  <div>
    <div class="bank">
      <div class="page-title">
        <h1>{{ account.name }}</h1>
      </div>

      <ul class="page-nav">
        <router-link
          :to="{ name: 'accounts.transactions' }"
          tag="li"
          class="page-items"
        >
          transactions
        </router-link>
        <router-link
          :to="{ name: 'accounts.budgets' }"
          tag="li"
          class="page-items"
        >
          budgets
        </router-link>
        <router-link
          :to="{ name: 'accounts.edit' }"
          tag="li"
          class="page-items"
        >
          edit
        </router-link>
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "Accounts",

  computed: {
    account() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["account/GET_ACCOUNT"](id);
    },
  },
};
</script>
