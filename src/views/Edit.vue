<template>
  <div class="render-child">
    <div class="back">
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
import { prevRoutes } from "../mixins/prevRoute.js";

export default {
  name: "Edit",
  props: ["id", "acct"],
  mixins: [prevRoutes],
  components: {
    TransactionForm
  },
  data() {
    return {
      loading: false
      //   prevRoute: null
    };
  },
  computed: {
    edit() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters.GET_TRANSACTION(id);
    }
  },
  methods: {
    onSubmit(value) {
      this.loading = true;
      console.log(value);
      this.$store.dispatch("UPDATE_TRANSACTION", value).then(() => {
        this.loading = false;
        this.goBack();
      });
    }
  }
};
</script>

