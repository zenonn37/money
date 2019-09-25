<template>
  <div>
    <PageHeaders title="Transactions" menu1="Today" menu2="This Week" menu3="This Month" />
    <ListTable name="Name" :data="trans" :type="type" />
  </div>
</template>

<script>
import axios from "axios";
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
export default {
  name: "Transactions",

  data() {
    return {
      trans: [],
      type: false
    };
  },
  components: {
    ListTable,
    PageHeaders
  },

  created() {
    axios
      .get(`http://apps.test/api/transactions/${this.$route.params.id}`)
      .then(res => {
        console.log(res.data);
        this.trans = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

