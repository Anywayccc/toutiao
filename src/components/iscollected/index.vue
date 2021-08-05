<template>
  <van-goods-action-icon
  :color="isCollected?'#ffa500':''"
  :icon="isCollected?'star':'star-o'"
  @click="change"
  :loging='loging'
  />
</template>

<script>
import {addCollect,removeCollect} from '../../../api'
export default {
    name:'collectArticle',
    model: {
    prop: 'isCollected',
    event: 'change'
  },
    props: {
    isCollected: {
        type:Boolean,
        required: true
  },
  articleId:{
    type:[Number,String,Object],
    required:true
  }
},
data(){
    return{
        loging:false
        }
    },
    methods:{
      async change(){
        this.loging=true
        try{
          if(this.isCollected){
             //已经收藏,取消收藏
          await removeCollect(this.articleId)
        }else{
          await addCollect(this.articleId)
        }
          this.$emit('change', !this.isCollected);
          this.$toast.success(this.isCollected ? '取消收藏' : '收藏成功')
        }catch(err){
          this.$toast.fail('收藏失败')
       
      }
      this.loging=false
    }
}
}
</script>

<style scoped lang='less'>

</style>