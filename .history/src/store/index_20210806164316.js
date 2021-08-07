import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "../../utils/storge";
import updataUser from './user'

Vue.use(Vuex)

const TOKEN_KEY='TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    //一个对象，存储当前登录用户信息，里面包含（token等数据）
    user: getItem(TOKEN_KEY)
    //user:null
  },
  mutations: {
    updateUser(state, data) {
      state.user = data;
    //   console.log(state.user);

      //为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY,state.user);
    }
  },
  actions: {},
  modules: {
    updataUser
  }
});
