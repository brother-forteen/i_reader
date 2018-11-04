<template>
  <transition name="slide_down">
    <div class="title_wrapper" v-show="titleAndMenuShow">
      <div class="title_wrapper_left" @click="goRouter('back')">
        <span class="icon-7 icon"></span>
      </div>
      <div class="title_wrapper_right">
        <div class="icon_wrapper" @click="goRouter('shoppingCar')">
          <span class="icon-1 icon"></span>
        </div>
        <div class="icon_wrapper">
          <span class="icon-6 icon" v-if="!userInfo" @click="goRouter('login')"></span>
          <img src="../assets/images/icon.jpg" v-if="userInfo" @click="goRouter('user')" alt="">
        </div>
        <div class="icon_wrapper" @click="goRouter('more')">
          <span class="icon-uniE900 icon"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: this.$store.state.userInfo
            }
        },
        props: {
          titleAndMenuShow: {
            type: Boolean,
            default: false
          }
        },
        methods: {
          goRouter(str){
            switch (str) {
              case 'shoppingCar':
                this.$router.push('/shoppingCar');
                break;

              case 'login':
                this.$router.push('/login');
                break;

              case 'user':
                this.$router.push('/user');
                break;

              case 'more':
                this.$router.push('/directory');
                break;

              case 'back':
                this.$router.go(-1);
                break;

              default:
                break;

            }
          }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {

            })
        }
    }
</script>
<style lang="scss">
  @import "./../assets/style/componentCss/titleBar";
</style>
