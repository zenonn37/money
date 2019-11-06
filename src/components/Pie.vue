<template>
  <div>
    <pie :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import pie from "@/charts/pie.vue";
import numeral from "numeral";

export default {
  name: "PieChart",
  props: ["net"],
  components: { pie },

  data: () => ({
    chartdata: {
      labels: ["Net", "Credit", "Debit"],
      datasets: [
        {
          label: "Transactions",
          backgroundColor: ["#41B883", "#00D8FF", "#E46651"],
          data: this.net
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {},
  created() {
    // const data = this.net.map(net => {
    //   return trans.amount;
    // });
    // const net = parseFloat(numeral(this.net.spent).format("0,0.00"));
    // let stats = [this.net.spent, this.net.deposits, this.net.transactions];
    // console.log(stats);
    //this.chartdata.datasets[0].data = this.net;
    //this.chartdata.labels = this.net;
  }
};
</script>

