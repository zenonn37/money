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

        <div class="form-field">
          <input type="submit" value="Complete" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "edit", "title"],
  components: {},
  data() {
    return {
      trans: {
        acct_id: this.id,
        amount: this.edit === null ? "" : this.edit.amount,
        name: this.edit === null ? "" : this.edit.name,
        type: this.edit === null ? "" : this.edit.type
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

