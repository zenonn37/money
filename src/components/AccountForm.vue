<template>
  <div class="business">
    <div class="forms">
      <h1>{{ title }}</h1>
      <ValidationObserver ref="observer" tag="form" v-slot="{ valid }" @submit.prevent="onSend()">
        <div class="form-field">
          <ValidationProvider
            name="Account name"
            rules="required|min:2|max:40|alpha_spaces"
            v-slot="{ errors }"
          >
            <input type="text" placeholder="Name" v-model="account.name" />
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field">
          <ValidationProvider
            v-if="edit === null"
            name="Starting Balance"
            :rules="{
              required: { allowFalse: false },
              regex: /^(\d*\.)?\d+$/,
              min: 3,
              max: 10
            }"
            v-slot="{ errors }"
          >
            <input type="text" placeholder=" Starting Balance" v-model="account.balance" />
            <!-- <input v-else
            
              type="text"
              placeholder=" Starting Balance"
              v-model=" account.balance"
            />-->
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field">
          <select name="type" v-model="account.type" value="Checking">
            <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div class="form-field">
          <ValidationProvider name="Date" rules="required" :bails="false" v-slot="{ errors }">
            <datetime
              placeholder="Enter Date"
              v-model="account.date"
              value-zone="America/New_York"
              :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
            ></datetime>
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-field" v-if="!loading">
          <button
            :class="[valid ? 'complete' : 'not-valid']"
            :disabled="!valid"
            type="submit"
          >{{ valid ? "Complete" : "Disabled" }}</button>
        </div>

        <div class="form-field" v-else>
          <input type="submit" value="Processing" />
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { acct } from "@/model/types.js";
export default {
  props: ["id", "edit", "title", "loading"],
  components: {},
  data() {
    return {
      types: acct,
      account: {
        id: this.id !== undefined || this.id !== null ? this.id : "",
        date:
          this.edit === null || this.edit === undefined ? "" : this.edit.date,
        balance: this.edit === null || this.edit === undefined ? "" : "",
        name:
          this.edit === null || this.edit === undefined ? "" : this.edit.name,
        type:
          this.edit === null || this.edit === undefined
            ? "Checking"
            : this.edit.type
      }
    };
  },
  computed: {
    bal() {
      return this.edit !== null || this.edit !== undefined ? true : false;
    }
  },
  methods: {
    async onSend() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        // console.log("form has issues");
        this.loading = false;
      }
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
      this.$emit("new", this.account);

      // console.log(this.account);
    }
  }
};
</script>
