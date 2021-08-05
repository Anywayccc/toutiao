<template>
  <div class="article-list">
      <van-pull-refresh 
      v-model="isRefreshLoading" 
      success-text="刷新成功"
      @refresh="onRefresh">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync='error'
    error-text="请求失败,点击重新加载"
    @load="onLoad"
    >
    <articleItem :article="article"
      v-for="(article,index) in list" 
      :key="index" 
      />
    </van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import {artList} from '../../../../api'
import articleItem from '../../../components/articlesItems/index.vue'
export default {
name:'art-list',
props:{
    channels:{
        type: Object,
        required:true
    }
},
components:{
  articleItem
},
data() {
    return {
      list:[],//存储列表数据
      loading: false, //控制加载中状态
      finished: false,//控制加载结束状态
      timestamp: null,
      error: false, // 是否加载失败
    isRefreshLoading: false,
    refreshSuccessText: '' 
    };
  },
   methods: {
       async onLoad(){
        try{
            const { data }=await artList({
            channel_id:this.channels.id,
            timestamp: this.timestamp || Date.now(),
            with_top:1
        })
        // console.log(4444,{data});
        const results=data.data.results
        // this.list=data.data.results
        this.list.push(...results)
        // console.log(results);
         this.loading = false
         if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
        }
        catch(err){
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
        console.log('请求失败',err);        
        }
       },
       // 当触发下拉刷新的时候调用该函数
    async onRefresh () {
    try {
    // 1. 请求获取数据
    const { data } = await artList({
      channel_id: this.channels.id, // 频道 id
      timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
      with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    })

    // 2. 将数据追加到列表的顶部
    const { results } = data.data
    this.list.unshift(...results)

    // 3. 关闭下拉刷新的 loading 状态
    this.isRefreshLoading = false

    // 提示成功
    this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
  } catch (err) {
    console.log(err)
    this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
    this.$toast('刷新失败')
  }
}
  },
  
}
</script>

<style scoped lang="less">
.article-list{
    height: 90vh;
    overflow-y: auto;
}
</style>