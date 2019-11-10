<template>
  <nav class="d-flex justify-content-around sticky-top">
    <div class="mt-2 mb-2">
      <h1>Bizzy Recruitment Test</h1>
    </div>
    <div class="d-flex">
      <button @click.prevent="goToHome()" class>Home</button>
      <button @click.prevent="goToAdd()" class>Add User</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToAdd() {
      this.$router.push('/add');
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #1993ff;
}
h1 {
  font-weight: normal;
  font-size: 25px;
  color: whitesmoke;
  margin: 0px;
}
h1 {
  color: whitesmoke;
}
button {
  width: 100px;
  font-weight: bold;
  color: whitesmoke;
  background-color: #1993ff;
  border: none;
  transition: 0.5s all;
}
button:hover {
  font-weight: bold;
  color: #1993ff;
  background-color: whitesmoke;
  border: none;
  transition: 0.5s all;
}
</style>
