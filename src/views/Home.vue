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
        <div class="bar">
          <ul>
            <li>
              <div class="dash-icons">
                <i class="fas fa-chart-pie"></i>
              </div>
            </li>
            <li>
              <div class="dash-icons">
                <i class="fas fa-chart-pie"></i>
              </div>
            </li>
            <li>
              <div class="dash-icons">
                <i class="fas fa-chart-pie"></i>
              </div>
            </li>
          </ul>
        </div>
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
      if (
        this.$store.getters["home/get_reports"] !== null ||
        this.$store.getters["home/get_reports"] !== undefined
      ) {
        return this.$store.getters["home/get_reports"];
      } else {
        return [];
      }
    },
    chart() {
      const reports = this.reports;
      let charts = [];

      charts[0] = Math.round(reports.spent);
      charts[1] = Math.round(reports.deposits);
      charts[2] = Math.round(reports.transactions);

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
