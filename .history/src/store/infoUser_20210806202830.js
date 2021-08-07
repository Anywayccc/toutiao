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
    import {userProfile}from '../../../api'

  },
  modules: {}
}
;
