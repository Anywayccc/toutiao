<template>
  <div class="channnel-edit">
    <!-- 我的频道 -->
        <van-cell class="title-text" title='我的频道' :border='false'>
          <template #right-icon>
          <van-button 
          class="edit-btn"
          size="mini" 
          round 
          plain 
          type="danger"
          @click="isEdit=!isEdit"
          > {{ isEdit ? '完成':'编辑'}} </van-button>
           </template>
        </van-cell>
    <!-- 我的频道  内容 -->
    <van-grid :gutter="10">
    <van-grid-item 
    class="griditem" 
    v-for="(chanBar,index) in myChannels" :key="index" 
    @click="oncheckBar(chanBar,index)"
    >
    <template #text>
      <span  class="van-grid-item__text" :class="{active:index === active}">{{chanBar.name}}</span>
    </template>

     <template #icon>
       <van-icon name="clear" v-show="isEdit && !fixEdit.includes(index)"/>
       <!-- fixEdit.includes(index)  不包含index是..的 -->
    </template>

    </van-grid-item> 
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell class="title-text" title='频道推荐' :border='false'></van-cell>
    <!-- 推荐  内容 -->
    <van-grid :gutter="10">
    <van-grid-item 
    class="griditem" 
    v-for="(bar,index) in newChannels" 
    :key="index" 
    icon="plus" 
    @click="addMy(bar)"
    :text="bar.name" />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {allBar,addUserChannel,delUserChannel} from '../../../../api'
import {setItem} from '../../../../utils/storge'

export default {
name:'channnel-edit',
  data(){
  return{
    allChannels:[],
    isEdit:false,
    fixEdit:[0]
  }
  },
  props:{
  //w我的频道
  myChannels: {
      type: Array,
      required: true
    },
    //高亮序号
    active:{
      type: Number,
      required: true
    }
  },
  created(){
    this.getChannels()
    // allBar
  },
  methods:{
    async getChannels(){
      try{
    const {data}=await allBar()
    this.allChannels=data.data.channels
    console.log('6666',this.allChannels);
  
    }catch(err){
      // this.$toast('获取频道失败',err)
      console.log(err);
    }
  },
  addMy(bar){
    // console.log(bar);
    this.myChannels.push(bar)
    //判断登录状态
    if(this.user){
      // 已经登录
      try{
         addUserChannel({
          id:bar.id,
          seq:this.myChannels.length
        })
        console.log('成功');
      }catch(err){
        this.$toast('保存失败')
        console.log(err,222);
      }
    }else{
      // 未登录
      // 存储到本地
      setItem('TOKEN_CHANNELS',this.myChannels)
    }
  },
  oncheckBar(chanBar,index){
    //1 如果是固定频道,则不删除
    if(this.isEdit){
      if(this.fixEdit.includes(chanBar.id)){
        return
      }
      //3 判断删除的索引是否小于当前高亮的索引避免删除高亮前面的标签 导致高亮索引标签前移
      if(index<=this.active){
        
        this.$emit('updataBar', this.channels-1);
      }
      //2 编辑状态移除
      this.myChannels.splice(index,1)
      //引入删除本地和接口
      this.delChannels(chanBar)
    }else{
      // 非编辑状态执行切换
      this.$emit('updatedBar',index,false)
    }
  },
  //封装删除
  async delChannels(chanBar){
       //判断登录状态
      try{
    if(this.user){
      // 已经登录
         await delUserChannel(chanBar.id)
        }else{
          // 未登录
          // 存储到本地
          setItem('TOKEN_CHANNELS',this.myChannels)
        }
      }catch(err){
        this.$toast('删除频道失败')
        console.log(err,222);
      }
  }
  },
  computed:{
    // newChannels(){
    //   const new_chan=[]
    //  this.allChannels.forEach(channels=>{
    //     const res=this.myChannels.find(myChannel=>myChannel.id===channels.id)
    //     if(!res){
    //       // channels.push(new_chan)
    //       new_chan.push(channels)
    //     }
    //   })
    // return new_chan
    // }
    
    newChannels(){
      
      return this.allChannels.filter(channels=>{
        const mychannels=this.myChannels.find(myChannels=>{
          return myChannels.id===channels.id
        })
        return !mychannels
      })
    },
    // 获取用户登录信息
    ...mapState(['user'])
    

  }
    
    
   

}
</script>

<style scoped lang="less">
.channnel-edit{
  padding: 85px 0;

  .title-text{
    font-size: 32px;
    color:#333;
  }
  .edit-btn{
    width: 104px;
    height: 44px;
    font-size: 22px;
    color:#f85959;
    border: #f85959 1px solid;
  }
  /deep/.griditem{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__icon-wrapper{
      position: unset;
    }
    .van-icon-clear{
    position: absolute;
    right: -6px;
    top: -10px;
    font-size: 16px;
    color: #ccc;
    z-index: 100;
    }
    
    }
    .van-grid-item__text{
      font-size: 28px;
      color: #222;
    }
    .active{
      color: red;
    }
    .van-icon-plus{
      font-size: 28px;
      margin-right: 6px;
    }
    .van-grid-item__content:last-child{
      flex-direction: row;
      color: #222;  
  }
    .van-grid-item__icon+.van-grid-item__text{
      margin-top:0  
    }
    
  }
}
</style>