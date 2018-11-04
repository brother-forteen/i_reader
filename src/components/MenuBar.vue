<template>
  <div class="menu_bar">
    <transition name="slide_up">
      <div class="menu_wrapper" v-show="titleAndMenuShow" :class="{'menu_wrapper_box_shandow': !settingShow}">
        <div class="icon_wrapper" @click="operateContent(true)">
          <span class="icon-5 icon"></span>
        </div>
        <div class="icon_wrapper" @click="operate('setting', 2)">
          <span class="icon-2 icon"></span>
        </div>
        <div class="icon_wrapper" @click="operate('setting', 1)">
          <span class="icon-3 icon"></span>
        </div>
        <div class="icon_wrapper" @click="operate('setting', 0)">
          <span class="icon">A</span>
        </div>
      </div>
    </transition>

    <transition name="slide_up">
      <div class="menu_bar_setting_wrapper" v-show="settingShow && titleAndMenuShow">
        <div class="menu_bar_setting_font_size" v-if="showTag === 0">
          <div class="menu_bar_setting_font_size_preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="menu_bar_setting_font_size_select">
            <div class="menu_bar_setting_font_size_select_wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
              <div class="select_wrapper_line"></div>
              <div class="select_wrapper_point_wrapper">
                <div class="select_wrapper_point" v-show="defaultFontSize === item.fontSize"></div>
              </div>
              <div class="select_wrapper_line"></div>
            </div>
          </div>
          <div class="menu_bar_setting_font_size_preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>

        <div class="menu_bar_setting_theme" v-if="showTag === 1">
          <div class="menu_bar_setting_theme_item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
            <div class="setting_theme_preview" :style="{background: item.style.body.background}" :class="{'setting_theme_preview_border': item.style.body.background === '#dddddd'}"></div>
            <div class="setting_theme_text" :class="{'setting_theme_text_checked': index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>

        <div class="menu_bar_setting_progress" v-if="showTag === 2">
          <div class="menu_bar_setting_progress_wrapper">
            <input class="menu_bar_setting_progress_input" :style="{backgroundSize:  `${progress}% 100%`}" type="range" max="100" min="0" step="1" @change="onProgressChange('change', $event.target.value)" @input="onProgressChange('input', $event.target.value)" :value="progress" :disabled="!bookAvailable" ref="progress">
          </div>
          <div class="menu_bar_setting_progress_text">
            <span>{{bookAvailable ? progress + "%" : "加载中..."}}</span>
          </div>
        </div>
      </div>
    </transition>

    <content-view
      :showContent = "showContent"
      v-show = "showContent"
      :navigation = "navigation"
      :bookAvailable = "bookAvailable"
      @jumpTo = "jumpTo"></content-view>
    <transition name="fade">
      <div class="content_mask" v-show="showContent" @click="operateContent(false)">

      </div>
    </transition>
  </div>

</template>

<script>
    import ContentView from './Content';
    export default {
        components: {
          ContentView: ContentView
        },
        data() {
            return {
              settingShow: false,
              showTag: 0,
              progress: 0,
              showContent: false
            }
        },
        props: {
          titleAndMenuShow: {
            type: Boolean,
            default: false
          },
          fontSizeList: Array,
          defaultFontSize: Number,
          themeList: Array,
          defaultTheme: Number,
          bookAvailable: Boolean,
          navigation: Object
        },
        methods: {
          // tab操作
          operate(str, tagNumber){
            switch (str){
              case 'setting':
                if(this.showTag == tagNumber || this.settingShow == false){
                  this.settingShow = !this.settingShow;
                }
                this.showTag = tagNumber;
                break;

              default:
                break;
            }
          },

          // 设置字体大小
          setFontSize(fontSize){
            this.$emit('setFontSize', fontSize)
          },

          // 设置主题
          setTheme(index){
            this.$emit('setTheme', index);
          },

          // 设置进度
          onProgressChange(str, progress){
            switch (str){
              // 进度条松开后出发事件，根据进度条数值跳转到指定位置
              case 'change':
                this.$emit('onProgressChange', progress);
                break;

              // 拖动进度条时触发事件
              case 'input':
                this.progress = progress;
                // this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
                break;

              default:
                break;

            }
          },

          // 显示目录
          operateContent(bool){
            if(bool){
              this.settingShow = false;
            }
            this.showContent = bool;
          },

          // 隐藏设置
          hideSetting(){
              this.settingShow = false;
          },

          jumpTo(url){
            this.$emit('jumpTo', url);
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
  @import "./../assets/style/componentCss/menuBar";
</style>
