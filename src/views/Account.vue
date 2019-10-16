<template>
  <div class="render-child">
    <PageHeaders title="My Accounts" menu1="Financial Institutions" menu2="Budgets" menu3 />

    <template v-if="loading">
      <div>...loading</div>
    </template>

    <template v-else>
      <ListTable name="Bank" :data="accounts" :type="type" />

      <NewBtn @new="onNew()" :icon="icon" />
    </template>
  </div>
</template>

<script>
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
import NewBtn from "@/components/btns/NewBtn";

export default {
  name: "Account",
  components: {
    ListTable,
    PageHeaders,
    NewBtn
  },
  data() {
    return {
      acct: [],
      type: true,
      loading: false,
      icon: "fas fa-university"
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.GET_ACCOUNTS;
    }
  },
  methods: {
    onNew() {
      this.$router.push("/new");
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("ALL_ACCOUNTS").then(() => {
      this.loading = false;
    });
  }
};
</script>

