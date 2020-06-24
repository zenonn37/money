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
            <img src="@/assets/svg/new.svg" alt="new expense button" />
          </li>
        </ul>
      </div>
      <table>
        <thead>
          <th>Name</th>

          <th>Category</th>
          <th>Amount</th>
          <th>Due</th>
          <th>Paid</th>
        </thead>
        <tbody>
          <ExpenseTableList :expense="expense" v-for="expense in expenses" :key="expense.id" />
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import ExpenseTableList from "@/components/expense/ExpenseTableList";
import Loader from "@/components/Loader";
export default {
  name: "ExpenseTable",
  components: {
    ExpenseTableList,
    Loader
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    expenses() {
      return this.$store.getters["expense/get_expenses"];
    }
  },
  methods: {
    onNew() {
      this.$router.push({ name: "expense.new" });
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("expense/get_expenses").then(() => {
      this.loading = false;
    });
  }
};
</script>
