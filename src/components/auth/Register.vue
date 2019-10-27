<template>
  <ValidationObserver ref="observer" tag="form" v-slot="{ valid }" @submit.prevent="onSubmit()">
    <div class="form-field">
      <ValidationProvider name="Name" rules="required|min:5|max:40|alpha_spaces" v-slot="{errors}">
        <input type="text" v-model=" reg.name" placeholder="Name" />
        <span class="errors">{{errors[0]}}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider name="Email" rules="email|min:5|max:40" v-slot="{errors}">
        <input type="email" v-model=" reg.email" placeholder="Email" />
        <span class="errors">{{errors[0]}}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider name="Password" rules="required|min:6|max:40" v-slot="{errors}">
        <input type="password" v-model=" reg.password" placeholder="Password" />
        <span class="errors">{{errors[0]}}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <input type="submit" value="Register" />
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

