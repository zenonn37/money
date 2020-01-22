<template>
  <div class="cover-page">
    <nav class="cover-nav">
      <div class="logo">
        <img src="/images/money_white.png" alt="App logo" />
      </div>
      <div class="cover-nav">
        <ul>
          <li @click="set_login()" class="cursors">Login</li>
        </ul>
      </div>
    </nav>

    <div class="cover-parent">
      <div class="cover-left">
        <div>
          <h1>Easily track every penny, with minimal effort</h1>
        </div>
        <p>
          Track every transaction on all your accounts, and keep up with account
          balances
        </p>

        <div class="action cursors" @click="set_register()">Get Started</div>
      </div>
      <div class="cover-right">
        <div>
          <img src="/images/undraw_all_the_data_h4ki.svg" alt="Cover Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    set_login() {
      console.log("pressed");

      this.$store.dispatch("base/set_auth_login");
      this.$router.push("/auth");
    },
    set_register() {
      this.$store.dispatch("base/set_auth_register");
      this.$router.push("/auth");
    }
  }
};
</script>
