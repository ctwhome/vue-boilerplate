<template>
    <a @click="googleLogin">Log In with Google</a>
</template>
<script>
  import { mapGetters } from "vuex";
  import firebase from "firebase";


  const provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  export default {
    computed: {
      ...mapGetters(["user"]),

      nextRoute() {
        return this.$route.query.redirect || "/";
      }
    },
    watch: {
      user(auth) {
        // eslint-disable-next-line
        if (!!auth) {
          this.$router.replace(this.nextRoute);
        }
      }
    },
    methods: {
      async googleLogin() {
        await this.$auth.loginWithGoogle()
      }
    }
  };
</script>

<style>
    a {cursor: pointer}
</style>

