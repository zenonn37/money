<template>
  <div class="category-search business">
    <div class="input-box">
      <select name="category" id="category" v-model="cat" value="Housing">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="tool" @click="onReset()">
      <img src="@/assets/svg/reset.svg" alt="Reset" />
    </div>
  </div>
</template>

<script>
import { categories } from "@/model/types.js";
export default {
  data() {
    return {
      categories,
      cat: ""
    };
  },
  methods: {
    onChangedCategory(val) {
      this.$emit("category", val);
    },
    onReset() {
      this.$emit("reset");
    }
  },
  watch: {
    cat: function(val) {
      // console.log(val, old);
      this.onChangedCategory(val);
    }
  }
};
</script>
