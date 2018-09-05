<template>
  <div>
    <h1>This is the landing page!</h1>
    <router-link to="/login">Login!</router-link>
    <router-link to="/register">Register!</router-link>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data: {

    }
  }
</script>

<style>
  .top{
    height:2rem;
    background:#333;
  }
  a{display:block;}
</style>
