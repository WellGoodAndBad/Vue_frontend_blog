<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item router-link to="/">Home Page</b-nav-item>
          <b-nav-item router-link to="/create-account">Create Account</b-nav-item>
          <b-nav-item router-link to="/sign-in">Sigh In</b-nav-item>
          <b-nav-item v-on:click="logoutUser">Logout</b-nav-item>
          <b-nav-item v-model="dataLgn" v-show="dataLgn != null">{{dataLgn.email}}</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~bootstrap';
@import '~bootstrap-vue';
</style>

<script>
export default {
  name: 'App',

  data(){
      return {  
        dataLgn: JSON.parse(localStorage.getItem('loginData')) || '',
      }
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
    }
  },
};
</script>
