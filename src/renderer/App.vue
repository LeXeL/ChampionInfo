<template>
  <div>
    <navbar></navbar>
    <div class="container">
        <transition name="router-anim" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
            <router-view></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
export default {
  
  data() {
    return {};
  },
  components:{
      'navbar':navbar
  },
  methods: {}
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

body{
   background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
}
.container{
    margin-top: 50px;
}
.router-anim-enter-active {
  animation: coming .5s;
  animation-delay: .2s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 1s;
}


</style>
