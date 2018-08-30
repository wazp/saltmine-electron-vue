<template>
    <div class="page">
        <h1>Login</h1>
        <input type="text" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
        <button @click="login">Login!</button>
        <router-link to="/register">Register</router-link>
    </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('/')
        },
        (err) => {
          alert(err)
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>

</style>