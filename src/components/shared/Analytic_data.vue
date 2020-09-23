<template>
  <div :class="basic.style">
    <div :class="basic.background">
      <img :src="`/images/${basic.icon}.svg`" :alt="basic.title" />
    </div>
    <div class="analytic-title">
      <span>{{ basic.title }}</span>
    </div>
    <div class="analytic-number">
      <span v-if="basic.cash">{{ integer | currency }}</span>
      <span v-else>{{ integer }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Analytic_Data",
  props: ["basic", "integer"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
