<template>
  <div class="app">
    <main class="main-content">
      <SideBar />
      <div class="content">
        <div class="container">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
export default {
  components: {
    SideBar
  }
};
</script>

