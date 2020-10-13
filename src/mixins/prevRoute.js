export const prevRoutes = {
  data() {
    return {
      prevRoute: null
    };
  },
  methods: {
    goBack() {
            if (this.prevRoute.path) {
              this.$router.push(this.prevRoute.path);
            }else{
              this.$router.push('/account');
            }
     
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
  created() {}
};
