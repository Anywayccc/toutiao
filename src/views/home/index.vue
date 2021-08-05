<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button type="info" size="mini" icon="search" round to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tab栏 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs" >
      <van-tab :title="obj.name" v-for="obj in channels" :key='obj.id'>
        <!-- 内容栏 列表 -->
        <articleList :channels='obj'></articleList>
    </van-tab> 

    <template #nav-right>
      <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isPop=true"><i class="toutiao toutiao-gengduo"></i></div>
    </template>
    </van-tabs>
    
    <!-- 频道编辑弹出层 -->
  <van-popup
  v-model="isPop"  
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '100%' }">

  <!-- 弹出层内容 -->
  <Popup :myChannels="channels" :active="active" @updatedBar="updatedBar"></Popup>
  
  </van-popup>
<!-- 频道编辑弹出层end -->
  </div>
</template>

<script>
import { getTab } from '../../../api';
import articleList from './articles/list.vue'
import Popup from './popup/pop.vue'
import { mapState } from 'vuex'
import { getItem } from '../../../utils/storge';

export default {
  name:'home',
  components:{
    articleList,
    Popup
  },
  data() {
    return {
      active: 1,
      channels:[],
      isPop: false, //弹出层展示状态
    }
  },
  computed:{
    ...mapState(['user'])
  },
  created(){
    this.loadChannels()
  },
  methods:{
    async loadChannels(){
      try{
        //获取本地数据
        const localChannels=getItem('TOKEN_CHANNELS')
        //已经登录或者本地没有数据 发起请求获取数据
        if(this.user || !localChannels){
          const {data}=await getTab()
          this.channels = data.data.channels
        }else{
           this.channels=localChannels
        }
        // const {data}=await getTab()
        // this.channels = data.data.channels
        // console.log(this.channels);
      }catch(err){
        this.$toast('获取频道列表数据失败')
      }
    },
    updatedBar(index,isPop=true){
      this.active=index
      this.isPop=isPop
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  /deep/.van-tabs__wrap {
     position: fixed;
      top: 92px;
      z-index: 1000;
      left: 0;
      right: 0;
  }
  .page-nav-bar {
    .van-button {
      width: 555px;
      height: 64px;
      font-size: 28px;
      background-color: #5babfb;
      border: 0;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/.van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
     
      font-size: 27px;
      color: #777777;
    }
  }
  /deep/.van-tab--active .van-tab__text {
    color: #333 !important;
  }
  /deep/ .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  /deep/ .van-tabs__nav {
    padding: 0;

  }
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }&:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}

}
</style>
