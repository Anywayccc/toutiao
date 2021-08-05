<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="getUserInfo.photo"
          />
          <span class="name">{{getUserInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to='/user'>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{getUserInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{getUserInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{getUserInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{getUserInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header no-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- //导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text"> 收 藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template #text>
          <span class="text">历 史</span>
        </template>
      </van-grid-item>
      <van-cell is-link title="消息通知" @click="show = true" />
      <van-cell is-link title="小智同学" @click="show = true" />
      <van-cell
        v-if="user"
        class="logout-cell"
        title="退出登录"
        center
        @click="Onlogout"
        clickable
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUser } from '../../../api';
export default {
    data(){
        return{
            getUserInfo:''
        }
    },
  computed: {
    ...mapState(["user"])
  },
  created(){
      if(this.user){
          this.loadgetUser()
      }
  },
  methods: {
    Onlogout() {
     this.$dialog.confirm({
        title: "确认退出吗？",
      })
        .then(() => {
          //退出  清除token值
           this.$store.commit('updateUser',null)
        })
        .catch(() => {
          console.log('取消');
        });
    },
   async loadgetUser(){
      try{
           const res= await getUser()
        // console.log(data);
        this.getUserInfo=res.data.data
        console.log(this.getUserInfo);
       }catch(err){
           console.log(err,'数据请求错误');
       }
        
    }
  }
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .no-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
    //   justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
        margin-bottom: 10px ;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      //height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span:nth-child(1) {
             font-size: 36px;
        }
        span:nth-child(2) {
            font-size: 23px;
        }
        .count {
          font-size: 36px;
          color: #fff;
        }
        .text {
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      flex-direction: column;
      height: 141px;
      margin-bottom: 10px;
      i.toutiao {
        font-size: 45px;
      }
      .text {
        font-size: 28px;
        //   color: #fff;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
    }
    .logout-cell {
      text-align: center;
      color: #eb5253;
      font-size: 30px;
      margin: 10px 0;
      height: 100px;
    }
  }
}
</style>
