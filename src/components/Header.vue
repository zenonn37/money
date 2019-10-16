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

    <div class="computed" v-if="$route.name === 'account'">
      <div class="balance">{{ amount | currency}}</div>
    </div>
    <div class="computed" v-else>
      <div class="balance">{{ balance | currency}}</div>
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
    },
    amount() {
      return this.$store.getters["account/get_total"];
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

