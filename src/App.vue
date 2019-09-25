<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
const default_layout = "no-user";
export default {
  components: {},
  computed: {
    layout() {
      return this.$route.meta.layout || default_layout;
    }
  }
};
</script>

