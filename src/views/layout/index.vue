<template>
  <div class="layout-container">
      <router-view></router-view>
      <van-tabbar  class="layout-tabbar" route>
  <van-tabbar-item replace to="/home">
      <template #icon>
          <i class="toutiao toutiao-shouye"></i>
      </template>
      <span>首页</span>
      </van-tabbar-item>
  <van-tabbar-item replace to="/question">
      <template #icon>
          <i class="toutiao toutiao-wenda"></i>
      </template>
      <span>问答</span>
      </van-tabbar-item>
  <van-tabbar-item replace to="/video">
      <template #icon>
          <i class="toutiao toutiao-shipin"></i>
      </template>
      <span>视频</span>
      </van-tabbar-item>
  <van-tabbar-item replace to="/my">
      <template #icon>
          <i class="toutiao toutiao-wode"></i>
      </template>
      <span>{{this.$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>