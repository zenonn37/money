<template>
  <div>
    <PageHeaders title="Expenses" menu1 menu2 menu3 />

    <ListTable name="Name" />

    <ul>
      <li v-for="exp of expense" :key="exp.id">{{exp.name}}</li>
    </ul>
    {{expense}}
  </div>
</template>

<script>
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
//var sortBy = require("lodash.sortby");
import _ from "lodash";
export default {
  components: {
    ListTable,
    PageHeaders
  },
  data() {
    return {
      expenses: [
        {
          id: 1,
          name: "Car Payment",
          due: "28th",
          amount: 400.25
        },
        {
          id: 2,
          name: "State Farm",
          due: "15th",
          amount: 87.25
        },
        {
          id: 3,
          name: "Trellis",
          due: "2th",
          amount: 67.63
        }
      ]
    };
  },
  computed: {
    expense() {
      const expenses = _.sortBy(this.expenses, [
        function(o) {
          return o.amount * -1;
        }
      ]);

      return expenses;
    }
  }
};
</script>

