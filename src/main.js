import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vmodal from 'vue-js-modal'
import Guest from './layouts/Guest'
import User from './layouts/User'
import "./filters/filter";
import "./style/main.css";
import "./plugins/vue-datetime";
import "./plugins/vue-paginate";
import "./plugins/vee-validate";


Vue.config.productionTip = false;

Vue.use(vmodal);

Vue.component('user', User);
Vue.component('no-user', Guest);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
