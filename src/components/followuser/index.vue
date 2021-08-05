<template>
  <!-- 关注 -->
  <van-button class="plus" :loading='isLoading' round icon="plus" type="primary" v-if="!isFollowed" @click="onFollow">关注</van-button>
  
  <van-button class="pluss" round type="primary" :loading='isLoading' v-else @click="onFollow" >已关注</van-button>
    
</template>

<script>
import {follow,delFollow } from '../../../api';
export default {
  name:'followuser',
  model: {
    prop: 'isFollowed',
    event: 'onFollow'
  },
    props:{
      isFollowed:{
            type:Boolean,
            required:true
        },
        userId:{
          type:[Number,String,Object],
          required:true
        }
    },
    data(){
      return{
        isLoading:false
      }
    },
    methods:{
  async onFollow(){
   this.isLoading=true
   try{
     if(this.isFollowed){
       //已经关注,取消关注
      await delFollow(this.userId)
      // this.article.is_followed=false
     }else{
       //没有关注,添加关注
      await follow(this.userId)
      //  this.article.is_followed=true
     }
     this.$emit('onFollow', !this.isFollowed)
   }catch(err){
     if(err,response&&err.response.status===400){
       return this.$toast.fail('不能自己关注自己')
     }
    //  else if(err,response&&err.responsestatus.code===401){
       
    //    $router.go({path:'/login'})
     
     this.$toast.fail('操作失败')
   }
   this.isLoading=false
 }
    }
}
</script>

<style scoped lang="less">
</style>