import Vue from "vue";
import Router from "vue-router";
import Album from "./views/Album.vue";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/album/:album",
      name: "album",
      component: Album,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/*",
      redirect: { name: "notFound" },
    },
    {
      path: "/NotFound",
      name: "notFound",
      component: NotFound,
    },
  ],
});
