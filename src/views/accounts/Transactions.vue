<template>
  <div>
    <!-- <div>
        <ReturnBtn :back="back" @nav="onReturn()" />
        <div @click="onRefresh()" class="cursors">
          <i class="fas fa-redo-alt"></i>
        </div>
        <Range @range="onRange" :id="id" />
    </div>-->

    <router-view />

    <!-- </div>
    </template>-->
  </div>
</template>

<script>
// import ReturnBtn from "@/components/btns/ReturnBtn";
// import { prevRoutes } from "@/mixins/prevRoute";
// import Range from "@/components/Range";
// import Loader from "@/components/Loader";
export default {
  name: "Transactions",

  // props: ["id"],
  // mixins: [prevRoutes],

  components: {
    // ReturnBtn,
    // Loader,
    // Range,
  },
  data() {
    return {
      // trans: [],
      type: false,
      loading: false,

      form: false,
      icon: "fas fa-dollar-sign",
      back: "fas fa-chevron-left"
    };
  },
  // computed: {
  //   trans() {
  //     return this.$store.getters["transactions/GET_TRANSACTIONS"];
  //   },
  // },
  methods: {
    onNew() {
      this.$router.push({ name: "trans.new" });
    },
    onReturn() {
      this.$router.push("/account");
    },
    onRange(value) {
      this.loading = true;

      this.$store
        .dispatch("transactions/range", value)
        .then(() => {
          this.$toast.open({
            message: "New Date range active",
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
    },
    onRefresh() {
      this.$store
        .dispatch("transactions/ACCOUNT_TRANSACTIONS", this.id)
        .then(() => {
          this.$toast.open({
            message: "Date range reset to default",
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
  }

  // created() {
  //   this.loading = true;
  //   this.$store
  //     .dispatch("transactions/ACCOUNT_TRANSACTIONS", this.$route.params.id)
  //     .then(() => {
  //       this.$toast.open({
  //         message: "Transaction data loaded",
  //         type: "info",
  //         position: "top",
  //       });
  //       this.loading = false;
  //     })
  //     .catch(() => {
  //       this.$toast.open({
  //         message: "Connection Error please refresh the page",
  //         type: "error",
  //         position: "top",
  //       });
  //     });
  //   //
  // },
};
</script>
