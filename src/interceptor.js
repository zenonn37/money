import axios from "axios";
import store from "./store/store";

export default function setup() {
  axios.interceptors.request.use(
    function(config) {
      //const token = localStorage.getItem("access_token");
      const token = store.getters.GET_AUTH;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
}
