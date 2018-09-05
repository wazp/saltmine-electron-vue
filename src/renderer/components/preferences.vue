<template>
  <div id="preferences">
    <h1>Preferences</h1>
  </div>
</template>

<script>
  export default {
    name: 'preferences',
    data () {
      return {

      }
    }
  }
</script>

<style lang="less">
  #preferences{
    position:absolute;
    left:50vw;
    top:50vh;
    height:80vh;
    width:90vw;
    transform:translate(-50%,-50%);
    background:#ccc;
    display:none;
    opacity:0;
    transition:opacity 600ms ease-out;

    body.preferences &{
      display:block;
    }
    body.preferences.is-open &{
      opacity:1;
    }
  }
</style>