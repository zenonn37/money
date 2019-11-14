<template>
  <div class="render-child">
    <div class="page-header">
      <div class="page-title">Profile</div>
    </div>
    <div class="profile-container">
      <div class="profile" v-if="user !== null">
        <div class="settings-user">
          <div class="user-icon">
            <img src="@/assets/user.svg" alt="User Icon" />
          </div>
          <div class="user-login">
            <h5>username</h5>
            <h2>{{user.email}}</h2>
            <hr />
          </div>
          <div class="user-name">
            <h5>name</h5>
            <h2>{{user.name}}</h2>
            <hr />
          </div>
          <div class="user-email">
            <h5>email</h5>
            <h2>{{user.email}}</h2>
            <hr />
          </div>
        </div>
      </div>

      <div v-else>
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  components: {
    Loader
  },

  data() {
    return {};
  },
  computed: {
    user() {
      const user = this.$store.getters["GET_USER"];

      return user !== null || user !== undefined ? user.data : null;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>