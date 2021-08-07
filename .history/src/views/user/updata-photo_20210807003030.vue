<template>
  <div class="updat-photo">
     <!-- /导航栏 -->
    <img class="img" src="img" alt="">
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span>完成</span>
    </div>
  </div>
</template>

<script>
import {userPhoto}from '../../../api'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapMutations}=createNamespacedHelpers('infoUser')

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
name:'updat-photo',
props:[img],
computed:{
    ...mapGetters(['user'])

  },
  created(){
    this.currentDate=new Date(this.user.birthday)
  },
  mounted(){

  },
 methods:{
    ...mapMutations(['updateUser']),
    async onConfirm(){
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try{
      const {data}=await userPhoto({
                photo:dayJs(this.currentDate).format('YYYY-MM-DD')
            })
            console.log(data);
            this.user.birthday=dayJs(this.currentDate).format('YYYY-MM-DD')
            this.updateUser(this.user)
            this.$emit('close')
            this.$toast.success('修改成功')
            }catch(err){
                console.log(err);
                this.$toast.fail('修改失败')
            }
    }
    },
}
</script>

<style scoped lang='less'>
.img{
  max-width: 100%;
}
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
  }
</style>