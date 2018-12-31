import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import { sync } from "vuex-router-sync";
import { database } from "firebase";          <----- UNCOMMENT THIS ANS SET UP FIREBASE PROJECT
import firebase from "firebase/app";
// import "firebase/firestore";
import "./base.scss";


import store from "./store";

// import FirebaseAuthPlugin from "./plugins/FirebaseAuthPlugin";

// Vue.use(FirebaseAuthPlugin);

sync(store, router);

// export const firebasedb  = database();
// export const firestoredb = firebase.firestore();

// Disable deprecated features
// firestoredb.settings({
//   timestampsInSnapshots: true
// });

Vue.config.productionTip = false;
Vue.config.devtools      = true;

Vue.use(VueMaterial);

Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  ...App
}).$mount("#app");
