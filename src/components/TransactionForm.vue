<template>
  <div class="forms-container">
    <div class="forms">
      <h1>{{title}}</h1>
      <form @submit.prevent="onSend()">
        <div class="form-field">
          <input type="text" placeholder="Name" v-model="trans.name" />
        </div>
        <div class="form-field">
          <input type="text" placeholder="Amount" v-model="trans.amount" />
        </div>
        <div class="form-field">
          <select name="type" v-model="trans.type">
            <option disabled value>Transaction Type</option>
            <option value="Debit">Debit</option>
            <option value="Check">Check</option>
            <option value="Credit Card">Credit Card</option>
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
export default {
  props: ["id", "edit", "title", "acct", "loading"],
  components: {},
  data() {
    return {
      trans: {
        id: this.id !== undefined ? this.id : "",
        acct_id: this.acct,
        // this.edit === null || this.edit === undefined ? "" : this.edit.id,
        amount:
          this.edit === null || this.edit === undefined ? "" : this.edit.amount,
        name:
          this.edit === null || this.edit === undefined ? "" : this.edit.name,
        type:
          this.edit === null || this.edit === undefined ? "" : this.edit.type
      }
    };
  },
  methods: {
    onSend() {
      // console.log(this.props.id);
      this.$emit("new", this.trans);
    }
  }
};
</script>

