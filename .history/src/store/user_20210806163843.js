import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "../../utils/storge";

Vue.use(Vuex)

const TOKEN_KEY='TOUTIAO_USER'
export default new Vuex.Store({
  state: {

    mutations: {
    updateUser(state, data) {
      state.user = data;
    //   console.log(state.user);

      //为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY,state.user);
    }
  },
  actions: {},
  modules: {}
});
