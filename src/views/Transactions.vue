<template>
  <div class="render-child page">
    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div class="render-header">
        <ReturnBtn :back="back" @nav="onReturn()" />
        <div @click="onRefresh()">
          <i class="fas fa-redo-alt"></i>
        </div>
        <Range @range="onRange" :id="id" />
      </div>
      <!-- <PageHeaders
        title="Transactions"
        :id="id"
        menu1="Today"
        menu2="This Week"
        menu3="This Month"
      />-->
      <div>
        <ListTable name="Name" :data="trans" :type="type" :acct_id="id" />

        <NewBtn @new="onNew()" :icon="icon" />
      </div>
    </template>
  </div>
</template>

<script>
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
import TransactionForm from "@/components/TransactionForm";
import NewBtn from "@/components/btns/NewBtn";
import ReturnBtn from "@/components/btns/ReturnBtn";
import { prevRoutes } from "../mixins/prevRoute";
import Range from "@/components/Range";
import Loader from "@/components/Loader";
export default {
  name: "Transactions",

  props: ["id"],
  mixins: [prevRoutes],

  components: {
    ListTable,
    PageHeaders,
    TransactionForm,
    NewBtn,
    ReturnBtn,
    Loader,
    Range
  },
  data() {
    return {
      // trans: [],
      type: false,
      loading: false,
      currentAcctid: this.id,
      form: false,
      icon: "fas fa-dollar-sign",
      back: "fas fa-chevron-left"
    };
  },
  computed: {
    trans() {
      return this.$store.getters["transactions/GET_TRANSACTIONS"];
    }
  },
  methods: {
    onNew() {
      this.$router.push(`/new/${this.id}`);
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
        .catch(err => {
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
        .catch(err => {
          this.$toast.open({
            message: "Connection Error please refresh the page",
            type: "error",
            position: "top"
          });
        });
    }
  },

  created() {
    this.loading = true;
    this.$store
      .dispatch("transactions/ACCOUNT_TRANSACTIONS", this.currentAcctid)
      .then(() => {
        this.$toast.open({
          message: "Transaction data loaded",
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
    //
  }
};
</script>

