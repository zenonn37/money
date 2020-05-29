<template>
  <div class="app">
    <SideNav />
    <Header />
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import SideNav from "@/components/nav/side_nav";

import Header from "@/components/Header";
export default {
  components: {
    SideNav,
    Header
  }
};
</script>
