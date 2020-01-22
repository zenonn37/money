<template>
  <component :is="layout">
    <transition
      name="router-anim"
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view />
    </transition>
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
