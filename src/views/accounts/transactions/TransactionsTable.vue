<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>

    <table v-else>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Type</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <TableList
          :transaction="transaction"
          v-for="transaction in transactions"
          :key="transaction.id"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableList from "@/components/transactions/TableList";
import Loader from "@/components/Loader";
export default {
  name: "TransactionTable",
  components: {
    TableList,
    Loader,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    transactions() {
      return this.$store.getters["transactions/GET_TRANSACTIONS"];
    },
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("transactions/ACCOUNT_TRANSACTIONS", this.$route.params.id)
      .then(() => {
        this.$toast.open({
          message: "Transaction data loaded",
          type: "info",
          position: "top",
        });
        this.loading = false;
      })
      .catch(() => {
        this.$toast.open({
          message: "Connection Error please refresh the page",
          type: "error",
          position: "top",
        });
      });
    //
  },
};
</script>
