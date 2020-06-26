<template>
  <tr>
    <td>{{ expense.name }}</td>

    <td>{{ expense.category }}</td>
    <td>{{ expense.amount | currency }}</td>
    <td>{{ expense.date | day }}</td>
    <td>{{ expense.paid ? "YES" : "NO" }}</td>
    <CrudControls :id="expense.id" @remove="onDelete" @edit="onEdit" />
  </tr>
</template>

<script>
import CrudControls from "@/components/shared/CrudControls";
export default {
  name: "ExpenseList",
  data() {
    return {};
  },
  props: ["expense"],
  components: {
    CrudControls
  },
  methods: {
    onDelete(id) {
      this.$store.dispatch("expense/delete_expense", id);
    },
    onEdit(id) {
      this.$router.push({ name: "expense.edit", params: { id: id } });
    }
  }
};
</script>
