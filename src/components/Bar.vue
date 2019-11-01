<template>
  <div>
    <bar :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/charts/bar.vue";
import { trans } from "@/model.js";
export default {
  name: "BarChart",
  props: ["trans"],
  components: { bar },

  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Transactions",
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
    const lab = trans.map(label => {
      return label.date;
    });
    const data = trans.map(trans => {
      return trans.amount;
    });
    console.log(data);
    this.chartdata.datasets[0].data = data;

    console.log(lab);
    this.chartdata.labels = this.trans;
  }
};
</script>

