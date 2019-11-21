<template>
  <div class="render-child page">
    <PageHeaders title="My Accounts" menu1 menu2 menu3 />

    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div v-if="accounts.length === 0" class="no-account">
        <div>
          <div>
            <img src="/images/new_account.png" alt="chart for new account" />
          </div>
          <h2>Please Add an account to get started!</h2>
        </div>
      </div>

      <ListTable v-else name="Bank" :data="accounts" :type="type" />

      <NewBtn @new="onNew()" :icon="icon" />
    </template>
  </div>
</template>

<script>
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
import NewBtn from "@/components/btns/NewBtn";
import { createNamespacedHelpers } from "vuex";
import Loader from "@/components/Loader";
const { mapGetters } = createNamespacedHelpers("GET_ACCOUNTS");

export default {
  name: "Account",
  components: {
    ListTable,
    PageHeaders,
    NewBtn,
    Loader
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
        this.$toast.open({
          message: "Accounts Loaded",
          type: "info",
          position: "top"
        });
        this.loading = false;
      })
      .catch(err => {
        this.$toast.open({
          message: "Connection Error please refresh the page",
          type: "error",
          position: "top"
        });
      });
  }
};
</script>

