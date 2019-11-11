<template>
  <div class="p-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
    <div class="user-card d-flex flex-column">
      <h6 class="mt-3">User info</h6>
      <hr class="mb-0" style="width: 90%; border: 0.5px solid #2c3e50;" />
      <div class="p-3 d-flex flex-column align-items-start">
        <p>Name : {{user.name}}</p>
        <p>Email : {{user.email}}</p>
      </div>
      <div class="btn-area d-flex justify-content-between" style>
        <button
          @click="editData(user._id)"
          class="btn-card p-2"
          style="border-bottom-right-radius: 3px;"
        >
          <i class="fas fa-edit"></i> Edit
        </button>
        <button
          @click="deleteData(user._id)"
          class="btn-card p-2"
          style="border-bottom-right-radius: 3px;"
        >
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const url = 'http://35.234.205.110/users';

export default {
  props: ['user'],
  methods: {
    deleteData(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          axios({
            url: `${url}/${id}`,
            method: 'delete',
          })
            .then(({ data }) => {
              this.$store.dispatch('fetchData', data);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            })
            .catch((err) => {
              Swal.fire('Errors', err.response.data.message, 'error');
            });
        }
      });
    },
    editData(id) {
      this.$router.push(`/edit/${id}`);
    },
  },
};
</script>

<style scoped>
.user-card {
  border-radius: 3px;
  /* border: 2px solid #1993ff; */
  background-color: whitesmoke;
  transition: 0.5s all;
}
.user-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.5s all;
}
p {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}
h6 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}
.btn-card {
  border: none;
  color: whitesmoke;
  background-color: #2c3e50;
  width: 100%;
  transition: 0.5s all;
}
.btn-card:hover {
  background-color: #1993ff;
  color: whitesmoke;
  transition: 0.5s all;
}
</style>
