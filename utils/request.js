import axios from  'axios'
import store from "@/store";
import jsonBig from 'json-bigint'
//create  创建一个axios的实例 ()里可以传入axios的配置
const request =axios.create({
  baseURL: "http://toutiao.itheima.net/",
  transformResponse: [function (data) {
    try {
        // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
}]
});

// export default axios.create({
//   baseURL: "http://ttapi.research.itcast.cn/"
// });
//请求拦截器

request.interceptors.request.use(function(config){
    //config :本次请求的配置对象
    const {user}=store.state
    // console.log(store.state);
    if(user && user.token){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    //这里务必要返回config配置对象 ，否则请求就停在这里出不去
    // console.log(config);
    return config
},function(error){
    return Promise.reject(error)
})
// request.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     // config ：本次请求的配置对象
//     // config 里面有一个属性：headers
//     const { user } = store.state;
//     console.log(store.state);
//     console.log(user);
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

//响应拦截器
export default request