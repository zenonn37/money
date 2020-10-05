<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <AnalyticMobile
        :analytic="analytic"
        :data="charts"
        :trans="transactions"
      />
      <div class="analytic-desktop">
        <div class="analytic-container">
          <div class="overviewcard">
            <div class="icon">
              <h2>Debits</h2>
            </div>
            <div class="info">
              <h1>{{ analytic.debits }}</h1>
            </div>
          </div>
          <div class="overviewcard">
            <div class="icon">
              <h2>Credits</h2>
            </div>
            <div class="info">
              <h1>{{ analytic.credits }}</h1>
            </div>
          </div>
          <div class="overviewcard">
            <div class="icon">
              <h2>Spent</h2>
            </div>
            <div class="info">
              <h1>{{ analytic.spent | currency }}</h1>
            </div>
          </div>
          <div class="overviewcard">
            <div class="icon">
              <h2>balance</h2>
            </div>
            <div class="info">
              <h1>{{ analytic.balance | currency }}</h1>
            </div>
          </div>
        </div>
        <div class="main-cards">
          <div class="card">
            <Chart :data="charts" />
          </div>
          <div class="card">
            <div class="trends">
              <div class="trends-panel">
                <div class="trend-control">
                  <h2>Weekly Avg</h2>
                  <h1>{{ analytic.transactions }}</h1>
                  <!-- <apexchart height="100" type="donut" :options="pie" :series=" pieData.series"></apexchart> -->
                </div>
                <div class="trend-control">
                  <h2>Transactions</h2>
                  <h1>{{ analytic.transactions }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-trends">
              <h2>Monthly Trends</h2>
              <ul>
                <li>
                  <h3>Deposits</h3>
                  <p>{{ analytic.deposits | currency }}</p>
                </li>
                <li>
                  <h3>Daily Average</h3>
                  <p>{{ analytic.daily | currency }}</p>
                </li>
                <li>
                  <h3>Largest Purchase</h3>
                  <p>{{ transactions | currency }}</p>
                </li>
                <li>
                  <h3>Average Balance</h3>
                  <p>{{ transactions | currency }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import Analytic from "@/components/shared/Analytic_data";
// import LineChart from "@/components/shared/Line_Chart";
import Chart from "@/charts/apex/apex-line";
import Loader from "@/components/Loader";
import AnalyticMobile from "@/components/account/AnalyticMobile";
export default {
  name: "Analytics",

  components: {
    // Analytic,
    // LineChart,
    Loader,
    Chart,
    AnalyticMobile
  },
  data() {
    return {
      pieData: {
        series: [0, 0]
      },
      pieData2: {
        series: [1000, 4500]
      },
      pie: {
        chart: {
          type: "donut",
          width: 30,
          height: 30,
          sparkline: {
            enabled: true
          }
        },
        labels: ["Spent", "Deposits"],
        stroke: {
          width: 1
        },
        dataLabels: {
          enabled: true
        },
        tooltip: {
          fixed: {
            enabled: false
          }
        }
      },
      pie2: {
        chart: {
          type: "pie",
          width: 30,
          height: 30,
          sparkline: {
            enabled: true
          }
        },
        colors: ["#30304d", "#b9fab8"],
        labels: ["Spent", "Budget"],
        stroke: {
          width: 1
        },
        dataLabels: {
          enabled: true
        },
        tooltip: {
          fixed: {
            enabled: false
          }
        }
      },
      bar: {
        chartOptions: {
          chart: {
            type: "bar",
            width: 50,
            height: 35,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            bar: {
              columnWidth: "80%"
            }
          },
          labels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18
          ],
          xaxis: {
            crosshairs: {
              width: 1
            }
          }
        },
        series: [
          {
            name: "series-1",
            data: [
              25,
              66,
              41,
              89,
              63,
              25,
              44,
              12,
              36,
              9,
              54,
              14,
              15,
              16,
              17,
              18
            ]
          }
        ]
      },
      loading: false
    };
  },
  computed: {
    analytic() {
      return this.$store.getters["transactions/GET_ACCT"];
    },
    charts() {
      return this.$store.getters["transactions/GET_CHARTS"];
    },
    transactions() {
      let amount = [];
      this.analytic.debit.forEach(ele => {
        amount.push(ele.amount);
      });

      const lg = Math.max(...amount);
      return lg;
    },
    avgBalance() {
      return this.analytic.balance / 28;
    }
  },

  created() {
    console.log("updating");
    const id = this.$route.params.account;
    this.loading = true;
    this.$store.dispatch("transactions/account_worth", id).then(() => {});
    this.$store.dispatch("transactions/monthly", id).then(() => {
      this.loading = false;
    });

    // const pies = this.$store.getters["transactions/GET_ACCT"];
    // const series1 = parseInt(pies.spent);
    // const series2 = parseInt(pies.deposits);
    // this.pieData.series[0] = series1;
    // this.pieData.series[1] = series2;
  }
};
</script>
