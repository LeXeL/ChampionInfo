import Vue from 'vue'
import Router from 'vue-router'
import champions from "../components/champions.vue";
import info from "../components/info.vue";
import topwinrate from "../components/topwinrate.vue";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'champions',
      component: champions
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/info/:key',
      component:info
    },
    {
        path:'/topwinrate',
        component:topwinrate
    }
  ]
})
