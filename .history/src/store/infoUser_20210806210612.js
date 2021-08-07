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
    async getUser(context){
      const {data}=await userInfo()
      context.commit('updateUser',data.data)

      // try{
        // const {data}=await userInfo()
          // console.log(data);
          // this.user=data.data
          // this.updateUser(data.data)
          // context.commit('updateUser',data.data)
      // }catch(err){
        // Toast('获取信息失败了')
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
  },
  modules: {}
}
;
