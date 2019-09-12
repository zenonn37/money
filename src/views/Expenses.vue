<template>
  <div>
    <PageHeaders title="Expenses" menu1 menu2 menu3 />
    <ListTable name="Name" />
  </div>

  <!-- <div class="page-header">
    <div class="page-title">Expeneses</div>
    <div class="page-menu">
      <ul>
        <li>
          <a href="#">Sort by Date</a>
        </li>
        <li>
          <a href="#">Sort by Amount</a>
        </li>
        <li>
          <a href="#">Sort by Type</a>
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

