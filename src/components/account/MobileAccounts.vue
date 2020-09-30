<template>
  <div class="mobile-transaction">
    <MobileList
      :accounts="account"
      v-for="account in accounts"
      :key="account.id"
    />
  </div>
</template>

<script>
import MobileList from "@/components/account/MobileAccountsList";
export default {
  props: ["accounts"],
  components: {
    MobileList
  }
};
</script>
