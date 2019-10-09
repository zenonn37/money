<template>
  <div class="render-child">
    <div class="back">
      <i class="fas fa-chevron-left" @click="goBack()"></i>
    </div>
    <div class="new-form">
      <TransactionForm :edit="null" title="New Transaction" @new="onSubmit" :acct="id" />
    </div>
  </div>
</template>

<script>
import TransactionForm from "@/components/TransactionForm";
import { prevRoutes } from "../mixins/prevRoute.js";
export default {
  name: "New",
  props: ["id"],
  mixins: [prevRoutes],
  components: {
    TransactionForm
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    onSubmit(value) {
      this.loading = true;
      this.$store.dispatch("NEW_TRANSACTION", value).then(() => {
        console.log("success");
        setTimeout(() => {
          this.loading = true;
          this.goBack();
        }, 1000);
      });
    }
  }
};
</script>

