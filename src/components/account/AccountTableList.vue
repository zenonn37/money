<template>
  <tr>
    <td v-if="accounts.type === 'Checking'">
      <img src="@/assets/svg/finance.svg" alt="checking icon" />
    </td>
    <td v-else-if="accounts.type === 'Savings'">
      <img src="@/assets/svg/dollar.svg" alt="checking icon" />
    </td>
    <td v-else-if="accounts.type === 'Credit Card'">
      <img src="@/assets/svg/credit.svg" alt="checking icon" />
    </td>
    <td v-else-if="accounts.type === 'Google'">
      <img src="@/assets/svg/google.svg" alt="checking icon" />
    </td>
    <td v-else-if="accounts.type === 'Apple'">
      <img src="@/assets/svg/apple.svg" alt="checking icon" />
    </td>
    <td v-else-if="accounts.type === 'PayPal'">
      <img src="@/assets/svg/paypal.svg" alt="checking icon" />
    </td>

    <td>{{accounts.type}}</td>
    <td>{{accounts.name}}</td>
    <td>Active</td>
    <td>${{accounts.balance}}</td>
    <td>icon</td>
  </tr>
</template>

<script>
export default {
  props: ["accounts"]
};
</script>

<style lang="scss" scoped>
</style>