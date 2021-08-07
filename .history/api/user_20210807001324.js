import request from '../utils/request'
// import store from "@/store";
export default {
    login:(data)=>{
       return request({
          url: "/v1_0/authorizations",
          method:'POST',
          data
        });
    },
    sendSms:(mobile)=>{
        return request({
          url: `/v1_0/sms/codes/${mobile}`,
          method: "GET"
        });
    },
    getUser:()=>{
        return request({
          url: "/v1_0/user",
          method: "GET",
          // 发送请求头数据
        //   headers: {
        //     // 注意：该接口需要授权才能访问
        //     //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //     Authorization: `Bearer ${store.state.user.token}`
        //   }
        });
    },
    getTab:()=>{
      return request({
        url:'/v1_0/user/channels',
        method:'GET',
      })
    },
    follow:(userId)=>{
      return request({
        url:'/v1_0/user/followings',
        method:'POST',
        data :{
          target:userId
        }
      })
    },
    delFollow:(userId)=>{
      return request({
        url:`/v1_0/user/followings/${userId}`,
        method:'DELETE',
      })
    },
    userInfo:()=>{
      return request({
        url:'/v1_0/user/profile',
        method:'GET',
      })
    },
    userProfile:(data)=>{
      return request({
        url:'/v1_0/user/profile',
        method:'PATCH',
        data
      })
    },
    userP:(data)=>{
      return request({
        url:'/v1_0/user/profile',
        method:'PATCH',
        data
      })
    },
}