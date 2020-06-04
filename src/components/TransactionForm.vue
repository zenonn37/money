<template>
  <div class="forms-container">
    <div class="forms">
      <h1>{{ title }}</h1>

      <ValidationObserver
        ref="observer"
        v-slot="{ valid }"
        tag="form"
        @submit.prevent="onSend()"
      >
        <div class="form-field">
          <ValidationProvider
            name="Transaction name"
            rules="required|min:2|max:30|alpha_spaces"
            :bails="false"
            v-slot="{ errors }"
          >
            <input type="text" placeholder="Name" v-model="trans.name" />
            <span class="errors">{{ errors[0] }}</span>
            <!-- <ul>
              <li class="errors" v-for="error in errors">{{ error }}</li>
            </ul>-->
          </ValidationProvider>
        </div>
        <div class="form-field">
          <ValidationProvider
            name="Amount"
            :rules="{
              required: { allowFalse: false },
              regex: /^(\d*\.)?\d+$/,
              min: 3,
              max: 10,
            }"
            :bails="false"
            v-slot="{ errors }"
          >
            <input type="text" placeholder="Amount" v-model="trans.amount" />
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field">
          <select name="type" v-model="trans.type" value="Debit">
            <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div class="form-field">
          <select name="type" v-model="trans.category" value="Housing">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="form-field">
          <ValidationProvider
            name="Date"
            rules="required"
            :bails="false"
            v-slot="{ errors }"
          >
            <datetime
              placeholder="Enter Date"
              v-model="trans.date"
              value-zone="America/New_York"
              :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
            ></datetime>
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-field" v-if="!loading">
          <!-- <input disabled type="submit" value="Complete" /> -->
          <button
            :class="[valid ? 'complete' : 'not-valid']"
            :disabled="!valid"
            type="submit"
          >
            {{ valid ? "Complete" : "Disabled" }}
          </button>
        </div>

        <div class="form-field" v-else>
          <input @keyup.enter="onSend()" type="submit" value="Processing" />
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { types, categories } from "@/model/types.js";
//import moment from "moment";

export default {
  props: ["id", "edit", "title", "acct", "loading"],
  components: {},
  data() {
    return {
      types: types,
      categories: categories,
      trans: {
        id: this.id !== undefined ? this.id : "",
        acct_id: this.acct,

        date:
          this.edit === null || this.edit === undefined ? "" : this.edit.date,

        amount:
          this.edit === null || this.edit === undefined ? "" : this.edit.amount,
        name:
          this.edit === null || this.edit === undefined ? "" : this.edit.name,
        type:
          this.edit === null || this.edit === undefined
            ? "Debit"
            : this.edit.type,
        category:
          this.edit == null || this.edit === undefined
            ? "Housing"
            : this.edit.category,
        state: {
          isValidation: false,
        },
      },
    };
  },
  methods: {
    async onSend() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        //console.log("form has issues");
      }
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });

      this.$emit("new", this.trans);
    },
  },
};
</script>
