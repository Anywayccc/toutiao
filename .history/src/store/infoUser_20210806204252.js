import {userProfile}from '../../../api'
import { Toast } from 'vant';
export default{
    namespaced: true,
  state: {
      //个人信息中获取到的信息user{}
    user:{}
    },
    mutations: {
    //updateUser更新数据后的user
    updateUser(state,user){
        state.user=user
    }
  },
  actions: {
    async getUser(context){
      try{
        const {data}=await userInfo()
          // console.log(data);
          // this.user=data.data
          this.updateUser(data.data)
          context.commit
      }catch(err){
        Toast('获取信息失败了')
        // console.log(err);
      }
    },
    async onName(){
      try{
         const {data}=await userProfile({
          name:this.messageName
      })
      console.log(data);
      }catch(err){
          console.log(err);
      }
  }
  },
  modules: {}
}
;