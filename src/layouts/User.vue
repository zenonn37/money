<template>
  <div class="app">
    <Nav />
    <Header />
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import Nav from "@/components/nav/nav";

import Header from "@/components/Header";
export default {
  components: {
    Nav,
    Header
  }
};
</script>
