import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import VueLazyload from "vue-lazyload";
import Loading from "../public/loading.svg";
import Store from "./store.js";

import "./styles/global.css";

console.log(Loading);

Vue.config.productionTip = false;
Vue.use(Vuex).use(VueLazyload, {
  loading: Loading,
  // observer: true,
  // observerOptions: {
  //   rootMargin: "0px",
  //   threshold: 0,
  // },
});
const store = new Vuex.Store(Store);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
