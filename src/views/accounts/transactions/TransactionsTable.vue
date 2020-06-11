<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>
    <template v-else>
      <div class="transaction-header">
        <ul>
          <li>Range</li>
          <li>Search</li>
          <li>Category</li>
          <li @click="onNew()">
            <img src="@/assets/svg/new.svg" alt="new transaction button" />
          </li>
        </ul>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableList
            @delete="remove"
            @edit="edit"
            :transaction="transaction"
            v-for="transaction in transactions"
            :key="transaction.id"
          />
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import TableList from "@/components/transactions/TableList";
import Loader from "@/components/Loader";
export default {
  name: "TransactionTable",
  props: ["account"],
  components: {
    TableList,
    Loader
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    transactions() {
      return this.$store.getters["transactions/GET_TRANSACTIONS"];
    }
  },

  methods: {
    onNew() {
      this.$router.push({ name: "trans.new" });
    },
    remove(trans) {
      const payload = {
        id: trans,
        acct_id: this.account
      };
      this.$store.dispatch("transactions/DELETE_TRANSACTION", payload);
    },
    edit(id) {
      // this.$router.push({ name: "trans.edit", params: { id: id } });
      this.$router.push(`edit/${id}`);
    }
  },

  created() {
    this.loading = true;
    this.$store
      .dispatch("transactions/ACCOUNT_TRANSACTIONS", this.account)
      .then(() => {
        this.$toast.open({
          message: "Transaction data loaded",
          type: "info",
          position: "top"
        });
        this.loading = false;
      })
      .catch(() => {
        this.$toast.open({
          message: "Connection Error please refresh the page",
          type: "error",
          position: "top"
        });
      });
    //
  }
};
</script>
