<template>
    <div class="nav-mobile">
     <NavLinks @exit="logOut" @close="closeNav" />
    </div>
</template>

<script>
import NavLinks from "@/components/nav/nav-links";
  import gsap from 'gsap'
    export default {

    components:{
    NavLinks
        },
        data() {
            return {
                tl:""
            }
        },
    methods: {
    closeNav() {
      this.$emit("close");
      console.log("test");
    },
    logOut() {
      this.$emit("exit");
    }
  },
    mounted() {
    //grab the btn
    const toggle = document.querySelector(".menu");
    //grab the nav

    //setup gsap
    this.tl = gsap.timeline({ paused: true });

    this.tl.from(".nav-mobile", {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "back"
    });

    //setup functions
    toggle.addEventListener("click", () => {
      if (!this.toggle) {
        this.tl.play();
        this.toggle = !this.toggle;
      } else {
        this.tl.reverse();
        this.toggle = !this.toggle;
      }
    });
  }
        
    }
</script>

<style lang="scss" scoped>

</style>