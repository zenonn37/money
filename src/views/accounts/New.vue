<template>
  <div class="base-forms">
    <!-- <ReturnBtn :back="back" @nav="goBack()" /> -->

    <div class="back cursors">
      <div @click="reverse()">
      <i class="fas fa-times"></i>
      </div>
     <!-- <router-link tag="i" :to="{name: 'accounts.transactions'}" class="fas fa-times"></router-link> -->
    </div>

    <template>
      <div class="b-forms">

        <div class="form">
          <TransactionForm
            :loading="loading"
            :edit="null"
            title="New Transaction"
            @new="onSubmit"
            @cancel="goBack()"
            :acct="this.$route.params.account"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TransactionForm from "@/components/TransactionForm";
import { prevRoutes } from "@/mixins/prevRoute.js";

export default {
  name: "New",
  props: ["id"],
  mixins: [prevRoutes],
  components: {
    TransactionForm
  },
  data() {
    return {
      loading: false,
      back: "fas fa-chevron-left"
    };
  },
  computed: {
    errors() {
      return this.$store.getters["base/get_errors"];
    }
  },
  methods: {
    reverse(){
      console.log('tet');
        this.goBack();
    },
    onSubmit(value) {
      this.loading = true;

      this.$store
        .dispatch("transactions/NEW_TRANSACTION", value)
        .then(() => {
          this.$toast.open({
            message: "New Transaction Created",
            type: "success",
            position: "top"
          });
          this.loading = true;
          //console.log("done");

          this.goBack();
          // console.log("success");
          // setTimeout(() => {

          // }, 300);
        })
        .catch(() => {
          this.$toast.open({
            message:
              this.errors !== null
                ? this.errors
                : "Connection Error please refresh the page",
            type: "error",
            position: "top"
          });
        });
    }
  }
};
</script>
