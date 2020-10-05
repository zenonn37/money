<template>
  <div class="analytic-mobile">
    <Modal />
    <div class="ana-box">
      <div class="ana-data">
        <div>Spent</div>
        <div>{{ analytic.spent | currency }}</div>
      </div>
      <div class="ana-data">
        <div>Earned</div>
        <div>{{ analytic.deposits | currency }}</div>
      </div>
    </div>
    <div class="analytic-split">
      <div class="ana-data-small">
        <div>Debits</div>
        <div>{{ analytic.debits }}</div>
      </div>
      <div class="ana-data-small">
        <div>Deposits</div>
        <div>{{ analytic.credits }}</div>
      </div>
    </div>
    <div class="ana-data-short">
      <div>
        <i class="far fa-money-bill-wave"></i>
      </div>
      <div>Daily Spending</div>
      <div>{{ analytic.daily | currency }}</div>
    </div>
    <div class="ana-data-short">
      <div>
        <i class="far fa-money-bill-wave"></i>
      </div>
      <div>Largest Debit</div>
      <div>{{ trans | currency }}</div>
    </div>

    <div class="mobile-chart">
      <Chart :data="charts" />
    </div>
  </div>
</template>

<script>
import Chart from "@/charts/apex/apex-line";
import Modal from "@/components/shared/Modal";
export default {
  props: ["analytic", "data", "trans"],
  components: {
    Chart,
    Modal
  }
};
</script>

<style lang="scss" scoped></style>
