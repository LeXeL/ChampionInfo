
<template>
<v-app dark>
  <navbar-component></navbar-component>
  <main>
    <v-container fluid class="pa-0" >
      <v-layout column>
        <router-view></router-view>
      </v-layout>
    </v-container>
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
html, body {
  height: 100%;
  width: 100%;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 4px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: rgb(33,33,33);
}

</style>
