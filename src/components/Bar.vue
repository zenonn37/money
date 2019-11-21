<template>
  <div>
    <bar :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/charts/bar.vue";
import { trans } from "@/model.js";
import moment from "moment";
export default {
  name: "BarChart",
  props: ["chart"],
  components: { bar },

  data: () => ({
    chartdata: {
      labels: ["10-30", "10-10"],
      datasets: [
        {
          label: "Last 30 Days",
          backgroundColor: "#f87979",
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
    const lab = this.chart.trans.map(label => {
      console.log(label);

      return moment(label.date).format("D MMM");
    });
    const data = this.chart.trans.map(trans => {
      return trans.amount;
    });
    console.log(data);
    this.chartdata.datasets[0].data = data;

    console.log(lab);
    this.chartdata.labels = lab;
  }
};
</script>

