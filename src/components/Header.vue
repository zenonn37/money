<template>
  <header>
    <div class="container">
      <nav class="nav-container">
        <div @click="notifications()" class="notifications">
          <i class="far fa-bell"></i>
        </div>
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
      route: this.$route.name
    };
  },
  computed: {
    balance() {
      return this.$store.getters["transactions/GET_TOTAL"];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        console.log("called");

        this.$router.push("/auth");
      });
    },
    notifications() {
      console.log("check notes");
    }
  }
};
</script>

