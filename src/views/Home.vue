<template>
  <div>
    <!-- <div class="page-header">
      <div class="page-title">Dashboard</div>
    </div>-->

    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div class="render-child page">
        <div class="dash-parent">
          <div class="dash-panel">
            <div class="panel-child">
              <div class="dash-icons">
                <i class="fas fa-dollar-sign"></i>
              </div>
              <h3>Transactions</h3>
              <h1>{{ reports.count }}</h1>
            </div>
          </div>
          <div class="dash-panel">
            <div class="panel-child">
              <div class="dash-icons">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>Spent</h3>
              <h1>{{ reports.transactions | currency("$") }}</h1>
            </div>
          </div>

          <div class="dash-panel">
            <div class="panel-child">
              <div class="dash-icons">
                <i class="fas fa-chart-bar"></i>
              </div>
              <h3>Deposits</h3>
              <h1>{{ reports.deposits | currency("$") }}</h1>
            </div>
          </div>
          <div class="dash-panel">
            <div class="panel-child">
              <div class="dash-icons">
                <i class="fas fa-chart-pie"></i>
              </div>
              <h3>Net Worth</h3>
              <h1>{{ reports.spent | currency("$") }}</h1>
            </div>
          </div>
        </div>
        <div class="dash-charts">
          <div class="bar">
            <div class="dash-panel">
              <div class="panel-child">
                <div class="dash-icons">
                  <i class="fas fa-chart-area"></i>
                </div>
                <h3>Average Transaction</h3>
                <h1>{{ avg }}</h1>
              </div>
            </div>
            <div class="dash-panel">
              <div class="panel-child">
                <div class="dash-icons">
                  <i class="fas fa-cash-register"></i>
                </div>
                <h3>Daily Average</h3>
                <h1>{{ daily }}</h1>
              </div>
            </div>
          </div>
          <div class="pie" v-if="month.length >= 1">
            <Bar :chart="month" :key="updateChart" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
// @ is an alias to /src
import Loader from "@/components/Loader";
import Bar from "@/components/Bar";

import numeral from "numeral";

export default {
  name: "home",
  components: {
    Loader,
    Bar
  },
  data() {
    return {
      loading: false,
      updateChart: 0
    };
  },
  computed: {
    reports() {
      if (
        this.$store.getters["home/get_reports"] !== null ||
        this.$store.getters["home/get_reports"] !== undefined
      ) {
        return this.$store.getters["home/get_reports"];
      } else {
        return [];
      }
    },
    month() {
      return this.$store.getters["home/get_month_report"];
    },
    chart() {
      const reports = this.reports.charts;

      return reports;
    },
    avg() {
      const reports = this.reports.all;

      let avgArray = arr => arr.reduce((a, b) => a + b, 0) / reports.length;
      let avg = avgArray(reports);

      //console.log(reports.all);
      return numeral(avg).format("$0.00");
    },
    daily() {
      const reports = this.reports.all;

      let avgArray = arr => arr.reduce((a, b) => a + b, 0) / 30;
      let avg = avgArray(reports);

      //console.log(reports.all);
      return numeral(avg).format("$0.00");
    }
  },
  watch: {
    month() {
      this.updateChart++;
    }
  },
  created() {
    // console.log("created");
    this.updateChart++;
    this.loading = true;
    this.$store.dispatch("home/get_reports").then(() => {
      // console.log("called");

      this.loading = false;
    });
  }
};
</script>
