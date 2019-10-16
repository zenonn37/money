<template>
  <div class="render-child">
    <ReturnBtn :back="back" @nav="goBack()" />

    <div class="new-form">
      <AccountForm :loading="loading" title="Edit Account" :edit="edit" @new="onSubmit" :id="id" />
    </div>
  </div>
</template>

<script>
import AccountForm from "@/components/AccountForm";
import { prevRoutes } from "../mixins/prevRoute.js";
import ReturnBtn from "@/components/btns/ReturnBtn";

export default {
  name: "Edit",
  props: ["id"],
  mixins: [prevRoutes],
  components: {
    AccountForm,
    ReturnBtn
  },
  data() {
    return {
      loading: false,
      back: "fas fa-chevron-left"
      //   prevRoute: null
    };
  },
  computed: {
    edit() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters["account/GET_ACCOUNT"](id);
    }
  },
  methods: {
    onSubmit(value) {
      this.loading = true;
      console.log(value);
      this.$store.dispatch("account/UPDATE_ACCOUNT", value).then(() => {
        this.loading = false;
        this.goBack();
      });
    }
  }
};
</script>

