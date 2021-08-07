<template>
  <div class="updat-name">
     <!-- 导航栏 -->
    <van-nav-bar
    title="设置昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('close')" 
    @click-right="onName"
    />
    <!-- 输入框 -->
    <div class="input-name">
    <van-field
    v-model="messageName"
    rows="2"
    autosize
    type="textarea"
    maxlength="7"
    placeholder="请输入昵称"
    show-word-limit
/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {userProfile}from '../../../api'
export default {
    name:'updat-name',
    data(){
    return{
        // messageName:'this.user.name'  报错 原因 ↓
        //date比computed先初始化 所以不能在这里拿到user.name的数据
        // messageName:'this.$store.getters.user.name' //不使用辅助函数   
        messageName:''
        
    }
    },
    computed:{
    ...mapGetters(['user'])
    },
    created(){
        this.messageName=this.user.name
    },
    methods:{
        async onName(){
            try{
               const userProfile({
                
            })
            }catch(err){
    
            }
        }
    }
}
</script>

<style scoped lang='less'>
    .input-name{
    padding:20px
}
</style>