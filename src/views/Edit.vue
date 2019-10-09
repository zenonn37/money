<template>
  <div class="render-child">
    <div class="back">
      <i class="fas fa-chevron-left" @click="goBack()"></i>
    </div>
    <div class="new-form">
      <TransactionForm title="Edit Transaction" :edit="edit" @new="onSubmit" :id="id" />
    </div>
  </div>
</template>

<script>
import TransactionForm from "@/components/TransactionForm";
import { prevRoutes } from "../mixins/prevRoute.js";

export default {
  name: "Edit",
  props: ["id"],
  mixins: [prevRoutes],
  components: {
    TransactionForm
  },
  data() {
    return {
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
      console.log(value);
    }
  }
};
</script>

