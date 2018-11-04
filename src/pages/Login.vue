<template>
  <div class="login_wrap">
    <div class="login_input">
      <input type="text" placeholder="用户名或邮箱" v-model="user">
    </div>
    <div class="login_input">
      <input type="text" placeholder="密码" v-model="password">
    </div>
    <div class="login_input">
      <input type="text" placeholder="验证码" v-model="verificationCode">
      <div class="verification_code" @click="changeVerificationCode(verificationCodeShow)">
        <span :style="{transform: `rotateZ(${item.deg}deg)`}" v-for="(item, index) in verificationCodeShow" :key="index">{{item.code}}</span>
        <div class="verification_line"></div>
      </div>
    </div>
    <div class="confirm" :class="{'confirmForbidden': !submitBool}" @click="submit()">确   定</div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          user: null,
          password: null,
          verificationCode: null,
          verificationCodeShow: null,
          times: 0,
          codeNum: [
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            '1','2','3','4','5','6','7','8','9','0'
          ]
        }
      },
      methods: {
        changeVerificationCode(verificationCodeShow){
          let verificationShow = [];
          for (let i = 0; i < 4; i++){
            let Random = Math.floor(Math.random()*this.codeNum.length);
            verificationShow.push({
              code: this.codeNum[Random],
              deg: Math.random() * 60 - 30
            });
          }

          if(verificationShow === verificationCodeShow){
            this.changeVerificationCode(this.verificationCodeShow);
          }else {
            this.verificationCodeShow = verificationShow;
          }
        },

        submit(){
          let verificationCodeShow = '';
          for(let val of this.verificationCodeShow){
            verificationCodeShow += val.code;
          }

          if(verificationCodeShow.toLowerCase() === this.verificationCode.toLowerCase()){
            let userInfo = {
              nickName: '陈天澈',
              id: 101,
              phone: 18331167839,
              icon: '../assets/images/icon.jpg'
            };
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$store.dispatch('userInfoUpdate', userInfo);
            this.$router.go(-1);
          }else {
            alert("请输入正确的验证码");
            this.times++;
            this.changeVerificationCode(this.verificationCodeShow);
            return false;
          }
        }
      },
      mounted(){
        this.changeVerificationCode();
      },
      computed: {
        submitBool(){
          return this.user && this.password && this.verificationCode;
        }
      }
    }
</script>

<style lang="scss">
  @import "../assets/style/pages/login.scss";
</style>
