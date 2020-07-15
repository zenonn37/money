<template>
  <div class="search business">
    <div class="search-input">
      <input type="text" placeholder="Enter Search Term" v-model="term" @keyup.enter="onPush()" />
    </div>
    <div class="tool" @click="onPush()">
      <img src="@/assets/svg/search.svg" alt="Enter" />
    </div>
    <div class="tool" @click="onReset()">
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
