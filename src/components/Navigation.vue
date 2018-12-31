<template>
    <div class="main">

        <div class="nav">
            <router-link v-show="!!userRole" to="/">Home</router-link>
            <router-link v-show="!!userRole" :to="{name:'admin'}">Admin</router-link>
            <router-link :to="{name:'about'}">About</router-link>


        </div>
        <md-menu v-show="!!user" class="avatar">
            <md-avatar md-menu-trigger><img :src="!!user && user.photoURL" alt=""></md-avatar>
            <md-menu-content>
                <md-menu-item :to="{name: 'profile'}"> Profile</md-menu-item>
                <md-menu-item :to="{name: 'signout'}"> Logout</md-menu-item>
            </md-menu-content>
        </md-menu>
        <sign-in v-show="!user"></sign-in>
    </div>
</template>
<script>
  import { mapState } from "vuex";
  import SignIn from "./SignIn";

  export default {
    components: { SignIn },
    computed: {
      ...mapState(["user", "userRole"])
    }
  };
</script>
<style>
    .main {
        display: grid;
        grid-auto-flow: column;
    }

    @media only screen and (max-width: 500px) {
        .nav {
            max-width: 200px;
        }
    }

    .nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-right: 8px;
        justify-content: flex-end;
    }

    a {
        margin-right: 8px;
    }

    .avatar{
        display: grid;
        align-items: center;
    }

</style>

