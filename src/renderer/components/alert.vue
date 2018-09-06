<template>
  <div v-if="error.length">
    <p>{{error}}</p>
    <button @click="$store.commit('App/setError', '')">OK</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'alert',
  computed: {
    ...mapState('App', ['error'])
  }
}
</script>

<style lang="less" scoped>
  div{
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