<template>
  <div>
    <!-- <div class="render-child page">
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
    </div>-->

    <div class="page-header">
      <h1 class="page-title">All Accounts</h1>
      <div @click="onNew" class="icon cursors">
        <svg
          width="26px"
          height="26px"
          viewBox="0 0 26 26"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <!-- Generator: Sketch 58 (84663) - https://sketch.com -->
          <title>carbon-new-tab</title>
          <desc>Created with Sketch.</desc>
          <g
            id="Dashboard"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Desktop-HD"
              transform="translate(-1094.000000, -332.000000)"
              fill-rule="nonzero"
            >
              <g
                id="carbon-new-tab"
                transform="translate(1090.000000, 330.000000)"
              >
                <g id="Icon" fill="#565656">
                  <path
                    d="M26,26 L6,26 L6,6 L15,6 L15,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,26 C4,27.1045695 4.8954305,28 6,28 L26,28 C27.1045695,28 28,27.1045695 28,26 L28,17 L26,17 L26,26 Z"
                    id="Icon-Path"
                  />
                  <polygon
                    id="Icon-Path"
                    points="26 6 26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6"
                  />
                </g>
                <rect id="ViewBox" x="0" y="0" width="32" height="32" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="table-data">
      <AccountTable :accounts="accounts" />
    </div>
  </div>
</template>

<script>
import AccountTable from "@/components/account/AccountTable";
// import PageHeaders from "@/components/PageHeaders";
// import ListTable from "@/components/ListTable";
// import NewBtn from "@/components/btns/NewBtn";
// //import { createNamespacedHelpers } from "vuex";
// import Loader from "@/components/Loader";
//const { mapGetters } = createNamespacedHelpers("GET_ACCOUNTS");

export default {
  name: "Account",
  components: {
    AccountTable
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
