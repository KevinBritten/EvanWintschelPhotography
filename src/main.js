import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import VueLazyload from "vue-lazyload";
import Loading from "../public/loading.gif";
import Store from "./store.js";

Vue.config.productionTip = false;
Vue.use(Vuex).use(VueLazyload, {
  loading:
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
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
