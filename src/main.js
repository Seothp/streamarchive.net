import Vue from "vue";
import axios from "axios";
import "./plugins/bus";
import "./plugins/vuetify";
import "./plugins/infiniteScroll";
import store from "./plugins/store";
import router from "./plugins/router";

import App from "./App.vue";

Vue.config.productionTip = false;

let endpoints = {};
axios.get(process.env.VUE_APP_URL + "/streamers").then(response => {
  endpoints = Object.fromEntries(new Map(response.data.map(item => [item.name, item["storageEndpoint"]])));
  endpoints = Object.fromEntries(Object.entries(endpoints).filter(item => item[1] !== "https://idinahui.com"));
  Vue.prototype.$endpoints = endpoints;
  Vue.prototype.$streamers = Object.keys(endpoints);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
