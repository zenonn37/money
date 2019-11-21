<template>
  <div class="render-child">
    <!-- <ReturnBtn :back="back" @nav="goBack()" /> -->

    <div class="back top-spacer">
      <i :class="[back]" @click="goBack()"></i>
    </div>

    <template>
      <div class="new-form">
        <TransactionForm
          :loading="loading"
          :edit="null"
          title="New Transaction"
          @new="onSubmit"
          :acct="id"
        />
      </div>
    </template>
  </div>
</template>

<script>
import TransactionForm from "@/components/TransactionForm";
import { prevRoutes } from "../mixins/prevRoute.js";
import ReturnBtn from "@/components/btns/ReturnBtn";
export default {
  name: "New",
  props: ["id"],
  mixins: [prevRoutes],
  components: {
    TransactionForm,
    ReturnBtn
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
      console.log(value);

      this.$store
        .dispatch("transactions/NEW_TRANSACTION", value)
        .then(() => {
          // console.log("success");
          setTimeout(() => {
            this.$toast.open({
              message: "New Transaction Created",
              type: "success",
              position: "top"
            });
            this.loading = true;
            //console.log("done");

            this.goBack();
          }, 1000);
        })
        .catch(err => {
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

