<template>
  <div class="trans-container">
    <div class="category-icon"></div>
    <div class="transaction">
      <div class="title">
        <router-link
          :to="{ name: 'accounts.analytics', params: { account: accounts.id } }"
          tag="h1"
          >{{ accounts.name }}</router-link
        >
        <small>{{ accounts.type }} {{ accounts.created | month_short }}</small>
      </div>
      <div class="amount">
        {{ accounts.balance | currency }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["accounts"],
  data() {
    return {};
  },
};
</script>
