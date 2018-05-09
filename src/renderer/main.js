import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import BootstrapVue  from 'bootstrap-vue'
import VueLodash from 'vue-lodash'
import VueResource from 'vue-resource'
import Vue2Filters from 'vue2-filters'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

//Use package
Vue.use(BootstrapVue);
Vue.use(Vue2Filters)
Vue.use(VueResource);
Vue.use(VueLodash, { name: '_' });

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
  template: '<App/>'
}).$mount('#app')
