<template>
  <div class="updat-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import {userProfile}from '../../../api'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapMutations}=createNamespacedHelpers('infoUser')
export default {
name:'updat-birthday',
data(){
  return{
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(),
    currentDate: new Date()
  }
},
 computed:{
    ...mapGetters(['user'])

  },
  created:{
    this.currentDate=new.Date(this.user.birthday
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
      const {data}=await userProfile({
                gender:this.localGender
            })
            console.log(data);
            this.user.gender=this.localGender
            this.updateUser(this.user)
            this.$emit('close')
            this.$toast.success('修改成功')
            }catch(err){
                console.log(err);
                this.$toast.fail('修改失败')
            }
    },
  }
}
</script>

<style>

</style>