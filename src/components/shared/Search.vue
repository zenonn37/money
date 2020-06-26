<template>
  <div class="search">
    <div class="search-input">
      <input
        type="text"
        placeholder="Enter Search Term"
        v-model="term"
        @keyup="onPush()"
      />
    </div>
    <div class="reset" @click="onPush()">
      <img src="@/assets/svg/reset.svg" alt="Reset" />
    </div>
    <div class="reset" @click="onReset()">
      <img src="@/assets/svg/reset.svg" alt="Reset" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      term: ""
    };
  },

  methods: {
    onPush() {
      this.$emit("search", this.term);
    }
  }
};
</script>
