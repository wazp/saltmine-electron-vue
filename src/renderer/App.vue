<template>
  <div id="app" class="loaded">
    <titlebar></titlebar>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import titlebar from './components/header.vue'

  export default {
    name: 'saltmine',
    components: {
      titlebar
    },
    mounted () {
      document.getElementsByTagName('body')[0].classList.remove('loading')
    }
  }
</script>

<style lang="less">
  @import "./assets/less/main.less";
  body{
    background:#fff;
    -ms-overflow-style: scrollbar;
    -webkit-app-region:drag;
    width:100vw;
    height:100vh;
    overflow:hidden;
  }
  #content{
    -webkit-app-region:no-drag;
    height:calc(100vh - 40px);
    background:#fff;
  }
</style>