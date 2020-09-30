<template>
  <div ref="navi" class="nav">
    <nav class="navbar">
      <div class="logo-item">
        <div class="logo">
          <svg
            width="47px"
            height="28px"
            viewBox="0 0 47 28"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 58 (84663) - https://sketch.com -->
            <title>MT</title>
            <desc>Created with Sketch.</desc>
            <g
              id="Dashboard"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              font-family="DINAlternate-Bold, DIN Alternate"
              font-size="39"
              font-weight="bold"
            >
              <g
                id="Desktop-HD"
                transform="translate(-17.000000, -24.000000)"
                fill="#A8A5EB"
              >
                <text id="MT">
                  <tspan x="15" y="52">MT</tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div class="desktop">
        <NavLinks />
      </div>
      <div class="mobile">
        <NavLinks @exit="logOut" @close="closeNav" />
      </div>

      <div class="exit-item cursors" @click="logOut()">
        <svg
          width="28px"
          height="22px"
          viewBox="0 0 28 22"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <!-- Generator: Sketch 58 (84663) - https://sketch.com -->
          <title>ion-exit</title>
          <desc>Created with Sketch.</desc>
          <g
            id="Dashboard"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Desktop-HD"
              transform="translate(-26.000000, -972.000000)"
              fill-rule="nonzero"
            >
              <g id="ion-exit" transform="translate(24.000000, 967.000000)">
                <g id="Icon" fill="#A8A5EB">
                  <path
                    d="M21,23.5 L21,17 L11.9375,17 C11.3852153,17 10.9375,16.5522847 10.9375,16 C10.9375,15.4477153 11.3852153,15 11.9375,15 L21,15 L21,8.5 C20.9979332,6.56786013 19.4321399,5.00206683 17.5,5 L5.5,5 C3.56786013,5.00206683 2.00206683,6.56786013 2,8.5 L2,23.5 C2.00206683,25.4321399 3.56786013,26.9979332 5.5,27 L17.5,27 C19.4321399,26.9979332 20.9979332,25.4321399 21,23.5 L21,23.5 Z"
                    id="Icon-Path"
                  />
                  <path
                    d="M26.585625,17 L23.293125,20.293125 C22.9195961,20.6862893 22.9275244,21.3055311 23.3109967,21.6890033 C23.6944689,22.0724756 24.3137107,22.0804039 24.706875,21.706875 L29.706875,16.706875 C30.0970904,16.3164038 30.0970904,15.6835962 29.706875,15.293125 L24.706875,10.293125 C24.3137107,9.91959611 23.6944689,9.92752436 23.3109967,10.3109967 C22.9275244,10.6944689 22.9195961,11.3137107 23.293125,11.706875 L26.585625,15 L21,15 L21,17 L26.585625,17 Z"
                    id="Icon-Path"
                  />
                </g>
                <rect id="ViewBox" x="0" y="0" width="32" height="32" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </nav>
  </div>
</template>

<script>
import NavLinks from "@/components/nav/nav-links";
import gsap from "gsap";
export default {
  components: {
    NavLinks,
  },
  data() {
    return {
      nav: "",
      toggle: false,
      tl: "",
    };
  },
  methods: {
    closeNav() {
      this.tl.reverse();
      this.toggle = !this.toggle;
    },
    logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/auth");
      });
    },
  },
  mounted() {
    //grab the btn
    const toggle = document.querySelector(".menu");
    //grab the nav

    //setup gsap
    this.tl = gsap.timeline({ paused: true });

    this.tl.from(".nav", {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "back",
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
  },
};
</script>
