import axios from 'axios'

// export const money = axios.create({
//     baseURL: `${process.env.VUE_APP_PRO}`
// });
const AUTH_TOKEN = "Bearer " + localStorage.getItem('access_token');
//money.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const money = axios.defaults.baseURL = `${process.env.VUE_APP_PRO}`;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;