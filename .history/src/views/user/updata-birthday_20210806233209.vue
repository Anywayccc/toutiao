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
 
}
</script>

<style>

</style>