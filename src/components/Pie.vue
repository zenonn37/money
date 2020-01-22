<template>
  <div>
    <pie :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import pie from "@/charts/pie.vue";
//import numeral from "numeral";

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
          backgroundColor: ["#41B883", "#7784fc", "#e66153"],
          data: [0, 0, 0]
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
    this.chartdata.datasets[0].data = this.net;
  }
};
</script>
