<template>
  <header>
    <div class="container">
      <nav class="nav-container">
        <div @click="menu()" class="menu">
          <i class="fas fa-bars"></i>
        </div>

        <!-- <div @click="notifications()" class="notifications">
          <i class="far fa-bell"></i>
        </div>-->
        <div class="log-out" @click="logOut()">
          <i class="fas fa-sign-out-alt"></i>
        </div>
      </nav>

      <div class="computed">
        <div class="balance">{{ balance.net | currency('$')}}</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      route: this.$route.name,
      open: true
    };
  },
  computed: {
    balance() {
      return this.$store.getters["transactions/GET_TOTAL"];
    },
    nav() {
      return this.$store.getters["base/get_nav"];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        console.log("called");

        this.$router.push("/auth");
      });
    },
    menu() {
      console.log("new menu");
      this.$store.dispatch("base/set_aside");
    },
    notifications() {
      console.log("check notes");
    }
  }
};
</script>

