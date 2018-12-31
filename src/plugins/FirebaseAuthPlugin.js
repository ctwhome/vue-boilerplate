import store from "../store";
import Firebase from "firebase";
import { firebaseConfig } from "../services/firebase";
import { getUserRole } from "../services/checkRole";

export default {
  install: (Vue) => {
    const firebase = Firebase.initializeApp(firebaseConfig);
    const auth     = firebase.auth();

    const provider = new Firebase.auth.GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    Vue.prototype.$auth = {


      //normal login with user and email
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass);
      },

      getToken: async () => {
        try {
          return await firebase.auth().currentUser.getIdToken().then(token => token);
        } catch {
          e => console.log("Token error", e);
        }
      },

      loginWithGoogle: async () => {
        try {

          const auth = await firebase.auth().signInWithPopup(provider);

          // console.log("🎹", auth);
          // This gives you a Google Access Token. You can use it to access the Google API.
          // eslint-disable-next-line
          const token = auth.credential.accessToken;
          // console.log("🎹", token);
          // The signed-in user info.
          // eslint-disable-next-line
          const user = auth.user;
          // console.log("🎹", user);

        } catch (error) {
          // Handle Errors here.
          /* eslint-disable */
          const errorCode    = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email        = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential   = error.credential;
          // ...
          /* eslint-enable */
        }
      },

      logout: async () => {
        store.commit("updateUserRole", null);
        await auth.signOut();
      }


    };

    // REGISTER USER TO VUEX
    auth.onAuthStateChanged(user => {
      store.commit("updateUser", {
        user
      });

      store.commit("updateUserRole", getUserRole(user.email));
    });
  }
};
