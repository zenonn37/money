import axios from "axios";
export const base = (axios.defaults.baseURL = `${process.env.VUE_APP_API}`);
