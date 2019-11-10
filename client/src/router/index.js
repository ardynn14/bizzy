import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "Add" */ '../views/Add.vue'),
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "Edit" */ '../views/Edit.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
