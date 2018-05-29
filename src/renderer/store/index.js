import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    localVersion: '',
    lolVersion:'',
    champions:[]
  },
  mutations:{
    setLocalVersion(state,version){
        state.localVersion = version;
    },
    setLoLVersion(state,version){
      state.lolVersion = version;
    },
    setChampionInfo(state,info){
      state.champions = info;
    }
  },
  actions:{
    async getChampionInfo(state){
      try {
        let data = await axios.get("http://ddragon.leagueoflegends.com/cdn/" +state.state.localVersion +"/data/en_US/champion.json")      
        state.commit('setChampionInfo',data.data.data)        
      } catch (error) {
        console.log(error)
      }

    },
    async getLoLCurrentVersion(state){
      try {
        let data = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
        state.commit('setLoLVersion', data.data[0]);
      } catch (error) {
        console.log(error)
      }
    },
    championById(state,key){
      console.log(key)
    }
  }
})
