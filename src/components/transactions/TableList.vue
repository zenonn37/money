<template>
  <tr>
    <td>{{ transaction.name }}</td>
    <td>{{ transaction.type }}</td>
    <td>{{ transaction.date }}</td>
    <td>{{ transaction.category }}</td>
    <td>{{ transaction.amount }}</td>
    <td>
      <span class="cursors" @click="onDelete(transaction.id)">
        <img src="@/assets/svg/delete.svg" alt="icon delete" />
      </span>
      <span class="cursors" @click="onEdit(transaction.id)">
        <img src="@/assets/svg/edit.svg" alt="icon edit" />
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TransactionList",
  props: ["transaction"],

  methods: {
    onDelete(id) {
      this.$emit("delete", id);
    },
    onEdit(id) {
      this.$emit("edit", id);
    }
  }
};
</script>
