<template>
  <div class="Result">
      <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
      </van-list>
  </div>
</template>

<script>
import {getResult} from '../../../../api'
export default {
name:'Result',
props:{
  searchText:{
        type:[String,Number,Object],
        required:true
       }
  },
 data() {
   return {
     list: [],
      loading: false,
      error: false,
      finished: false,
      page:'1', //页数
      per_page:20, //每页数量
    };
  },
  methods: {
    async onLoad() {
      //1 请求获取数据
      // 2 将数据添加到数组列表中
      // 3 将本次加载中的loging关闭
      // 4 判断是否还有数据
      //     如果还有 则更新获取下一个数据的页码
      //     如果没有 则将加载状态finshed设置结束


      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try{
        const {data}= await getResult({
        page:this.page,
        per_page:this.per_page,
        q:this.searchText
      })
      const results=data.data.results
        console.log(results);
      this.list.push(...results)
      // console.log(this.list);
      this.loading=false
      if(results.length){
        this.page++
      }else{
        this.finished=true
      }
      }catch(err){
        this.error = true
        this.loading = false
      }
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
          
 
}
</script>

<style scoped lang="less">

</style>