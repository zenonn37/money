<template>
  <div class="auth-container">
    <div class="form-container">
      <div class="title">Money Tracker</div>
      <transition name="fade" mode="out-in">
        <h2 v-if="!auth" key="login">Login</h2>

        <h2 v-else key="register">Register</h2>
      </transition>
      <span class="errors">{{ errors !== null ? errors : "" }}</span>
      <transition name="fade" mode="out-in">
        <Register @register="register" v-if="auth" :error="errors" />
        <Login @login="login" v-else :error="errors" />
      </transition>

      <p class="toggle-btn cursors" @click="toggleAuth()">
        {{ auth ? "I already have an Account." : "I need an Account!" }}
      </p>
    </div>
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
    return {};
  },
  computed: {
    errors() {
      return this.$store.getters["base/get_errors"];
    },
    auth() {
      return this.$store.getters["base/get_auth"];
    }
  },
  methods: {
    toggleAuth() {
      this.$store.dispatch("base/toggle_auth");
      this.$store.dispatch("base/clear_errors");
    },
    login(value) {
      //console.log(value);

      this.$store.dispatch("LOGIN", value).then(() => {
        //console.log("you are in");
        this.$store.dispatch("USER");
        this.$router.push("/dashboard");
      });
    },
    register(value) {
      // console.log(value);

      this.$store.dispatch("REGISTER", value).then(() => {
        // console.log("you are in");
        // this.$store.dispatch("USER");
        //this.$router.push("/");
        this.$store.dispatch("base/set_auth_login");
      });
    }
  }
};
</script>
