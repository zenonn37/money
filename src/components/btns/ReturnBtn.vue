<template>
  <div class="back cursors">
    <i :class="[back]" @click="goBack()"></i>
  </div>
</template>

<script>
export default {
  props: ["back"],

  methods: {
    goBack() {
      this.$emit("nav");
    }
  }
};
</script>
