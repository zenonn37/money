<template>
  <div>
    <bar :chartData="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/charts/bar.vue";

import moment from "moment";
export default {
  name: "LineChart",
  props: ["chart"],
  components: { bar },

  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Last 30 Days",
          backgroundColor: "#393857",
          borderColor: "rgb(168, 165, 235)",
          data: []
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
    const lab = this.chart.map(label => {
      return moment(label.date).format("D MMM");
    });
    const data = this.chart.map(trans => {
      return trans.amount;
    });

    this.chartdata.datasets[0].data = data;

    this.chartdata.labels = lab;
  }
};
</script>

