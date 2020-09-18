<template>
  <div id="chart">
    <apexchart type="line" height="400" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      week1: 0,
      week2: 0,
      week3: 0,
      week4: 0,

      series: [
        {
          name: "Weekly",
          data: [10, 41, 35, 51]
        }
      ],
      chartOptions: {
        chart: {
          width: "100%",
          height: 400,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Weekly Spending",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"]
        }
      }
    };
  },
  created() {
    //const week1 = parseInt(this.data.month.weekOne);
    //this.week1 = week1;
    this.series[0].data[0] = parseInt(this.data.month.weekOne);
    this.series[0].data[1] = parseInt(this.data.month.weekTwo);
    this.series[0].data[2] = parseInt(this.data.month.weekThree);
    this.series[0].data[3] = parseInt(this.data.month.weekFour);
  }
};
</script>

