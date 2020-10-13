<template>
  <div class="m-modal">
    <div class="modal-header">
      <h4>Set Date Range For Analytics</h4>
      <div class="icon-circle">
        <i class="fad fa-chevron-circle-down"></i>
      </div>
    </div>
    <div class="modal-body">
      <h4>Date Ranges</h4>
      <div class="modal-range">
        <Range @range="onRange" @reset="onReset" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import Range from "@/components/shared/Range";

export default {
  components: {
    Range
  },
  data() {
    return {
      tl: "",
      toggle: false
    };
  },

  methods: {
    onRange() {},
    onReset() {}
  },
  mounted() {
    const toggle = document.querySelector(".cal-btn");
    const close = document.querySelector(".icon-circle");

    toggle.addEventListener("click", () => {
      if (this.toggle) {
        this.tl.reverse();
        this.toggle = false;
      } else {
        this.tl.play();
        this.toggle = true;
      }
      //this.tl.play();
    });
    close.addEventListener("click", () => {
      this.tl.reverse();
      this.toggle = false;
    });
    this.tl = gsap.timeline({ paused: true });
    this.tl.from(".m-modal", {
      duration: 0.8,
      y: "100%",

      ease: "Back.easeOut(0.7)"
    });
  }
};
</script>

<style lang="scss" scoped></style>
