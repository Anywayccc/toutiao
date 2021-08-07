import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'

Vue.use(Vant)
import { Button, NavBar, Form, Field } from "vant";


Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(NavBar);


import '../src/styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//加载中文语言包
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn') // 全局使用

dayjs.extend(relativeTime)

Vue.filter('relativeTime',value=>{
    return dayjs().to(dayjs(value))
})

