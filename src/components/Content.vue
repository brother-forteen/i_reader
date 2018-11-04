<template>
    <transition name="slide-right">
      <div class="content">
        <div class="content_wrapper" v-if="bookAvailable">
          <div class="content_item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
            <span class="text">{{item.label}}</span>
          </div>
        </div>
        <div class="empty" v-else>加载中...</div>
      </div>
    </transition>
</template>

<script>
    export default {
        props: {
          showContent: Boolean,
          navigation: Object,
          bookAvailable: Boolean
        },
        methods: {
          jumpTo(url){
            this.$emit('jumpTo', url)
          }
        }
    }
</script>
<style lang="scss">
  @import "./../assets/style/componentCss/content";
</style>
