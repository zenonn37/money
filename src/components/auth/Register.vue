<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    v-slot="{ valid }"
    @submit.prevent="onSubmit()"
  >
    <div class="form-field">
      <ValidationProvider
        name="Name"
        rules="required|min:5|max:40|alpha_spaces"
        v-slot="{ errors }"
      >
        <input type="text" v-model="reg.name" placeholder="Name" />
        <i class="fal fa-user"></i>
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider
        name="Email"
        rules="email|min:5|max:40"
        v-slot="{ errors }"
      >
        <input type="email" v-model="reg.email" placeholder="Email" />
        <i class="fal fa-envelope-open"></i>
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider
        name="Password"
        rules="required|min:6|max:40"
        v-slot="{ errors }"
      >
        <input type="password" v-model="reg.password" placeholder="Password" />
        <i class="fal fa-key"></i>
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <button type="submit" :disabled="!valid">
        {{ !valid ? "Disabled" : "Register" }}
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
export default {
  data() {
    return {
      reg: {
        username: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$emit("register", this.reg);
    }
  }
};
</script>
