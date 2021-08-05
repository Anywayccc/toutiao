<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="sendMesg"
      :disabled='!message.length'
    >发布</van-button>
  </div>
</template>

<script>
import {sendComm} from '../../../../api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
      target:{
          type:[Number,String,Object],
          required:true
      }
  },
  data () {
    return {
      message: '',
      loading:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  inject:['articleId'],
  methods: {
      async sendMesg(){
        this.$toast.loading({
        message: "发布中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000，如果是0则持续展示
      });
         try{
             this.loading=true
            const{data}=await sendComm({
            target:this.target, //文章id
            content:this.message, //评论内容
            art_id:this.articleId	? this.articleId.toString():null
          })
          const mesg=data.data
        //   console.log(data);
        this.$emit('sendMesg',mesg);
        //清空输入框
        this.message=''
        
        //关闭弹层  ->index中

        
        //将发布的内容发布到列表顶部 ->index中写
        this.$toast('发布成功')
         }catch(err){
             this.$toast('发布留言失败')
             console.log(err);
         }
      }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>