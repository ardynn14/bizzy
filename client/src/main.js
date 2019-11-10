import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {
  BootstrapVue,
  LayoutPlugin,
  ModalPlugin,
  CardPlugin,
  VBScrollspyPlugin,
  DropdownPlugin,
  TablePlugin,
} from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(ModalPlugin);
Vue.use(CardPlugin);
Vue.use(LayoutPlugin);
Vue.use(VBScrollspyPlugin);
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
