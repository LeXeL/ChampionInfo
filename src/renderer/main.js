import Vue from 'vue'
import App from './App'

import axios from 'axios'
import VueLodash from 'vue-lodash'
import Vue2Filters from 'vue2-filters'
import Vuetify from 'vuetify'
import VueMarkdown from 'vue-markdown'

import router from './router'
import store from './store'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$http = axios
Vue.config.productionTip = false

//Use package
Vue.use(Vue2Filters);
Vue.use(VueLodash, { name: '_' });
Vue.use(Vuetify);
Vue.use(VueMarkdown)

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
