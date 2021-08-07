<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()"
     />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="$refs.file.click()" >
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
      <input type="file" hidden ref="file" @change="onFileChange">
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="nameShow=true" />
    <van-cell title="性别" :value="user.gender? '男':'女'"  is-link @click="genderShow=true"/>
    <van-cell title="生日" :value="user.birthday"  is-link  @click="birthdayShow=true"/>
    <!-- 编辑昵称 -->
    <van-popup v-model="nameShow" :style="{ height: '100%' }" position="bottom"
    >
      <updataName  @close="nameShow=false"/>
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="genderShow" position="bottom"
    >
      <updataGender  @close="genderShow=false"/>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="birthdayShow" position="bottom"
    >
      <updataBirthday  @close="birthdayShow=false"/>
    </van-popup>
    <!-- 修改头像 -->
        <van-popup v-model="photoShow" position="bottom"
    >
      <updataPhoto  @close="photoShow=false"/>
    </van-popup>
  </div>
</template>

<script>
// import {userInfo} from '../../../api'
import updataName from './updata-name.vue'
import updataGender from './updata-gender.vue'
import updataBirthday from './updata-birthday.vue'
import updataPhoto from './updata-photo.vue'

import { mapGetters,createNamespacedHelpers } from 'vuex';
const {mapActions} = createNamespacedHelpers('infoUser');
export default {
  name:'user',
data(){
  return{
    // user:{},
    nameShow:false,
    genderShow:false,
    birthdayShow:false,
    photoShow:false

  }
},
async created(){
  try{
    await this.getUser()
    
  }catch(err){
    // console.log(1234);
    this.$toast('获取信息失败')
  }
},
methods:{
  ...mapActions(['getUser']),
  // async getUser(){
  //   console.log('122');
  //   try{
  //     const {data}=await userInfo()
  //       // console.log(data);
  //       // this.user=data.data
  //       this.updateUser(data.data)
  //       console.log(this.user);
  //   }catch(err){
  //     this.$toast('获取信息失败了')
  //     console.log(err);
  //   }
  // }
  onFileChange(){
    const file=this.$refs.file.files[0]
    const data= window.URL.createObjectURL(file)
    console.log(data);
    this.photoShow=true
    this.$refs.file.value=''
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