<template>
  <div>
    <form class="date-range" @submit.prevent="onRange()">
      <div class="form-field">
        <datetime
          placeholder="Enter Date"
          v-model="date"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
        ></datetime>
      </div>
      <div class="form-field">
        <datetime
          placeholder="Enter Date"
          v-model="date2"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
        ></datetime>
      </div>
      <button type="submit">GO</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      date: "",
      date2: ""
    };
  },

  methods: {
    onRange() {
      const data = {
        date: this.date,
        date2: this.date2,
        id: this.id
      };
      console.log(data);

      this.$emit("range", data);
    }
  }
};
</script>

