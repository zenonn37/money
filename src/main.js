import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vmodal from "vue-js-modal";
import Guest from "./layouts/Guest";
import User from "./layouts/User";
import "./filters/filter";
import "./style/main.css";
import "./plugins/vue-datetime";
import "./plugins/vue-paginate";
import "./plugins/vee-validate";
import "./plugins/vue-filters";
import "./plugins/toast";
import "./plugins/vue-scroll";
import "./plugins/vue-bars";
import "./plugins/vue-apex";

import interceptor from "./interceptor";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

interceptor();

Vue.config.productionTip = false;

Vue.use(vmodal);

Vue.component("user", User);
Vue.component("no-user", Guest);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogged) {
      // console.log("not logged");

      next({
        name: "auth"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogged) {
      // console.log("logged");

      next({
        name: "dashboard"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
