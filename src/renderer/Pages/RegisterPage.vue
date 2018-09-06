<template>
    <div class="page">
        <img src="@/assets/images/saltmine_logo.svg" />
        <form>
        <betterinput type="text" label="email" v-model="email" />
        <betterinput type="password" label="password" v-model="password" />
        <button @click="signUp">Register!</button>
        </form>
        <router-link to="/">Home</router-link>
    </div>
</template>

<script>
import betterinput from '@/components/betterinput'

export default {
  name: 'register-page',
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
    console.log(this.email)
    let email = (this.$store.state.User.email) ? this.$store.state.User.email.length : 0
    console.log(email)
    let input = document.querySelector((!email) ? 'input[type=text]' : 'input[type=password]')
    input.focus()
  },
  methods: {
    signUp () {
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
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
    margin:50px auto 0;
    text-align:center;
  }
  img{height:40vh;margin-bottom:20px;}
  form{width:70%;margin: 0 auto;}
  button{width:80%;margin-bottom: 20px;}
  a{display:block;}
</style>