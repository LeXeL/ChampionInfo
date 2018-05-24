import Vue from 'vue'
import App from './App'

import axios from 'axios'
import VueLodash from 'vue-lodash'
import BootstrapVue  from 'bootstrap-vue'
import VueResource from 'vue-resource'
import Vue2Filters from 'vue2-filters'
import Vuetify from 'vuetify'

import router from './router'
import store from './store'

import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons/iconfont/material-icons.css'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

//Use package
Vue.use(Vue2Filters);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueLodash, { name: '_' });
Vue.use(Vuetify);

//Filters

Vue.filter('role', function(value){
  if (value == 'DUO_SUPPORT') return 'SUPPORT'
  if (value == 'DUO_CARRY') return 'ADC'
  else return value
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
