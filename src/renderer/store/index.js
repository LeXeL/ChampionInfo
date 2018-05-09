import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    localVersion: ''
  },
  mutations:{
    setVersion(state,version){
        state.localVersion = version;
    }
  }
})
