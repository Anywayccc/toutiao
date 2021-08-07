<template>
  <div class="updat-gender">
     <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    :default-index="user.gender"
    @cancel="$emit('close')" 
    @confirm="onConfirm"
    @change="onChange"
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
      columns: ['男', '女'],
      localGender:0
    }
  },
  computed:{
    ...mapGetters(['user'])

  },
  created(){
        this.localGender=this.user.gender
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
            this.user.gender=localGender
            this.updateUser(this.user)
            this.$emit('close')
            this.$toast.success('修改成功')
            }catch(err){
                console.log(err);
                this.$toast.fail('修改失败')
            }
    },
    onchange(picker,value,index){
        this
    }
  }
}
</script>

<style>

</style>