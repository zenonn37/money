<template>
  <div class="app">
    <main class="main-content">
      <SideBar />
      <div class="content">
        <Header />
        <div class="container">
          <div class="render">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
export default {
  components: {
    SideBar,
    Header
  }
};
</script>
