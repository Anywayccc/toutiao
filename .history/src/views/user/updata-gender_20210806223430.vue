<template>
  <div class="updat-gender">
     <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')" 
    @confirm="onConfirm"
  />
  </div>
</template>

<script>
import {userProfile}from '../../../api'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapMutations}=createNamespacedHelpers('infoUser')

export default {
name:'updat-gender',
 data () {
    return {
      columns: ['男', '女']
    }
  },
  computed:{
    ...mapGetters(['user'])

  },
  created(){
        this.columns=this.user.columns
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
                gender:this.columns
            })
            console.log(data);
            this.user.name=this.messageName
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

<style>

</style>