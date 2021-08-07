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
        this.columns=this.user.name
    },
  methods:{
    async onConfirm(){
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try{

      }catch(err){

      }
    }
  }
}
</script>

<style>

</style>