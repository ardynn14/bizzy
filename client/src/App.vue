<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  data() {
    return {
      users: [],
    };
  },
  components: {
    Navbar,
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #2c3e50; */
  height: 100vh;
}
.btn-add {
  color: rgb(109, 109, 109);
  margin-top: 20px;
  border: 2px solid rgb(109, 109, 109);
  border-radius: 3px;
  transition: 0.5s all;
}
.btn-add:hover {
  margin-top: 20px;
  border: 2px solid rgb(109, 109, 109);
  background-color: rgb(109, 109, 109);
  color: whitesmoke;
  transition: 0.5s all;
}
</style>
