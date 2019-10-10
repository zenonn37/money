<template>
  <header>
    <nav>
      <div @click="notifications()" class="notifications">
        <i class="far fa-bell"></i>
      </div>
      <div class="auth" @click="logOut()">
        <i class="fas fa-sign-out-alt"></i>
      </div>
    </nav>

    <div class="computed">
      <div class="balance">{{ balance | currency}}</div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    balance() {
      return this.$store.getters.GET_TOTAL;
      // return this.$store.getters.GET_TOTAL.length > 0
      //   ? this.$store.getters.GET_TOTAL
      //   : 0;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/auth");
      });
      console.log("out");
    },
    notifications() {
      console.log("check notes");
    }
  }
};
</script>

