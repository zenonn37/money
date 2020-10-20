<template>
    <div class="nav-desktop">
     <Logo/>
     <div class="desktop">
     <NavLinks/>
     </div>
    </div>
</template>

<script>
import Logo from '@/components/nav/logo'
import NavLinks from "@/components/nav/nav-links";
    export default {

        components:{
            Logo,
            NavLinks
        },
        methods: {
            logOut() {
      this.$emit("exit");
    }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>