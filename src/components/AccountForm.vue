<template>
  <div class="forms-container">
    <div class="forms">
      <h1>{{title}}</h1>
      <form @submit.prevent="onSend()">
        <div class="form-field">
          <input type="text" placeholder="Name" v-model=" account.name" />
        </div>
        <div class="form-field">
          <input type="text" placeholder="Balance" v-model=" account.balance" />
        </div>
        <div class="form-field">
          <select name="type" v-model=" account.type" value="Checking">
            <option v-for="t in  types" :key="t" :value="t">{{t}}</option>
          </select>
        </div>

        <div class="form-field" v-if="!loading">
          <input type="submit" value="Complete" />
        </div>

        <div class="form-field" v-else>
          <input type="submit" value="Processing" />
        </div>
      </form>
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

        balance:
          this.edit === null || this.edit === undefined
            ? ""
            : this.edit.balance,
        name:
          this.edit === null || this.edit === undefined ? "" : this.edit.name,
        type:
          this.edit === null || this.edit === undefined
            ? "Checking"
            : this.edit.type
      }
    };
  },
  methods: {
    onSend() {
      // console.log(this.props.id);
      console.log(this.account);

      this.$emit("new", this.account);
    }
  }
};
</script>

