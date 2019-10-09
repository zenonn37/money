<template>
  <modal name="trans" :width="320" :height="400" @before-open="beforeOpen">
    <div class="forms-container">
      <div class="forms">
        <h1>New Transaction</h1>
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
  </modal>
</template>
<script>
export default {
  name: "TransactionModal",
  props: ["id"],
  components: {},
  data() {
    return {
      trans: {
        acct_id: "",
        amount: "",
        name: "",
        type: ""
      }
    };
  },
  methods: {
    beforeOpen(event) {
      console.log(event.params.id);
      this.acct_id = event.params.id;
    },
    onSend(event) {
      // console.log(this.props.id);
      const data = {
        acct_id: event.params.id,
        name: this.trans.name,
        amount: this.trans.amount,
        type: this.trans.type
      };
      this.$store.dispatch("NEW_TRANSACTION", data).then(() => {
        console.log("success");
      });
    }
  }
};
</script>
