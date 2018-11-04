<template>
    <div class="directory_wrap">
      <h2 class="directory_title">All Books</h2>
      <ul class="directory">
        <li class="directory_item" v-for="(item, index) in bookList" :key="index" @click="checkBook(item)">{{index+1 + "." + item.name.replace(/(.epub)/ig, '')}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bookList: null
            }
        },
        methods: {
          // 获取图书列表
          getAllBooks(){
            this.$http({
              url: 'static/json/directory.json',
              method: 'get'
            }).then(response => {
              if(response.status == 200 && response.data.ret == 200){
                this.bookList = response.data.result
              }
            })
          },

          // 选择图书
          checkBook(item){
            this.$store.dispatch('downloadUrlUpdate', `/static/book/${item.url}`);
            this.$router.replace("/home");
          }
        },
        created(){
          this.getAllBooks();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {

            })
        }
    }
</script>
<style lang="scss">
  @import "./../assets/style/pages/directory";
</style>
