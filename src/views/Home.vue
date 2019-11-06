<template>
  <div>
    <!-- <div class="page-header">
      <div class="page-title">Dashboard</div>
    </div>-->

    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div class="dash-parent">
        <div class="dash-panel">
          <div class="panel-child">
            <div class="dash-icons">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <h3>Transactions</h3>
            <h1>{{reports.count}}</h1>
          </div>
        </div>
        <div class="dash-panel">
          <div class="panel-child">
            <div class="dash-icons">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Spent</h3>
            <h1>{{reports.transactions | currency('$')}}</h1>
          </div>
        </div>
        <div class="dash-panel">
          <div class="panel-child">
            <div class="dash-icons">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h3>Deposits</h3>
            <h1>{{reports.deposits | currency('$')}}</h1>
          </div>
        </div>
        <div class="dash-panel">
          <div class="panel-child">
            <div class="dash-icons">
              <i class="fas fa-chart-pie"></i>
            </div>
            <h3>Net Worth</h3>
            <h1>{{reports.spent | currency('$')}}</h1>
          </div>
        </div>
      </div>
      <div class="dash-charts">
        <div class="bar"></div>
        <div class="pie">
          <Pie :net="chart" />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
// @ is an alias to /src
import Loader from "@/components/Loader";
import Bar from "@/components/Bar";
import Pie from "@/components/Pie";
export default {
  name: "home",
  components: {
    Loader,
    Bar,
    Pie
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    reports() {
      return this.$store.getters["home/get_reports"];
    },
    chart() {
      const report = this.$store.getters["home/get_reports"];
      let charts = [];
      charts[0] = report.spent;
      charts[1] = report.deposits;
      charts[2] = report.transactions;

      return charts;
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("home/get_reports").then(() => {
      console.log("done");

      this.loading = false;
    });
  }
};
</script>
