<template>
  <div class="search-suggestion">
    <van-cell 
    v-for="(text,index) in tex" :key="index"
    @click="$emit('search',text)"
    icon="search">
    <template #title>
      <div v-html="hightlight(text)"></div>
    </template>
    </van-cell>
  </div>
  
</template>

<script>
import {getSugges} from '../../../../api'
import{debounce} from 'lodash'
export default {
name:'search-suggestion',

 data() {
    return {
      tex:[],
    };
  },
    watch:{
        searchText:{
            //当searcheText数据变化时就会调取hander函数
            //debounce函数
            //参数1 一个函数
            //参数2 延迟时间,单位是毫秒
            //返回值 防抖之后的函数
            handler:debounce(function(value){
              this.locadSearch(value);
            },200),
            immediate: true
        }
    },
  methods: {
    async locadSearch(q){
      try{
      const {data} = await getSugges(q)
        this.tex=data.data.options
        console.log(this.tex);
      }catch(err){
        console.log(err);
      }
    },
     hightlight(text){
       const hightlightStr=`<div class="active">${this.searchText}</div>`
       const reg=new RegExp(this.searchText,'gi')
       return text.replace(reg,hightlightStr)
     }
  },
   props:{
      searchText:{
          type:[String,Number,Object],
          required:true
      }
  },
}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/div.active{
    color: #3296fa;
  }
}
</style>