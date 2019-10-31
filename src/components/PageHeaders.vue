<template>
  <div class="page-header">
    <div class="page-title">{{title}}</div>

    <!-- <form @submit.prevent="onSend()">
      <div class="form-field">
        <datetime
          placeholder="Enter Date"
          v-model="date"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
        ></datetime>

        <span class="errors">{{errors[0]}}</span>
      </div>
      <button type="submit">go</button>
    </form>-->
    <div class="page-menu">
      <ul>
        <li>
          <a href="#">{{menu1}}</a>
        </li>
        <li>
          <a href="#">{{menu2}}</a>
        </li>
        <li>
          <a href="#">{{menu3}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "menu1", "menu2", "menu3", "id"],
  data() {
    return {
      date: ""
    };
  },
  methods: {
    onSend() {
      console.log(this.date);
      const data = {
        id: this.id,
        date: this.date
      };
      this.$store.dispatch("transactions/find_day", data).then(() => {
        console.log("loaded");
      });
    }
  }
};
</script>

