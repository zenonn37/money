<template>
  <div>
    <ReturnBtn class="top-spacer" :back="back" @nav="goBack()" />

    <div class="new-form">
      <AccountForm :loading="loading" :edit="null" title="New Account" @new="onSubmit" :id="null" />
    </div>
  </div>
</template>

<script>
import AccountForm from "@/components/AccountForm";
import { prevRoutes } from "@/mixins/prevRoute.js";
import ReturnBtn from "@/components/btns/ReturnBtn";
export default {
  name: "NewAccount",
  mixins: [prevRoutes],
  components: {
    AccountForm,
    ReturnBtn
  },
  data() {
    return {
      loading: false,
      back: "fas fa-chevron-left"
    };
  },
  methods: {
    onSubmit(value) {
      this.loading = true;
      console.log(value);

      this.$store.dispatch("account/NEW_ACCOUNTS", value).then(() => {
        console.log("success");
        setTimeout(() => {
          this.loading = true;
          console.log("done");
          //callled from mixin method
          this.goBack();
        }, 500);
      });
    }
  }
};
</script>
