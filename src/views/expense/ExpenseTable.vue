<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>

    <template v-else>
      <div class="transaction-header">
        <ul>
          <li @click="category = !category">Category</li>
          <li @click="onNew()">
            <img src="@/assets/svg/new.svg" alt="new expense button" />
          </li>
        </ul>
        <div class="tools">
          <transition name="fade" mode="in-out">
            <Category v-if="category" @category="onCategory" @reset="onReset" />
          </transition>
        </div>
      </div>
      <table>
        <thead>
          <th>Name</th>

          <th>Category</th>
          <th>Amount</th>
          <th>Due</th>
          <th>Paid</th>
        </thead>

        <transition-group tag="tbody" name="fade" mode="out-in">
          <ExpenseTableList :expense="expense" v-for="expense in expenses" :key="expense.id" />
        </transition-group>
      </table>
    </template>
  </div>
</template>

<script>
import ExpenseTableList from "@/components/expense/ExpenseTableList";
import Loader from "@/components/Loader";
import Category from "@/components/shared/Category";

export default {
  name: "ExpenseTable",
  components: {
    ExpenseTableList,
    Loader,
    Category
  },
  data() {
    return {
      loading: false,
      category: false
    };
  },
  computed: {
    expenses() {
      return this.$store.getters["expense/get_expenses"];
    }
  },
  methods: {
    onNew() {
      this.$router.push({ name: "expense.new" });
    },
    getExpenseData() {
      this.loading = true;
      this.$store.dispatch("expense/get_expenses").then(() => {
        this.loading = false;
      });
    },
    onCategory(category) {
      this.$store.dispatch("expense/filter_category", category);
      //console.log(category);
    },
    onSearch() {
      this.$store.dispatch("expense/sea");
    },
    onReset() {
      this.getExpenseData();
    }
  },
  created() {
    this.getExpenseData();
  }
};
</script>
