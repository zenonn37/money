<template>
  <div class="render-child">
    <div class="back top-spacer">
      <i class="fas fa-chevron-left" @click="goBack()"></i>
    </div>
    <div class="new-form">
      <TransactionForm
        :loading="loading"
        title="Edit Transaction"
        :edit="edit"
        @new="onSubmit"
        :id="id"
        :acct="acct"
      />
    </div>
  </div>
</template>

<script>
import TransactionForm from "@/components/TransactionForm";
import { prevRoutes } from "@/mixins/prevRoute.js";

export default {
  name: "Edit",
  props: ["id", "acct"],
  mixins: [prevRoutes],
  components: {
    TransactionForm,
  },
  data() {
    return {
      loading: false,
      //   prevRoute: null
    };
  },
  computed: {
    edit() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["transactions/GET_TRANSACTION"](id);
    },
  },
  methods: {
    onSubmit(value) {
      this.loading = true;

      this.$store
        .dispatch("transactions/UPDATE_TRANSACTION", value)
        .then(() => {
          this.$toast.open({
            message: "Transaction has been updated",
            type: "success",
            position: "top",
          });
          this.loading = false;
          this.goBack();
        })
        .catch(() => {
          this.$toast.open({
            message: "Connection Error please refresh the page",
            type: "error",
            position: "top",
          });
        });
    },
  },
};
</script>
