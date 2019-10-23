<template>
  <div class="render-child page">
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
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("GET_ACCOUNTS");

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
    // ...mapGetters(["GET_ACCOUNTS"])
    accounts() {
      return this.$store.getters["account/GET_ACCOUNTS"];
    }
  },
  methods: {
    onNew() {
      this.$router.push("/new");
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("account/ALL_ACCOUNTS").then(() => {
      this.loading = false;
    });
  }
};
</script>

