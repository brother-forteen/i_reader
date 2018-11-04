<template>
    <div class="not_found_wrap">
      <div class="not_found_wrap_bg"></div>
      <p class="what_done">What have you done?</p>
      <p class="eng_warning">Now Go Back Using Below Link</p>
      <p class="number_404">404</p>
      <p class="error">! ERROR DECETED!</p>
      <img src="../assets/images/404_search.jpg" alt="">
      <div class="back" @click="goBack()">返回首页</div>
    </div>
</template>

<script>
    export default {
        methods: {
          goBack(){
            this.$router.replace("/home");
          }
        },
        activated() {

        },
        beforeRouteEnter(to, from, next) {
            next(vm => {

            })
        }
    }
</script>
<style lang="scss">
  @import "../assets/style/pages/404_NotFound";
</style>
