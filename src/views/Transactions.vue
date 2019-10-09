<template>
  <div class="render-child">
    <PageHeaders title="Transactions" menu1="Today" menu2="This Week" menu3="This Month" />

    <template v-if="loading">
      <img src="https://i.imgur.com/JfPpwOA.gif" alt />
    </template>

    <template v-else>
      <div>
        <div v-if="form">
          <TransactionForm :id="currentAcctid" @close="form" />
        </div>
        <ListTable name="Name" :data="trans" :type="type" />

        <div @click="onNew()" class="new-btn">
          <i class="fas fa-dollar-sign"></i>
        </div>
      </div>
    </template>

    <!-- <modal name="hello-world">hello, world!</modal> -->
  </div>
</template>

<script>
import axios from "axios";
import PageHeaders from "@/components/PageHeaders";
import ListTable from "@/components/ListTable";
import TransactionForm from "@/components/TransactionForm";
export default {
  name: "Transactions",

  props: ["id"],

  components: {
    ListTable,
    PageHeaders,
    TransactionForm
  },
  data() {
    return {
      // trans: [],
      type: false,
      loading: false,
      currentAcctid: this.id,
      form: false
    };
  },
  computed: {
    trans() {
      return this.$store.getters.GET_TRANSACTIONS;
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
      .dispatch("ACCOUNT_TRANSACTIONS", this.currentAcctid)
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

