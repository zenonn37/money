<template>
  <tr>
    <td>icon</td>
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