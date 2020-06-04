<template>
  <div class="render-child">
    <ReturnBtn class="back top-spacer" :back="back" @nav="goBack()" />

    <div class="new-form">
      <AccountForm
        :loading="loading"
        title="Edit Account"
        :edit="edit"
        @new="onSubmit"
        :id="this.$route.params.id"
      />
    </div>
  </div>
</template>

<script>
import AccountForm from "@/components/AccountForm";
//import { prevRoutes } from "@/mixins/prevRoute.js";
import ReturnBtn from "@/components/btns/ReturnBtn";

export default {
  name: "Edit",
  props: ["id"],
  //mixins: [prevRoutes],
  components: {
    AccountForm,
    ReturnBtn,
  },
  data() {
    return {
      loading: false,
      back: "fas fa-chevron-left",
      //   prevRoute: null
    };
  },
  computed: {
    edit() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["account/GET_ACCOUNT"](id);
    },
    errors() {
      return this.$store.getters["base/get_errors"];
    },
  },
  methods: {
    onSubmit(value) {
      this.loading = true;
      // console.log(value);
      this.$store
        .dispatch("account/UPDATE_ACCOUNT", value)
        .then(() => {
          this.$toast.open({
            message: "Account updated",
            type: "success",
            position: "top",
          });
          this.loading = false;
          this.goBack();
        })
        .catch(() => {
          this.loading = false;
          this.$toast.open({
            message:
              this.errors !== null
                ? this.errors
                : "Connection Error, please try again",
            type: "error",
            position: "top",
          });
        });
    },
  },
};
</script>
