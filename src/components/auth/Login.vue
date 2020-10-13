<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    v-slot="{ valid }"
    @submit.prevent="onSubmit()"
  >
    <div class="form-field">
      <ValidationProvider
        name="Email"
        rules="email|min:5|max:40"
        v-slot="{ errors }"
      >
        <input type="email" v-model="login.username" placeholder="Email" />

        <i class="fal fa-user"></i>
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider
        name="Password"
        rules="required|min:6|max:40|alpha"
        v-slot="{ errors }"
      >
        <input
          type="password"
          v-model="login.password"
          placeholder="Password"
        />
        <i class="fal fa-key"></i>
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>

    <div class="form-field">
      <button type="submit" :disabled="!valid">
        {{ !valid ? "Disabled" : "Login" }}
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {
      login: {
        password: "",
        username: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$emit("login", this.login);
    }
  }
};
</script>

<style lang="scss" scoped></style>
