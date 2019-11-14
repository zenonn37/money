<template>
  <aside :class="[nav !== true ? 'move' : 'navi']">
    <div class="logo-box">
      <div class="logo">MONEY</div>
      <div class="hambuger" @click="onClose()">
        <img src="../assets/menu.png" alt="menu" />
      </div>
    </div>

    <ul class="menu">
      <li v-if="window < 1024">
        <router-link to="/dashboard" tag="a">
          <i class="fas fa-chart-line"></i>
          <span @click="onClose()">Dashboard</span>
        </router-link>
      </li>

      <li v-else>
        <router-link to="/dashboard" tag="a">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/wallet" tag="a">
          <i class="fas fa-wallet"></i>
          <span>Wallet</span>
        </router-link>
      </li>-->
      <li v-if="window < 1024">
        <router-link to="/account" tag="a">
          <i class="fas fa-user-circle"></i>
          <span @click="onClose()">My Account</span>
        </router-link>
      </li>
      <li v-else>
        <router-link to="/account" tag="a">
          <i class="fas fa-user-circle"></i>
          <span>My Account</span>
        </router-link>
      </li>

      <!-- <li>
        <router-link to="/expenses" tag="a">
          <i class="fas fa-receipt"></i>
          <span>Expenses</span>
        </router-link>
      </li>-->
      <li v-if="window < 1024">
        <router-link to="/settings" tag="a">
          <i class="fas fa-cog"></i>
          <span @click="onClose()">Settings</span>
        </router-link>
      </li>

      <li v-else>
        <router-link to="/settings" tag="a">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </router-link>
      </li>

      <li v-if="window < 1024">
        <router-link to="/help" tag="a">
          <i class="far fa-question-circle"></i>
          <span @click="onClose()">Help</span>
        </router-link>
      </li>
      <li v-else>
        <router-link to="/help" tag="a">
          <i class="far fa-question-circle"></i>
          <span>Help</span>
        </router-link>
      </li>
    </ul>
    <!-- <TransactionsModal /> -->
  </aside>
</template>

<script>
import TransactionsModal from "@/components/modals/TransactionsModal";
export default {
  components: {
    TransactionsModal
  },
  data() {
    return {
      route: this.$route.name,
      width: 0
    };
  },
  methods: {
    onClose() {
      console.log("close");

      this.$store.dispatch("base/set_aside");
    },
    resizeTracker(e) {
      //console.log(window.innerWidth);
      this.width = window.innerWidth;
    }
  },
  computed: {
    nav() {
      return this.$store.getters["base/get_nav"];
    },
    window() {
      return this.width < 1 ? window.innerWidth : this.width;
    }
  },
  created() {
    window.addEventListener("resize", this.resizeTracker);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeTracker);
  }
};
</script>