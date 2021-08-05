<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="fromsearch">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus='isResultShow=false'
        @keydown.esc.prevent
      />
      
    </form>

    <!-- 搜索结果 -->
    <Result 
    v-if="isResultShow" 
    :searchText='searchText'
    ></Result>

    <!-- 联想建议 -->
    <Suggestion 
    v-else-if="searchText" 
    :searchText='searchText' 
    @search='onSearch'
    
    ></Suggestion>

    <!-- 搜索历史记录 -->
    <History v-else
    @search='onSearch' :history='searchHist'></History>
  </div>
</template>

<script>
import History from './components/history.vue'
import Suggestion from './components/sugges.vue'
import Result from './components/result.vue'
import { setItem,getItem} from '../../../utils/storge'
export default {
name:'search-container',
components:{
  History,
  Suggestion,
  Result
},
 data() {
    return {
      searchText: '',
      isResultShow:false,  //是否显示搜索结果
      searchHist:getItem('search-history')||[],
    };
  },
  methods: {
    onSearch(val) {
      //更新搜索结果
      this.searchText=val
      const index=this.searchHist.indexOf(val)
      if(index!=-1){
        this.searchHist.splice(index,1)
      }
      this.searchHist.unshift(val)
      
      //渲染搜索结果
      this.isResultShow=true
    },
    onCancel() {
      this.$router.back() //点击取消返回首页
    },
  },
  watch:{
    searchHist(val){
      setItem('search-history',val)
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
  padding-top: 108px;
  .van-search__action{
    color: #fff;
  }
  .fromsearch {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2200;
  }
}
</style>