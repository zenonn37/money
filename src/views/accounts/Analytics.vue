<template>
  <div class="analytic-container">
    <div class="mini-analytic">
      <div class="analytic-row1">
        <Analytic :basic="ana_1" :integer="analytic.transactions" />
        <Analytic :basic="ana_2" :integer="analytic.debits" />
        <Analytic :basic="ana_3" :integer="analytic.credits" />
      </div>
      <div class="analytic-row2">
        <Analytic :basic="ana_4" :integer="analytic.spent" />
        <Analytic :basic="ana_5" :integer="analytic.deposits" />
      </div>
      <div class="analytic-row3">
        <div class="analytic-panel"></div>
        <div class="analytic-panel"></div>
        <div class="analytic-panel"></div>
      </div>
    </div>
    <div class="chart">Chart</div>
  </div>
</template>

<script>
import Analytic from "@/components/shared/Analytic_data";
export default {
  name: "Analytics",

  components: {
    Analytic
  },
  data() {
    return {
      ana_1: {
        style: "analytic-panel",
        title: "Transactions",
        icon: "d_sign",
        background: "icon-circle basic"
      },
      ana_2: {
        style: "analytic-panel",
        title: "Debits",
        icon: "trend_down",
        background: "icon-circle down"
      },
      ana_3: {
        style: "analytic-panel",
        title: "Credits",
        icon: "trend_up",
        background: "icon-circle up"
      },
      ana_4: {
        style: "analytic-panel-wide",
        title: "Spent",
        icon: "trend_up",
        background: "icon-circle up"
      },
      ana_5: {
        style: "analytic-panel-wide",
        title: "Deposits",
        icon: "trend_up",
        background: "icon-circle up"
      }
    };
  },
  computed: {
    analytic() {
      return this.$store.getters["transactions/GET_ACCT"];
    }
  },
  created() {
    const id = this.$route.params.account;

    this.$store.dispatch("transactions/account_worth", id);
  }
};
</script>
