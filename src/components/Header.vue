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
  </header>
</template>

<script>
export default {
  methods: {
    logOut() {
      console.log("out");
    },
    notifications() {
      console.log("check notes");
    }
  }
};
</script>

