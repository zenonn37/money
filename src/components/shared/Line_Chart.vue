<template>
  <div>
    <Lines :chartData="chartdata" :options="options" />
  </div>
</template>

<script>
import Lines from "@/components/shared/Line.vue";

//import moment from "moment";

export default {
  name: "LineChart",
  props: ["chart"],
  components: { Lines },

  data: () => ({
    chartdata: {
      labels: ["Week One", "Week Two", "Week Three", "Week Four"],
      datasets: [
        {
          label: "Week Spending",
          yAxisID: "A",
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          data: [708.0, 1500.0, 690.0, 350.0]
        },
        {
          label: "Weekly Transactions",
          yAxisID: "B",
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(192, 192, 192, 0.2)",
          data: [15, 30, 40, 10]
        }
        // {
        //   label: "Week Three",
        //   borderColor: "rgba(75, 192, 192, 1)",
        //   backgroundColor: "rgba(50, 192, 50, 0.2)",
        //   data: [0, 56.56, 0, 399.69, 56.69, 0, 89.66]
        // },
        // {
        //   label: "Week Four",
        //   borderColor: "rgba(75, 192, 192, 1)",
        //   backgroundColor: "rgba(50, 89, 50, 0.2)",
        //   data: [699.99, 156.56, 50.66, 199.69, 756.69, 0, 0]
        // }
      ]
    },
    options: {
      // responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            id: "A",
            position: "left",
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return (
                  "$ " + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                );
              }
            }
          },
          {
            id: "B",
            position: "right",

            ticks: {
              beginAtZero: true
              //   callback: function(value) {
              //     return (
              //       "$ " + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
              //     );
              //   }
            }
          }
        ]
      }
    }
  }),
  methods: {},
  computed: {}
  //   created() {
  //     const lab = this.chart.map(label => {
  //       return moment(label.date).format("D MMM");
  //     });

  //     const data = this.chart.map(trans => {
  //       return Math.round(trans.amount);
  //     });

  //     this.chartdata.datasets[0].data = data;

  //     this.chartdata.labels = lab;
  //   }
};
</script>
