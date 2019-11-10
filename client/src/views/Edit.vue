<template>
  <div>
    <h1 style="font-weight: bolder; margin: 0px;" class="mt-3">Edit User</h1>
    <div class="container">
      <button @click.prevent="goToHome()" class="btn back-btn mt-3" style="width: 50%">Back</button>
    </div>
    <div class="container mt-5">
      <form @submit.prevent="editUser()" class="d-flex flex-column align-items-center">
        <div style="width: 50%" class="d-flex flex-column">
          <label class="label">Name</label>
          <input v-model="name" type="text" class placeholder="input name here..." />
        </div>
        <div style="width: 50%" class="d-flex flex-column">
          <label class="label mt-3">Email</label>
          <input
            v-model="email"
            type="email"
            class
            placeholder="input email here...(example@example.com)"
          />
        </div>
        <div class="mt-4" style="width: 50%">
          <button type="submit" class="btn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const url = 'http://localhost:3000/users';

export default {
  data() {
    return {
      name: '',
      email: '',
    };
  },
  methods: {
    editUser() {
      Swal.fire({
        title: 'Saving...',
      });
      Swal.showLoading();
      const user = {
        id: this.$route.params.id,
        name: this.name,
        email: this.email,
      };
      axios({
        url: `${url}/${user.id}`,
        method: 'patch',
        data: user,
      })
        .then(({ data }) => {
          this.name = '';
          this.email = '';
          Swal.close();
          Swal.fire('Success', `${data.name} has been updated`, 'success');
          this.$router.push('/');
        })
        .catch((err) => {
          Swal.close();
          Swal.fire('Errors', err.response.data.message, 'error');
        });
    },
    goToHome() {
      this.$router.push('/');
    },
  },
  created() {
    Swal.fire({
      title: 'Saving...',
    });
    Swal.showLoading();
    const user = {
      id: this.$route.params.id,
    };
    axios({
      url: `${url}/${user.id}`,
      method: 'get',
    })
      .then(({ data }) => {
        Swal.close();
        this.name = data.name;
        this.email = data.email;
      })
      .catch((err) => {
        Swal.close();
        Swal.fire('Errors', err.response.data.message, 'error');
      });
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  font-size: 20px;
}
input {
  padding: 3px;
  height: 40px;
  border: none;
  border-bottom: 2px solid #1993ff;
}
input:focus {
  outline: none;
  border: none;
  border-bottom: 2px solid #1993ff;
}
button {
  width: 100%;
  background-color: whitesmoke;
  color: black;
  font-weight: bold;
  font-size: 20px;
  transition: 0.5s all;
}
button:hover {
  width: 100%;
  background-color: #1993ff;
  color: whitesmoke;
  transition: 0.5s all;
}
</style>
