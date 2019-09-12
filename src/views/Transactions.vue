<template>
  <div>
    <PageHeaders title="Transactions" menu1="Today" menu2="This Week" menu3="This Month" />
    <ListTable name="Name" />
  </div>
  <!-- <div class="page-header">
    <div class="page-title">Transactions</div>
    <div class="page-menu">
      <ul>
        <li>
          <a href="#">Today</a>
        </li>
        <li>
          <a href="#">This Week</a>
        </li>
        <li>
          <a href="#">This Month</a>
        </li>
      </ul>
    </div>
  </div>-->
</template>

<script>
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
export default {
  components: {
    ListTable,
    PageHeaders
  }
};
</script>

<style lang="scss" scoped>
</style>