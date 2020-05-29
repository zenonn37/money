<template>
  <header class="header">
    <div class="container">
      <div class="greeting">
        <h1>Hello, {{ user.name }}</h1>
      </div>
      <div class="interactive">
        <div class="balances">
          <div class="title">Account Balance</div>
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
      return this.$store.getters["transactions/GET_TOTAL"];
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
