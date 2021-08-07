<template>
  <div class="article-container">
    <!-- nav -->
    <van-nav-bar class="page-nav-bar" title="黑马头条" left-arrow @click-left="$router.back()"/>
    <div class="main-wrap">

    <!-- 加载中 -->
    <div class="loading-wrap" v-if="isLoading">
    <van-loading color="#1989fa" vertical>加载中</van-loading></div>

    <!-- 加载完成 文章详情 -->
    <div class="loading-detail" v-else-if="article.title">
       <!-- 文章标题 -->
    <h1 class="article-title">{{ article.title }}</h1>
    <!-- 作者信息 -->
    <van-cell class="user">
    <template #title>
    <span class="user-name">{{ article.aut_name }}</span>
    </template>

    <template #label>
    <span class="user-time">{{ article.pubdate | relativeTime }}</span>
    </template>

    <!-- 头像 -->
    <template #icon>
    <van-image
    class="avatar"
    round
    fit="cover"
    :src="article.aut_photo"
    />
    </template>
    <template #default>
    <!-- :isFollowed="article.is_followed"
    @onFollow='onFollow' -->
    <followuser 
    :userId='article.aut_id'
    v-model="article.is_followed"
    ></followuser>
    </template>
    </van-cell>
    <!-- 文章内容 -->
    <div class="article-content markdown-body"  v-html="article.content" ref="article.content"></div>
    <!-- 正文结束 -->
    <van-divider>正文结束</van-divider>

    <!-- 加载评论列表 -->
    <commenList
    :source='article.art_id'
    @onLoadSuss='totalCount=$event.total_count'
    :list='commenList'
    @replayMesg='replayMesg'
    ></commenList>    

     <!-- 底部 tab-bar-->
    <van-tabbar>
  <van-goods-action>
  <van-goods-action-button
  class="comment-btn"
    plain text="写评论" 
    type="default"
    @click="isPopShow=true"
  />
  <!-- 弹出层 写文章评论-->
  <van-popup
  v-model="isPopShow"
  closeable
  position="bottom"
  >
  <CommentPost :target='article.art_id' @sendMesg='onsendMesg'/>
  </van-popup>

  <van-goods-action-icon :badge="totalCount" icon="comment-o" />
  <collectArticle 
  v-model="article.is_collected" 
  :articleId='article.art_id'
  ></collectArticle>

  <likeArticle
  v-model="article.attitude"
  :articleId='article.art_id'
  ></likeArticle>
  <van-goods-action-icon icon="share-o"/>
  </van-goods-action>
    </van-tabbar>
    </div>

    <!-- 加载失败 404 -->
    <div class="error-wrap" v-else-if="errStatus===404">
    <van-empty image="error" description="该资源不存在或已删除" />
    </div>

    <!--加载失败  内容加载失败 -->
    <div class="error-wrap" v-else>
    <van-empty description="内容加载失败">
    <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
    </van-empty>
    </div>
  </div>

  <!-- 弹出层 回复评论 -->
  <van-popup
  v-model="isReplayShow"
  position="bottom"
  style="height:91%"
  >
  <reply v-if="isReplayShow" :curent="curentCommen" @clickClose="isReplayShow=false"  />
  </van-popup>
 </div>
</template>

<script>

import {getArtId} from '../../../api';
import"./github-markdown.css"
import { ImagePreview } from 'vant';
import followuser from '../../components/followuser'
import collectArticle from '../../components/iscollected'
import likeArticle from '../../components/likeArticle'
import CommentPost from './commenList/commpop.vue'
import commenList from './commenList/commenlist'
import reply from './commenList/replay.vue';
export default {
  props:{
  articleId:{
    type:[Number,String,Object],
    required:true,
    followloding:false,
  }
},
components:{
  followuser,
  collectArticle,
  likeArticle,
  commenList,
  CommentPost,
  reply
},
provide:function(){
   return {articleId=this.articleId},\}
  data(){
    return{
      article:{},
      isLoading:true, //加载状态
      errStatus:0, //失败码状态
      totalCount:0, //总评论数
      isPopShow:false,
      commenList:[], //评论列表
      isReplayShow:false,  //回复评论弹层
      curentCommen:{}  //当前条评论
    }
  },
created(){
    this.loadArticle()
  },
methods:{
  async loadArticle () {
    this.isLoading=true
    try {
      console.log(this.articleId);
        const {data} = await getArtId(this.articleId)
        console.log(data);
        this.article=data.data
        //请求成功关闭loading
        setTimeout(() => {
          this.getImg()
        }, 0);
    } catch (err) {
        this.$toast('获取失败')
        console.dir(err);
    }
    this.isLoading=false
  },
//  onFollow(){
//    this.article.is_followed=!this.article.is_followed
//  }
   getImg(){
     // 1 获取文章内容DOM节点
     const img_Dom=this.$refs['article.content']
     // 2 获取文章内容中所有的img DOM节点
     const img_src=img_Dom.querySelectorAll('img')
     // 3 获取文章中所有图片的地址
     const imgs=[]
     // 4 遍历img节点,把图片链接放入imgs数组中
     img_src.forEach((img,index)=>{
       imgs.push(img.src)
       // 5 给每个img 节点注册点击事件
       img.onclick=()=>{
         // 6 调用 ImagePreview 预览
         ImagePreview({
           //预览图片的数组
        images:imgs,
        startPosition: index,
        });
       }
     })
    //  console.log(imgs);
   },
  //  文章评论弹窗 ->commpop
  onsendMesg(data){
    //关闭弹层
    this.isPopShow=false
    //将发布的内容发布到列表顶部
    this.commenList.unshift(data.new_obj)

  },
  // 评论回复  
  replayMesg(list){
    this.curentCommen=list
    //打开回复弹层
    this.isReplayShow=true
  }
},
}

</script>

<style scoped lang="less">
.article-container{
  background-color: #fff;
   .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;

    }
     .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  /deep/.avatar{
    width: 70px;
    height: 70px;
    margin-right: 17px;
  }
/deep/.plus{
  background-color: #1989fa;
  width: 170px;
  height: 58px;
  border: #1989fa;
}
/deep/.pluss{
  background-color: #fff;
  width: 170px;
  height: 58px;
  border: #1989fa 1px solid;
  color: #1989fa;
}
.user {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .user-time {
        font-size: 23px;
        color: #b7b7b7;
      }
      .article-content {
      padding: 55px 32px;
      font-size: 40px;
      }
      .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
     .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
}
</style>