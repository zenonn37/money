<template>
  <div>
    <PageHeaders title="My Accounts" menu1="Financial Institutions" menu2="Budgets" menu3 />
    <ListTable name="Bank" :data="acct" :type="type" />
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
      type: true
    };
  },
  created() {
    axios
      .get("http://apps.test/api/accounts")
      .then(res => {
        console.log(res.data);
        this.acct = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

