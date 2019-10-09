export const prevRoutes = {
    data() {
        return {
            prevRoute: null
        };
    },
    methods: {
        goBack() {
            this.$router.push(this.prevRoute.path);
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from;
        });
    },
    created() {
        console.log('hi from mixin');

    },
}