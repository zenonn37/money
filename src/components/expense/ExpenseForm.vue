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
            name="Name"
            rules="required|min:2|max:30|alpha_spaces"
            :bails="false"
            v-slot="{ errors }"
          >
            <input type="text" placeholder="Name" v-model="exp.name" />
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
              min: 1,
              max: 10
            }"
            :bails="false"
            v-slot="{ errors }"
          >
            <input type="text" placeholder="Amount" v-model="exp.amount" />
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-field">
          <select name="type" v-model="exp.category" value="Housing">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <!-- <div class="form-field">
          <input type="checkbox" id="checkbox" v-model="exp.repeat" />
          <label for="checkbox">{{ exp.repeat }}</label>
        </div>-->

        <div class="form-field" v-if="edit === null || dates === true">
          <ValidationProvider
            name="Due Date"
            rules="required"
            :bails="false"
            v-slot="{ errors }"
          >
            <datetime
              placeholder="Enter Date"
              v-model="exp.date"
              value-zone="America/New_York"
              :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
            ></datetime>
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field-hidden" v-else>
          <img
            class="cursors"
            src="@/assets/svg/edit.svg"
            @click="onEditDate()"
            alt="Edit"
          />
          <p>Due, {{ exp.date | day }}</p>
        </div>

        <div class="form-field" v-if="!loading">
          <!-- <input disabled type="submit" value="Complete" /> -->
          <button
            :class="[valid ? 'complete' : 'not-valid']"
            :disabled="!valid"
            type="submit"
          >
            {{ valid ? "Complete" : "Form Incomplete" }}
          </button>

          <button class="cancel" @click="onCancel()">Cancel</button>
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
  props: ["id", "edit", "title", "loading"],
  components: {},
  data() {
    return {
      types: types,
      categories: categories,
      dates: false,
      exp: {
        id: this.id !== undefined || this.id !== null ? this.id : "",
        // acct_id:
        //   this.acct !== undefined
        //     ? this.acct
        //     : "no" || (this.edit !== null && this.edit !== undefined)
        //     ? this.edit.acct_id
        //     : "",

        date:
          this.edit === null || this.edit === undefined ? "" : this.edit.date,

        amount:
          this.edit === null || this.edit === undefined ? "" : this.edit.amount,
        name:
          this.edit === null || this.edit === undefined ? "" : this.edit.name,
        // repeat:
        //   this.edit === null || this.edit === undefined
        //     ? "Debit"
        //     : this.edit.type,
        category:
          this.edit == null || this.edit === undefined
            ? "Housing"
            : this.edit.category,
        state: {
          isValidation:
            this.edit !== null || this.edit !== undefined ? true : false
        }
      }
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

      this.exp.date = this.exp.date.slice(0, 19).replace("T", " ");
      this.exp.amount = parseFloat(this.exp.amount);
      console.log(this.exp);

      this.$emit("new", this.exp);
    },
    onCancel() {
      this.$router.push("/expenses");
    },
    onEditDate() {
      this.dates = !this.dates;
    }
  }
};
</script>
