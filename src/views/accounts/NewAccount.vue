<template>
  <div class="base-forms">
   
    <div class="back cursors">
      <div @click="goBack()">
      <i class="fas fa-times"></i>
      </div>
    </div>
         
    <div class="new-form">
      <AccountForm
        :loading="loading"
        :edit="null"
        title="New Account"
        @new="onSubmit"
        :id="null"
      />
    </div>
  </div>
</template>

<script>
import AccountForm from "@/components/AccountForm";
import { prevRoutes } from "@/mixins/prevRoute.js";

export default {
  name: "NewAccount",
  mixins: [prevRoutes],
  components: {
    AccountForm,
  
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
  

      this.$store.dispatch("account/NEW_ACCOUNTS", value).then(() => {
       
        setTimeout(() => {
          this.loading = true;
          
          //callled from mixin method
          this.goBack();
        }, 500);
      });
    }
  }
};
</script>
