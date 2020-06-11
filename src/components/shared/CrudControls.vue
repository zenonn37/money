<template>
  <td>
    <span class="cursors" @click="onDelete(id)">
      <img src="@/assets/svg/delete.svg" alt="icon delete" />
    </span>
    <span class="cursors" @click="onEdit(id)">
      <img src="@/assets/svg/edit.svg" alt="icon edit" />
    </span>
  </td>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    onDelete(id) {
      this.$emit("remove", id);
    },
    onEdit(id) {
      this.$emit("edit", id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>