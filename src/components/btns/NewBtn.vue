<template>
  <div @click="onNew()" class="new-btn">
    <i :class="[icon]"></i>
  </div>
</template>

<script>
export default {
  name: "New",
  props: ["icon"],
  methods: {
    onNew() {
      this.$emit("new");
    }
  }
};
</script>

