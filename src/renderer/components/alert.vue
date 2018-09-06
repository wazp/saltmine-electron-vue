<template>
  <div id="alert" v-if="error.length">
    <div>
      <p>{{error}}</p>
      <button @click="$store.commit('App/setError', '')" id="alertOkBtn">OK</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'alert',
  computed: {
    ...mapState('App', ['error'])
  },
  updated () {
    if (this.error) {
      document.getElementById('alertOkBtn').focus()
    }
  }
}
</script>

<style lang="less" scoped>
  div#alert{
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background:rgba(255, 255, 255, 0.7) 
  }
  div#alert > div{
    position:absolute;
    left:50vw;
    top:50vh;
    width:90vw;
    transform:translate(-50%,-50%);
    background:#ccc;
    padding: 20px;
    text-align:center;
  }
</style>