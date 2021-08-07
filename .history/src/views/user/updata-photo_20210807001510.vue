<template>
  <div class="updat-photo">
     <!-- /导航栏 -->
    <img class="img" src="img" alt="">
  </div>
</template>

<script>
import {userPhoto}from '../../../api'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapMutations}=createNamespacedHelpers('infoUser')

export default {
name:'updat-photo',
computed:{
    ...mapGetters(['user'])

  },
  created(){
    this.currentDate=new Date(this.user.birthday)
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
                birthday:dayJs(this.currentDate).format('YYYY-MM-DD')
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
    }
}
</script>

<style scoped lang='less'>
.img{
  max-width: 100%;
}
</style>