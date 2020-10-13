<template>
  <div class="all-accounts">
    

    <div class="page-header">
      <h1 class="page-title">All Accounts</h1>
      <div @click="onNew" class="icon cursors">
          <i class="fad fa-plus-circle"></i>
      </div>
    </div>
    <div class="table-data">
      <AccountTable :accounts="accounts" />
    </div>
    <div class="mobile-accounts">
      <MobileAccounts :accounts="accounts" />
    </div>
  </div>
</template>

<script>
import AccountTable from "@/components/account/AccountTable";
import MobileAccounts from "@/components/account/MobileAccounts";
// import PageHeaders from "@/components/PageHeaders";
// import ListTable from "@/components/ListTable";
// import NewBtn from "@/components/btns/NewBtn";
// //import { createNamespacedHelpers } from "vuex";
// import Loader from "@/components/Loader";
//const { mapGetters } = createNamespacedHelpers("GET_ACCOUNTS");

export default {
  name: "Account",
  components: {
    AccountTable,
    MobileAccounts
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
    this.$store
      .dispatch("account/ALL_ACCOUNTS")
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.$toast.open({
          message: "Connection Error please refresh the page",
          type: "error",
          position: "top"
        });
      });
  }
};
</script>
