<template>
  <div class="render-child">
    <ReturnBtn :back="back" @nav="goBack()" />

    <!-- <template v-if="loading">
      <div class="new-form">
        <div class="form-container">...loading</div>
      </div>
    </template>-->

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
  methods: {
    onSubmit(value) {
      this.loading = true;
      console.log(value);

      this.$store.dispatch("transactions/NEW_TRANSACTION", value).then(() => {
        console.log("success");
        setTimeout(() => {
          this.loading = true;
          console.log("done");

          this.goBack();
        }, 500);
      });
    }
  }
};
</script>

