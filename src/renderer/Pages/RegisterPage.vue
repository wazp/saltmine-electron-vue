<template>
    <div class="page">
        <h1>Register</h1>
        <input type="text" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
        <button @click="signUp">Register!</button>
        <router-link to="/">Home</router-link>
    </div>
</template>

<script>
export default {
  name: 'register-page',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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