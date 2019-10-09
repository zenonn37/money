<template>
  <div class="render-child">
    <div class="back">
      <i class="fas fa-chevron-left" @click="goBack()"></i>
    </div>
    <div class="new-form">
      <TransactionForm :edit="null" title="New Transaction" @new="onSubmit" :id="id" />
    </div>
  </div>
</template>

<script>
import TransactionForm from "@/components/TransactionForm";
export default {
  props: ["id"],
  components: {
    TransactionForm
  },
  data() {
    return {
      prevRoute: null
    };
  },
  methods: {
    onSubmit(value) {
      this.$store.dispatch("NEW_TRANSACTION", value).then(() => {
        console.log("success");
        this.goBack();
      });
    },

    goBack() {
      this.$router.push(this.prevRoute.path);

      //this.prevRoute.path;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  }
};
</script>

