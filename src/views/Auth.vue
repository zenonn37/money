<template>
  <div class="auth">
    <div class="auth-parent">
      <transition name="fade" mode="out-in">
        <h1 v-if="!auth" key="login">Login</h1>
        <h1 v-else key="register">Register</h1>
      </transition>

      <transition name="fade" mode="out-in">
        <Register @register="register" v-if="auth" />
        <Login @login="login" v-else />
      </transition>
    </div>

    <button
      class="toggle-btn"
      @click="toggleAuth()"
    >{{auth ? 'I already have an Account!':'I need an Account!' }}</button>
  </div>
</template>

<script>
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
export default {
  name: "Auth",
  components: {
    Register,
    Login
  },
  data() {
    return {
      auth: false
    };
  },
  methods: {
    toggleAuth() {
      this.auth = !this.auth;
    },
    login(value) {
      console.log(value);

      this.$store.dispatch("LOGIN", value).then(() => {
        console.log("you are in");
        this.$store.dispatch("USER");
        this.$router.push("/");
      });
    },
    register(value) {
      console.log(value);

      this.$store.dispatch("REGISTER", value).then(() => {
        console.log("you are in");
        // this.$store.dispatch("USER");
        //this.$router.push("/");
        this.auth = false;
      });
    }
  }
};
</script>

