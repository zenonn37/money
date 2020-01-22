import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

import {
  required,
  email,
  min,
  max,
  alpha,
  numeric,
  alpha_spaces,
  regex
} from "vee-validate/dist/rules";
// Add the required rule
extend("required", required);

// Add the email rule
extend("email", email);

extend("min", min);
extend("max", max);
extend("alpha", alpha);
extend("numeric", numeric);
extend("alpha_spaces", alpha_spaces);
extend("regex", regex);

// Register it globally
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
