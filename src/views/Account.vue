<template>
  <div>
    <PageHeaders title="My Accounts" menu1="Financial Institutions" menu2="Budgets" menu3 />
    <ListTable name="Bank" />
  </div>
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

