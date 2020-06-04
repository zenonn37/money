<template>
  <tr>
    <td>
      {{ transaction.category }}
    </td>
    <td>{{ transaction.name }}</td>
    <td>{{ transaction.type }}</td>
    <td>{{ transaction.date }}</td>
    <td>{{ transaction.amount }}</td>
  </tr>
</template>

<script>
export default {
  name: "TransactionList",
  props: ["transaction"],
};
</script>
