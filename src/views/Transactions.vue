<template>
  <div class="render-child">
    <template v-if="loading">
      <img src="https://i.imgur.com/JfPpwOA.gif" alt />
    </template>

    <template v-else>
      <ReturnBtn :back="back" @nav="goBack()" />
      <PageHeaders title="Transactions" menu1="Today" menu2="This Week" menu3="This Month" />
      <div>
        <ListTable name="Name" :data="trans" :type="type" />

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
import { prevRoutes } from "../mixins/prevRoute.js";
export default {
  name: "Transactions",

  props: ["id"],
  mixins: [prevRoutes],

  components: {
    ListTable,
    PageHeaders,
    TransactionForm,
    NewBtn,
    ReturnBtn
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
      // this.form = !this.form;
      this.$router.push(`/new/${this.id}`);
      //this.$modal.show("hello-world");
      // this.$modal.show("trans", { id: this.currentAcctid });
      // this.loading = true;
      // this.$store.dispatch("NEW_TRANSACTION", this.currentAcctid).then(() => {
      //   this.loading = false;
      // });
    }
  },

  created() {
    this.loading = true;
    this.$store
      .dispatch("transactions/ACCOUNT_TRANSACTIONS", this.currentAcctid)
      .then(() => {
        this.loading = false;
      });
    //   axios
    //     .get(`http://apps.test/api/transactions/${this.$route.params.id}`)
    //     .then(res => {
    //       console.log(res.data);
    //       this.trans = res.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>

