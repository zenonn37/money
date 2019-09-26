<template>
  <div>
    <PageHeaders title="My Accounts" menu1="Financial Institutions" menu2="Budgets" menu3 />

    <template v-if="loading">
      <div>...loading</div>
    </template>

    <template v-else>
      <ListTable name="Bank" :data="accounts" :type="type" />
    </template>
  </div>
</template>

<script>
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";

import axios from "axios";
export default {
  name: "Account",
  components: {
    ListTable,
    PageHeaders
  },
  data() {
    return {
      acct: [],
      type: true,
      loading: false
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.GET_ACCOUNTS;
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("ALL_ACCOUNTS").then(() => {
      this.loading = false;
    });
    // axios
    //   .get("http://apps.test/api/accounts")
    //   .then(res => {
    //     console.log(res.data);
    //     this.acct = res.data;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
};
</script>

