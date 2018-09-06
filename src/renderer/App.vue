<template>
  <div id="app" class="loaded">
    <titlebar></titlebar>
    <div id="content">
      <router-view></router-view>
    </div>
    <preferences></preferences>
    <alert></alert>
  </div>
</template>

<script>
  import titlebar from './components/header.vue'
  import preferences from './components/preferences.vue'
  import alert from './components/alert.vue'

  export default {
    name: 'saltmine',
    components: {
      titlebar,
      preferences,
      alert
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
  #windowControl{
    -webkit-app-region:no-drag;
  }
  #content{
    -webkit-app-region:no-drag;
    height:calc(100vh - 40px);
    background:#fff;
  }
</style>