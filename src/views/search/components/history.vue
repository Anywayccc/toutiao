<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDelShow">
      <span @click="history.splice(0,history.length)">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDelShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDelShow=true"/>
    </van-cell>
    <van-cell :title="list" v-for="(list,index) in history" :key='index' @click="onClick(list,index)">
      <van-icon  name="close" v-show="isDelShow"/>
    </van-cell>
  </div>
</template>

<script>
export default {
name:'search-history',
props:{
history:{
  type:[Array],
  required:true
}
},
 data() {
    return {
      isDelShow:false,
    };
  },
  methods: {
   onClick(list,index){
     if(this.isDelShow){
       this.history.splice(index,1)
     }else{
       this.$emit('search', list);
     }
   }
  },
}
</script>

<style scoped lang="less">

</style>