<template>
    <div class="ebook_wrap">

      <title-bar :titleAndMenuShow = "titleAndMenuShow"></title-bar>

      <div class="read_wrapper">
        <div id="read"></div>
        <div class="read_mask">
          <div class="read_left" @click="clickEvent('prev')"> &laquo; </div>
          <div class="read_center" @click="clickEvent('center')"></div>
          <div class="read_right" @click="clickEvent('next')"> &raquo; </div>
        </div>
      </div>

      <menu-bar
        :titleAndMenuShow = "titleAndMenuShow"
        :fontSizeList = "fontSizeList"
        :defaultFontSize = "defaultFontSize"
        @setFontSize = "setFontSize"
        :themeList = "themeList"
        @setTheme = "setTheme"
        :defaultTheme = "defaultTheme"
        :bookAvailable = "bookAvailable"
        @onProgressChange = "onProgressChange"
        :navigation = "navigation"
        @jumpTo = "jumpTo"
        ref = "menubar"
      ></menu-bar>


    </div>
</template>

<script>
    import Epub from 'epubjs';
    import TitleBar from '../components/TitleBar';
    import MenuBar from '../components/MenuBar';

    export default {
      components: {
        TitleBar,
        MenuBar
      },
      data() {
          return {
            book: null,
            rendition: null,
            themes: null,
            navigation: null,
            titleAndMenuShow: false,
            fontSizeList: [
              {fontSize: 12},
              {fontSize: 14},
              {fontSize: 16},
              {fontSize: 18},
              {fontSize: 20},
              {fontSize: 22},
              {fontSize: 24}
            ],
            defaultFontSize: 16,
            themeList: [
              {
                name: 'default',
                style: {
                  body: {
                    'color': '#000',
                    'background': '#dddddd'
                  }
                }
              },
              {
                name: 'eye',
                style: {
                  body: {
                    'color': '#000',
                    'background': '#73f990'
                  }
                }
              },
              {
                name: 'night',
                style: {
                  body: {
                    'color': '#fff',
                    'background': '#101F22'
                  }
                }
              },
              {
                name: 'gold',
                style: {
                  body: {
                    'color': '#000',
                    'background': '#f9ed3d'
                  }
                }
              }
            ],
            defaultTheme: 0,
            bookAvailable: false
          }
      },
      methods: {
        // 电子书的解析和渲染
        showEpub(){
          // 生成book
          this.book = new Epub(this.$store.state.DOWNLOAD_URL);
          // 生成Rendition, 通过book.renderTo
          this.rendition = this.book.renderTo('read',{
            width: window.innerWidth,
            height: window.innerHeight
          });
          // 通过Rendition.display 渲染电子书
          this.rendition.display();

          // 获取theme对象
          this.themes = this.rendition.themes;
          // 设置默认字体
          this.setFontSize(this.defaultFontSize);

          // 主题
          // this.themes.register(name, styles)
          // this.themes.select(name)
          this.registerTheme();
          this.setTheme(this.defaultTheme);

          // 设置进度条
          // 获取location 对象
          // 通过epubjs 的钩子函数来实现
          this.book.ready.then(() => {
            this.navigation = this.book.navigation;
            return this.book.locations.generate();
          }).then((result) => {
            this.locations = this.book.locations;
            this.bookAvailable = true;
          })
        },

        // 上一页 下一页
        clickEvent(str){
          switch (str){
            case 'prev':
              if(this.rendition){
                this.rendition.prev();
              }
              break;

            case "next":
              if(this.rendition){
                this.rendition.next();
              }
              break;

            case "center":
              this.titleAndMenuShow = !this.titleAndMenuShow;
              break;

            default:
                break;
          }
        },

        // 设置字体大小
        setFontSize(fontSize){
          this.defaultFontSize = fontSize;
          if(this.themes){
            this.themes.fontSize(fontSize + 'px');
          }
        },

        // 注册主题
        registerTheme(){
          this.themeList.forEach(theme => {
            this.themes.register(theme.name, theme.style);
          })
        },

        // 设置主题
        setTheme(index){
          this.defaultTheme = index;
          this.themes.select(this.themeList[index].name);
        },

        // 进度条设置 progress 进度条数值 （0-100）
        onProgressChange(progress){
          const percentage = progress / 100;
          const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
          this.rendition.display(location);
        },

        // 根据链接跳转到指定位置
        jumpTo(url){
          this.rendition.display(url);
          // 隐藏标题栏和菜单栏
          this.titleAndMenuShow = false;

          // 隐藏目录
          this.$refs.menubar.operateContent(false);

          // 隐藏菜单栏弹出的设置栏
          this.$refs.menubar.hideSetting();
        }
      },
      activated() {

      },
      mounted(){
        this.showEpub();
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {

          })
      }
    }
</script>
<style lang="scss" scoped>
  @import "../assets/style/pages/home";
</style>
