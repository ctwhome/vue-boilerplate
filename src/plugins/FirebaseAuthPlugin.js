import store from "../store";
import Firebase from "firebase/app";
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

        const auth = await firebase.auth().signInWithPopup(provider)
          .catch(e => console.log("User Auth failed", e));
        const user = auth.user;

        // write user
        const userUid = user.uid;
        firebase.database().ref("users").set({ [userUid]: { signedIn: true } })
          .catch(e => console.log("Write user in databse Failed", e));


      },

      logout: async () => {
        store.commit("updateUserRole", null);
        await auth.signOut();
      }


    };

    // REGISTER USER TO VUEX
    auth.onAuthStateChanged(user => {
      store.commit("updateUser", { user });
      store.commit("updateUserRole", user ? getUserRole(user.email) : null);

    });
  }
};
