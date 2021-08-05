<template>
  <van-cell class="comment-item" >
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="li.aut_photo"
    />
    <template #title>
      <div class="title-wrap">
      <div class="user-name">{{li.aut_name}}</div>
      <van-button
        class="like-btn"
        :class="{
          liked:li.is_liking
        }"
        :icon="li.is_liking? 'good-job':'good-job-o'"
        :loading='loading'
        @click="change"
      >{{li.like_count||'赞'}}</van-button>
    </div>
    </template>

    <template #label>
      <p >{{li. content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{li.pubdate|relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('replayMesg',li)"
        >回复{{li.reply_count}}</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
import {likings,dellik} from '../../../../api'
export default {
  name: 'comItem',
  props: {
      li:{
        type:[Object,Array],
        required:true
        }
  },
  data () {
    return {
        loading:false,
    }
  },
  methods:{
    async change(){
      this.loading = true
      try{
        if(this.li.is_liking){
           await dellik(this.li.com_id)
        }else{
          await likings(this.li.com_id)
        }
         // 更新视图
        this.li.is_liking=!this.li.is_liking
        this.$toast.success(this.li.is_liking ? '点赞成功' : '取消点赞') 
      }catch(err){
        this.$toast.fail('操作失败')
      }
      this.loging=false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
