<template>
  <div class="updat-photo">
     <!-- /导航栏 -->
    <img class="img" src="img" alt="">
  </div>
</template>

<script>
import {userProfile}from '../../../api'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapMutations}=createNamespacedHelpers('infoUser')

export default {
name:'updat-photo',

}
</script>

<style scoped lang='less'>
.img{
  max-width: 100%;
}
</style>