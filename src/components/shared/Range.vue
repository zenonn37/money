<template>
  <div class="business">
    <form @submit.prevent="onRange()" class="range">
      <div class="form-field">
        <datetime
          placeholder="Start"
          v-model="date"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        ></datetime>
      </div>
      <div class="form-field">
        <datetime
          placeholder="End"
          v-model="date2"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        ></datetime>
      </div>
      <div class="btn-control">
        <button type="submit">GO</button>
      </div>
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
      // console.log(data);

      this.$emit("range", data);
    }
  }
};
</script>
