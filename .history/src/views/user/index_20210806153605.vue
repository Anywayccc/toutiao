<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="this.user.name" is-link />
    <van-cell title="性别" :value="this.user.gender=0? '男':'女'"  is-link />
    <van-cell title="生日" :value="this.user.birthday"  is-link />
  </div>
</template>

<script>
import {userInfo} from '../../../api'
export default {
  name:'user',
data(){
  return{
    user:{}
  }
},
created(){
  // console.log(1234);
  this.getUser()
},
methods:{
  async getUser(){
    console.log('122');
    try{
      const {data}=await userInfo()
        // console.log(data);
        this.user=data.data
        console.log(this.user);
    }catch(err){
      this.$toast('获取信息失败了')
      console.log(err);
    }
  }
}
}
</script>

<style scoped lang='less'>
 /deep/ .van-image__img {
    width: 60px;
    height: 60px;
  }

</style>