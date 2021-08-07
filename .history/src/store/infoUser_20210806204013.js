import {userProfile}from '../../../api'

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
