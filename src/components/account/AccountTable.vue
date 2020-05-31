<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Type</th>
        <th>Account Name</th>
        <th>Status</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      <AccountTableList :accounts="account" v-for="account in accounts" :key="account.id" />
    </tbody>
  </table>
</template>

<script>
import AccountTableList from "@/components/account/AccountTableList";
export default {
  props: ["accounts"],
  components: {
    AccountTableList
  }
};
</script>

