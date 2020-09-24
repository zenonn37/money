<template>
  <div class="trans-container">
    <div class="category-icon"></div>
    <div class="transaction">
      <div class="title">
        <h1>{{ trans.name }}</h1>
        <small>{{ trans.type }} {{ trans.date | month_short }}</small>
        <h2>{{ trans.category }}</h2>
      </div>
      <div class="amount">
        <div :class="[debit ? 'credit' : 'debit']">
          {{ trans.amount | currency }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["trans"],
  computed: {
    debit() {
      return this.trans.type !== "Debit" ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
