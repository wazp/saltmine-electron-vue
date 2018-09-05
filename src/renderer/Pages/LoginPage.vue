<template>
    <div class="page">
        <h1>Login</h1>
        <form>
        <input type="text" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
        <button @click="login">Login!</button>
        </form>
        <router-link to="/register">Register</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login-page',
  data () {
    return {
      password: ''
    }
  },
  computed: {
    ...mapState('User', ['email'])
  },
  methods: {
    login () {
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          console.log(user)
          this.$store.commit('User/setUser', user.user)
          // this.$firebase.firestore().collection('users').doc(user.user.uid).set({
          //   first: 'Test',
          //   second: 'Test2'
          // })
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
  .page{
    width:90vw;
    margin:50px auto 0;
    text-align:center;
  }

  input{width:80%;margin-bottom:10px;}
  button{width:80%;margin-bottom: 20px;}
  a{display:block;}
</style>