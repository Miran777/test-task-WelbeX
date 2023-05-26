<template>
  <Navbar></Navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';

  export default {
  components: { Navbar }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 16px;
  background: #2c3e50;
}

.app {
  padding: 10px;

}
</style>