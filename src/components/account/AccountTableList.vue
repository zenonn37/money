<template>
  <tr>
    <td v-if="accounts.type === 'Checking'">
      <img src="@/assets/svg/finance.svg" alt="checking icon" />
    </td>
    <td v-else-if="accounts.type === 'Savings'">
      <img src="@/assets/svg/dollar.svg" alt="savings icon" />
    </td>
    <td v-else-if="accounts.type === 'Credit Card'">
      <img src="@/assets/svg/credit.svg" alt="credit icon" />
    </td>
    <td v-else-if="accounts.type === 'Google'">
      <img src="@/assets/svg/google.svg" alt="google icon" />
    </td>
    <td v-else-if="accounts.type === 'Apple'">
      <img src="@/assets/svg/apple.svg" alt="apple icon" />
    </td>
    <td v-else-if="accounts.type === 'PayPal'">
      <img src="@/assets/svg/paypal.svg" alt="paypal icon" />
    </td>

    <td>{{ accounts.type }}</td>

    <!-- <router-link :to="{ name: 'Bank' }" tag="td">{{
      accounts.name
    }}</router-link>-->

    <router-link
      tag="td"
      class="cursors"
      :to="{ name: 'accounts.analytics', params: { account: accounts.id } }"
    >{{ accounts.name }}</router-link>

    <td>Active</td>
    <td>${{ accounts.balance }}</td>
    <td>
      <img src="@/assets/svg/toggle.svg" alt="toggle icon" />
    </td>
  </tr>
</template>

<script>
export default {
  props: ["accounts"]
};
</script>

<style lang="scss" scoped></style>
