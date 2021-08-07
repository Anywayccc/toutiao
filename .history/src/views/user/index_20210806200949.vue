<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()"
    @click="onsentName"
     />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="nameShow=true" />
    <van-cell title="性别" :value="user.gender=1? '男':'女'"  is-link />
    <van-cell title="生日" :value="user.birthday"  is-link />
    <!-- 编辑昵称 -->
    <van-popup v-model="nameShow" :style="{ height: '100%' }" position="bottom"
    >
      <updataName  @close="nameShow=false"/>
    </van-popup>
  </div>
</template>

<script>
import {userInfo} from '../../../api'
import updataName from './updata-name.vue'
import updataGender from './updata-gender.vue'
import updataBirthday from './updata-birthday.vue'
import updataPhoto from './updata-birthday.vue'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapMutations} = createNamespacedHelpers('infoUser');
export default {
  name:'user',
data(){
  return{
    // user:{},
    nameShow:false,

  }
},
created(){
  // console.log(1234);
  this.getUser()
},
methods:{
  ...mapMutations(['updateUser']),
  async getUser(){
    console.log('122');
    try{
      const {data}=await userInfo()
        // console.log(data);
        // this.user=data.data
        this.updateUser(data.data)
        console.log(this.user);
    }catch(err){
      this.$toast('获取信息失败了')
      console.log(err);
    }
  }
},
components:{
  updataName,
  updataGender,
  updataBirthday,
  updataPhoto
},
computed:{
  ...mapGetters(['user'])
}
}
</script>

<style scoped lang='less'>
 /deep/ .van-image__img {
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }

</style>