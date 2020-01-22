<template>
  <div>
    <bar :chartData="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/charts/bar.vue";

import moment from "moment";
import numeral from "numeral";
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

    //const array = [];
    const data = this.chart.map(trans => {
      //console.log(numeral(trans.amount).format(0.0));
      // array.push(numeral(trans.amount).format("$0.00"));
      return numeral(trans.amount).format(0.0);
    });
    // console.log(array);

    this.chartdata.datasets[0].data = data;

    this.chartdata.labels = lab;
  }
};
</script>
