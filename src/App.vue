<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      userInfo: null
    }
  },
  methods: {

  },
  watch: {
    userInfo(){
      let userInfo = sessionStorage.getItem("userInfo");
      if(userInfo){
        this.$store.dispatch('userInfoUpdate', JSON.parse(userInfo));
      }
      return userInfo;
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + 'px';
})
</script>

<style>

</style>
