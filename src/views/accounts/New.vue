<template>
  <div class="render-child">
    <!-- <ReturnBtn :back="back" @nav="goBack()" /> -->

    <div class="back top-spacer cursors">
      <i :class="[back]" @click="goBack()"></i>
    </div>

    <template>
      <div class="business">
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
