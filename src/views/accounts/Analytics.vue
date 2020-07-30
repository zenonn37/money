<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div>
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
              <Analytic :basic="ana_6" :integer="analytic.balance" />
              <Analytic :basic="ana_7" :integer="analytic.daily" />
            </div>
          </div>
          <div class="trends">
            <div class="trends-panel">
              <div class="trend-control">
                <apexchart
                  height="100"
                  :options="chartOptions"
                  :series="series"
                >
                </apexchart>
              </div>
              <!-- <bars
                :height="123"
                :data="[
                  { value: 0, title: '' },
                  { value: 1, title: 'test1' },
                  { value: 5, title: 'test5' },
                  { value: 2, title: 'test2' },
                  { value: 1, title: 'test1' },
                ]"
                :barWidth="5"
                :gradient="['#6fa8dc', '#42b983']"
                :growDuration="2"
              >
              </bars> -->
            </div>
          </div>
          <div class="reports">
            <div class="reports-panel">Reports</div>
          </div>
          <div class="chart">
            <div class="chart-container">
              <LineChart :charts="charts" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Analytic from "@/components/shared/Analytic_data";
import LineChart from "@/components/shared/Line_Chart";
import Loader from "@/components/Loader";
export default {
  name: "Analytics",

  components: {
    Analytic,
    LineChart,
    Loader,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          width: 50,
          height: 35,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 14, 15, 16, 17, 18],
        },
      ],
      loading: false,
      ana_1: {
        style: "analytic-panel",
        title: "Transactions",
        icon: "d_sign",
        background: "icon-circle basic",
        cash: false,
      },
      ana_2: {
        style: "analytic-panel",
        title: "Debits",
        icon: "trend_down",
        background: "icon-circle down",
        cash: false,
      },
      ana_3: {
        style: "analytic-panel",
        title: "Credits",
        icon: "trend_up",
        background: "icon-circle up",
        cash: false,
      },
      ana_4: {
        style: "analytic-panel-wide",
        title: "Spent",
        icon: "trend_up",
        background: "icon-circle up",
        cash: true,
      },
      ana_5: {
        style: "analytic-panel-wide",
        title: "Deposits",
        icon: "trend_up",
        background: "icon-circle up",
        cash: true,
      },
      ana_6: {
        style: "analytic-panel-wide",
        title: "Monthly Balance",
        icon: "trend_up",
        background: "icon-circle up",
        cash: true,
      },
      ana_7: {
        style: "analytic-panel-wide",
        title: "Daily Spending",
        icon: "trend_up",
        background: "icon-circle up",
        cash: true,
      },
    };
  },
  computed: {
    analytic() {
      return this.$store.getters["transactions/GET_ACCT"];
    },
    charts() {
      return this.$store.getters["transactions/GET_CHARTS"];
    },
  },
  created() {
    const id = this.$route.params.account;
    this.loading = true;
    this.$store.dispatch("transactions/account_worth", id).then(() => {});
    this.$store.dispatch("transactions/monthly", id).then(() => {
      this.loading = false;
    });
  },
};
</script>
