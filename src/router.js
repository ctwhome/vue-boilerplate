import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import About from "./views/About.vue";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";

import SignOut from "./views/SignOut";
import Profile from "./views/Profile";
import { getUserRole } from "./services/checkRole";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    // {
    //   path: "/admin",
    //   name: "admin",
    //   component: Admin,
    //   meta: {
    //     authRequired: true,
    //     role: "premium"
    //   }
    // },


    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        authRequired: true
      }
    },
    {
      path: "/signout",
      name: "signout",
      component: SignOut
    }
  ]
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.authRequired)) {

    // Doesn't exist user
    if (!store.state.user) {
      next({
        path: "/signin",
        query: { redirect: to.fullPath }
      });
    }
    // User exists
    else {

      // console.info("👉️ store.state.user.role ", store.state.user.role);


      // if specified role
      if (to.matched.some(record => !!record.meta.role)
        && to.matched.some(record => {

          // console.log("🎹 user role", store.state.user.role);
          // console.info("👉️ store.state.user.mail ", store.state.user.email);
          // console.info("👉️ getUserRole(store.state.user.email ", getUserRole(store.state.user.email));
          // console.info("👉️ record.meta.role ", record.meta.role);

          if (getUserRole(store.state.user.email) === "admin") {
            // console.log("🎹 is admin");
            return false;
          } else return record.meta.role !== getUserRole(store.state.user.email);

        })
      ) {
        next({
          path: "/signin",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    }

  } else {
    next();
  }
})
;

export default router;
