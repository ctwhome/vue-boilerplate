<template>
    <div id="app">

        <div class="grid">
            <router-link class="logo flex" to="/">
                <img src="./assets/logo.svg" alt="">
                <div class="md-title"><span class="no-mobile">Vue 2</span>boilerplate</div>
            </router-link>
            <Navigation></Navigation>
        </div>

        <div class="paid-account"
             v-show="!userRole">
            Premium Account (Coming soon!)
        </div>

        <transition>
            <router-view/>
        </transition>


    </div>
</template>

<script>

  import Navigation from "./components/Navigation";
  // import { firebasedb } from "./main";
  import { mapState } from "vuex";


  export default {
    // beforeMount() {
    //   firebasedb.ref("server/status").once("value", snapshot => {
    //     this.serverStatus = snapshot.val();
    //   });
    //
    // },
    data: () => ({
      serverStatus: {},
      manual: {},
      bot: {},
      bitmexData: null,
      runningServer: true
    }),
    components: {
      Navigation
    },

    computed: {
      ...mapState(["user", "userRole"])

    },
    mounted() {

    }
  };
</script>
<style lang="scss" scoped>

    @media only screen and (max-width: 500px) {
        .no-mobile {
            display: none;
        }
    }

    #app {
        display: grid;
        margin: 0 auto;
        max-width: 1024px;
        padding: 8px;
    }

    .grid {
        display: flex;
        align-items: center;
        margin: 16px 0;

        .flex {
            flex-grow: 1;
        }
    }

    .logo {
        display: flex;
        align-items: center;
        color: white !important;

        &:hover {
            text-decoration: none;
        }
    }

    img {
        max-width: 50px;
        height: 50px;
        margin-right: 16px;
    }


    .paid-account {
        border: 1px solid white;
        padding: 40px;
        text-align: center;
    }
</style>
