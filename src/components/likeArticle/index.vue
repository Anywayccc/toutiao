<template>
  <van-goods-action-icon
  :color="value===1?'red':''"
  :icon="value===1?'good-job':'good-job-o'"
  @click="change"
  :loging='loging'
  />
</template>

<script>
import {noLike,addLike} from '../../../api'
export default {
    name:'likeArticle',
    props: {
    value: {
        type:Number,
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
        this.loading = true
        try{
          let status = -1
          if(this.value===1){
             //已经喜欢,取消
          await noLike(this.articleId)
          // this.value=0
          // this.$emit('change', this.value=0)
          // this.$toast.success('取消点赞')
        }else{
          await addLike(this.articleId)
          // this.value=1
          // this.$emit('change', this.value=1)
          // this.$toast.success('点赞成功')
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞') 
        }catch(err){
          console.dir(err);
          this.$toast.fail('操作失败')
       
      }
      this.loging=false
    }
}
}
</script>

<style scoped lang='less'>

</style>