<template>
  <div>
    <!-- <ReturnBtn :back="back" @nav="goBack()" /> -->

    <!-- <div class="back top-spacer cursors">
      <i :class="[back]" @click="goBack()"></i>
    </div>-->

    <template>
      <div class="business">
        <div class="form-logo">
          <h1>Form Logo</h1>
        </div>
        <div class="form">
          <ExpenseForm
            :loading="loading"
            :edit="null"
            title="New Expense"
            @new="onSubmit"
            :id="null"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ExpenseForm from "@/components/expense/ExpenseForm";
// import { prevRoutes } from "@/mixins/prevRoute.js";

export default {
  name: "New",
  props: ["id"],
  // mixins: [prevRoutes],
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
    }
  },
  methods: {
    onSubmit(expense) {
      this.loading = true;

      this.$store
        .dispatch("expense/new_expense", expense)
        .then(() => {
          this.loading = true;

          this.$router.push("/expenses");
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
