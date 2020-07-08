<template>
  <div>
    <!-- <ReturnBtn :back="back" @nav="goBack()" /> -->

    <div class="back top-spacer cursors">
      <i :class="[back]" @click="goBack()"></i>
    </div>

    <template>
      <div class="new-form">
        <ExpenseForm :loading="loading" :edit="edit" title="Edit Expense" @new="onSubmit" :id="id" />
      </div>
    </template>
  </div>
</template>

<script>
import ExpenseForm from "@/components/expense/ExpenseForm";
import { prevRoutes } from "@/mixins/prevRoute.js";

export default {
  name: "Edit",
  props: ["id"],
  mixins: [prevRoutes],
  components: {
    ExpenseForm
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
    },
    edit() {
      const id = parseInt(this.id);
      return this.$store.getters["expense/get_expense"](id);
    }
  },
  methods: {
    onSubmit(expense) {
      this.loading = true;

      this.$store
        .dispatch("expense/update_expense", expense)
        .then(() => {
          this.loading = true;

          this.goBack();
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
