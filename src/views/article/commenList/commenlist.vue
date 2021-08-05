<template>
  <div class="commenList">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item.art_id">
        {{ item.content }}
      </van-cell> -->
      <comItem v-for="(item,index) in list" :key="index"
      :li='item' @replayMesg="$emit
      ('replayMesg',item)"></comItem>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
  </div>
</template>

<script>
import {getComment} from '../../../../api'
import comItem from './comItem.vue'
export default {
name:'commenList',
props:{
    source:{
        type:[String,Number,Object],
        required:true
    },
    list:{
      type:[Object,Array],
      default:()=>[] 
    },
    type:{
      type:String,
      //自定义prop数据验证
      validator(value){
        return ['a','c'].includes(value)
      },
      default:'a'
    }
},
components:{
  comItem
},
data(){
return{
    offset:null,
    // list: [], // 评论列表
    loading: true, // 上拉加载更多的 loading
    finished: false, // 是否加载结束
    // totalCount: 0 // 总数据条数
}
},
created(){
  this.loding=true,
    this.onLoad()
},
methods:{
    // 1 请求获取数据
    async onLoad(){
        try{
        const {data}=await getComment({
          type:this.type,
          source:this.source.toString(),
          offset:this.offset,
          limit:10
        })
        // 2 将数据添加到列表中  
        // console.log(data);
        const {results}=data.data
        this.list.push(...results)
        console.log(this.list);
          //把文章评论的总数量传递到父组件
          this.totalCount=data.data.total_count
          this.$emit('onLoadSuss', data.data);
          // console.log(this.totalCount);
          // 3 将loding设置为false
          this.loading=false
          // 4 判断是否还有数据
          if(results.length){
            //     有就更新下一页页码
            this.offset=data.data.last_id
          }else{
            //     没有就将finished设置结束
            this.finished=true
          }
        }
        catch(err){
          console.dir(err);
        }
    }
    
}
}
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>