
<template>
<v-app dark>
  <navbar-component></navbar-component>
  <main>
    <transition name="fade">
      <v-content>
        <router-view></router-view>
      </v-content>
    </transition>
  </main>
 <footer-component></footer-component>
</v-app>
</template>


<script>
import navbarComponent from './components/navbar.vue'
import footerComponent from './components/footer.vue'

export default {
  data() {
    return {};
  },
  components:{
      navbarComponent,
      footerComponent
  },
  methods: {}
};
</script>

<style>
body{
   background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
}


</style>
