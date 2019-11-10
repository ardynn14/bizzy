<template>
<div>
  <h1 style="font-weight: bolder; margin: 0px;" class="mt-3">User List</h1>
  <div class="d-flex justiy-content-center row mt-2 p-5" style="width: 100vw;">
    <Card v-for="user in $store.state.users" :key="user._id" :user="user"></Card>
  </div>
</div>
</template>

<script>
import Card from '../components/Card.vue';

export default {
  components: {
    Card,
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchData');
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
</style>
