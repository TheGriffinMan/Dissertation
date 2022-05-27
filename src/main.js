import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
Vue.config.productionTip = false;
import { BootstrapVue } from 'bootstrap-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/base.scss';
Vue.use(BootstrapVue);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
