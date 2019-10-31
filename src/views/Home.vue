<template>
  <div class="page-header">
    <div class="page-title">Dashboard</div>

    <div>
      <v-chart v-bind:chartData="chartData"></v-chart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      chartData: {
        chartType: "vBarChart",
        selector: "chart",
        title: "Important Data",
        width: 400,
        height: 200,
        metric: "count", // for two or more metrics pass as an array ['count', 'pyCount']
        data: [
          { count: 120, fruit: "apples" },
          { count: 250, fruit: "oranges" }
        ]
      }
    };
  }
};
</script>
