<template>
    <div class="project-nav">

        <div class="mobile-nav">
            <MobileNav @exit="logOut"/>

        </div>
        <div class="desktop-nav">
           <DesktopNav @exit="logOut"/>
        </div>

    </div>
</template>

<script>
import DesktopNav from '@/components/nav/desktop.vue'
import MobileNav from '@/components/nav/mobile.vue'
    export default {
        components:{
            DesktopNav,
            MobileNav
        },
        methods: {
            logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/auth");
      });
    }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>