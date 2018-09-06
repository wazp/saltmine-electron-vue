<template>
    <div class="page">
        <img src="@/assets/images/saltmine_logo.svg" />
        <p>Welcome to Saltmine! Please login below, or hit "Register" to create a new user.</p>
        <form>
        <betterinput type="text" label="email" v-model="email" />
        <betterinput type="password" label="password" v-model="password" />
        <button @click="login">Login!</button>
        </form>
        <router-link to="/register">Register</router-link>
    </div>
</template>

<script>
import betterinput from '@/components/betterinput'

export default {
  name: 'login-page',
  components: {
    betterinput
  },
  data () {
    return {
      password: ''
    }
  },
  computed: {
    email: {
      get: function () {
        return this.$store.state.User.email
      },
      set: function (value) {
        this.$store.commit('User/setUser', { email: value, uid: null })
      }
    }
  },
  mounted () {
    // focus email or password depending on if user have saved email or not
    let email = (this.$store.state.User.email) ? this.$store.state.User.email.length : 0
    let input = document.querySelector((!email) ? 'input[type=text]' : 'input[type=password]')
    input.focus()
  },
  methods: {
    login () {
      this.$firebase.auth().signInWithEmailAndPassword(this.$store.state.User.email, this.password).then(
        (user) => {
          console.log(user)
          // save user info to persistent store
          this.$store.commit('User/setUser', user.user)
          // create first document specific to logged in user under "users"
          // this.$firebase.firestore().collection('users').doc(user.user.uid).set({
          //   first: 'Test',
          //   second: 'Test2'
          // })
          this.$router.replace('/')
        },
        (err) => {
          this.$store.commit('App/setError', err.message)
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    width:90vw;
    margin:20px auto 0;
    text-align:center;
  }
  img{height:40vh;margin-bottom:20px;}
  p{width:70%;margin:0 auto 10px;}
  form{width:70%;margin: 0 auto;}
  button{width:80%;margin-bottom: 20px;}
  a{display:block;}
</style>