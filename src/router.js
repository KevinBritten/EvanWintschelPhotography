import Vue from "vue";
import Router from "vue-router";
import Albums from "./views/Albums.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Albums
    },
    {
      path: "/albums",
      name: "albums",
      component: Albums
    },
    {
      path: "/people",
      name: "people",
      component: () =>
        import(/* webpackChunkName: "people" */ "./views/People.vue")
    },

    {
      path: "/people/:id",
      name: "person",
      component: () =>
        import(/* webpackChunkName: "person" */ "./views/Person.vue"),
      props: route => ({ id: route.params.id })
    }
  ]
});
