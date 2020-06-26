<template>
  <header class="header">
    <div class="container">
      <div class="greeting">
        <h1>Hello, {{ user.name }}</h1>
        <h2>{{ $route.name }}</h2>
      </div>
      <div class="interactive">
        <div class="balances" v-if="$route.name === 'accounts'">
          <div class="title">Account Balance</div>
          {{ balance.total | currency("$") }}
        </div>
        <div class="balances" v-else-if="$route.name === 'expense.table'">
          <div class="title">Expense Total</div>
          {{ balance.total | currency("$") }}
        </div>
        <div class="balances" v-else-if="$route.name === 'accounts.analytics'">
          <div class="title">Account Total</div>
          {{ balance.total | currency("$") }}
        </div>
        <div class="balances" v-else-if="$route.name === 'trans.transactions'">
          <div class="title">Transactions Total</div>
          {{ balance.net | currency("$") }}
        </div>
      </div>
    </div>
    <!-- <div class="container">
      <nav class="nav-container">
        <div @click="menu()" class="menu">
          <i class="fas fa-bars"></i>
        </div>

      
       
      </nav>

      <div class="computed">
        <div class="balance">{{ balance.net | currency("$") }}</div>
      </div>
    </div>-->
  </header>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      route: this.$route.name,
      open: true,
      day: ""
    };
  },
  computed: {
    balance() {
      return this.$store.getters["base/get_total"];
    },
    nav() {
      return this.$store.getters["base/get_nav"];
    },
    user() {
      return this.$store.getters["GET_USER"];
    }
  },
  methods: {
    setGreeting() {
      let time = moment().isAfter("day");
      this.day = time;
    },
    logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/auth");
      });
    },
    menu() {
      this.$store.dispatch("base/set_aside");
    },
    notifications() {}
  },
  mounted() {
    this.setGreeting();
  }
};
</script>
