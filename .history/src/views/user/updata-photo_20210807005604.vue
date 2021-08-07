<template>
  <div class="updat-photo">
     <!-- /导航栏 -->
    <img class="img" src="img" alt="">
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="onConfirm">完成</span>
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
const image = this.$refs.img
const cropper = new Cropper(image, {
    viewMode: 1, // 只能在裁剪的图片范围内移动
    dragMode: 'move', // 画布和图片都可以移动
    aspectRatio: 1, // 裁剪区默认正方形
    autoCropArea: 1, // 自动调整裁剪图片
    cropBoxMovable: false, // 禁止裁剪区移动
    cropBoxResizable: false, // 禁止裁剪区缩放
    background: false // 关闭默认背景
    }
)},
 methods:{
    ...mapMutations(['updateUser']),
    confirm(){
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.userPhoto(blob)
      })
    },
    async userPhoto(blob){
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try{
      const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await userPhoto(formData)

        this.$emit('close');
            console.log(data);
            this.user.birthday=dayJs(this.currentDate).format('YYYY-MM-DD')
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