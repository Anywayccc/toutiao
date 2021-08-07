<template>
  <div class="commentreply">
    <!-- 导航栏 -->
    <van-nav-bar :fixed='true' :title="curent.reply_count>0?`${curent.reply_count}条回复`:'暂无回复'">
    <template #left>
      <van-icon
        name="cross"
        @click="$emit('clickClose')"
      />
        </template>
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="socll">
    <!-- 当前评论项 -->
    <comitem :li="curent" ></comitem>
    <!-- /当前评论项 -->

    <van-cell title="全部回复" />
    <!-- 评论的回复列表 -->
    <comList 
    :list="commentList"
    type='c'
    :source='curent.com_id'
    />
    </div>
    <!-- /评论的回复列表 -->
    <div class="post-wrap">
        <van-button class="post-btn" size="small" round @click="isReplayShow=true" >写评论</van-button>
    </div>
    <!-- 底部 -->
    <!-- 发布评论 -->
    <van-popup
  v-model="isReplayShow"
  closeable
  position="bottom"
  >
  <compop :target='curent.com_id' @sendMesg='sendpop'/>
  </van-popup>
    <!-- /底部 -->
  </div>
</template>

<script>
import comitem from'./comItem.vue'
import comList from './commenlist'
import compop from './commpop.vue'
export default {
  name: 'commentReply',
  components: {
      comitem,
      comList,
      compop
  },
  props:['curent'],
//   props: {
//       curentCommen:{
//           type:[Object,Array,String]
//       }
//   },
  data () {
    return {
        isReplayShow:false,
        commentList:[] //评论回复列表
    }
  },
  computed: {
  },
  watch: {},
  created () {},
  mounted () {

  },
  methods: {
      sendpop(data){
          this.curent.reply_count++
            this.isReplayShow=false
            this.curentList.inshift(data.new_obj)
      }
  }
}
</script>

<style scoped lang='less'>
    /deep/.scroll{
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        bottom: 88px;
        overflow-y: auto;
    }
.post-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    display: flex;
    align-items: flex-end;
    padding-bottom: 20px;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    padding-top: 12%;
    .post-btn{
        width: 60%;
    }
}
</style>