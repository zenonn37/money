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
          <th>Repeated</th>
        </thead>
        <tbody>
          <ExpenseTableList />
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import ExpenseTableList from "@/components/expense/ExpenseTableList";
import Loader from "@/components/Loader";
export default {
  components: {
    ExpenseTableList,
    Loader
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    onNew() {
      this.$router.push({ name: "expense.new" });
    }
  }
};
</script>
