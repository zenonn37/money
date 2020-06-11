<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div>Tools</div>
      <table>
        <thead>
          <th>Name</th>
          <th>Type</th>
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
export default {
  components: {
    ExpenseTableList
  }
};
</script>

