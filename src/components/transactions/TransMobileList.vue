<template>
  <div class="trans-container">
    <div class="category-icon" :class="colors.category">
      <i :class="colors.icon"></i>
    </div>
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
    },
    colors() {
      const color = this.trans.category;
      let category = "";
      let icon = "";
      // if (color === "Transportation") {
      //   return "blue";
      // } else {
      //   return "pink";
      // }

      switch (color) {
        case "Transportation":
          category = "blue";
          icon = "fas fa-tire";
          break;
        case "Housing":
          category = "tuscan";
          icon = "fas fa-house-day";
          break;
        case "Personal Spending":
          category = "champagne";
          icon = "fas fa-user-chart";
          break;
        case "Income":
          category = "sheen";
          icon = "fas fa-money-bill-wave";
          break;
        case "Food":
          category = "champagne";
          icon = "fas fa-bags-shopping";
          break;
        case "Utilities":
          category = "sheen";
          icon = "fas fa-faucet-drip";
          break;
        case "Education":
          category = "celeste";
          icon = "fas fa-school";
          break;

        default:
          break;
      }

      return {
        category,
        icon
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
