<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import footerComponent from './components/footer.vue'
export default {
  
  data() {
    return {};
  },
  components:{
      'navbar':navbar,
      footerComponent
      
  },
  methods: {}
};
</script>

<style>
body{
   background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
}
.container{
    margin-top: 50px;
}
</style>
