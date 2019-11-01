<template>
  <div>
    <div class="page-header">
      <div class="page-title">Dashboard</div>
    </div>

    <template v-if="loading">
      <Loader />
    </template>

    <div v-else class="dash-parent">
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
        <Bar :trans="reports.all" />
      </div>
      <div class="pie"></div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Loader from "@/components/Loader";
import Bar from "@/components/Bar";
export default {
  name: "home",
  components: {
    Loader,
    Bar
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    reports() {
      return this.$store.getters["home/get_reports"];
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
