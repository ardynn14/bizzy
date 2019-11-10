import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

const url = 'http://localhost:3000';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    fetchData(state, data) {
      state.users = data;
    },
  },
  actions: {
    fetchData(context) {
      Swal.fire({
        title: 'Loading...',
      });
      Swal.showLoading();
      axios({
        url: `${url}/users`,
        method: 'get',
      })
        .then(({ data }) => {
          Swal.close();
          context.commit('fetchData', data);
        })
        .catch((err) => {
          Swal.close();
          console.log(err);
        });
    },
  },
  modules: {
  },
});
