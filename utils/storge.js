//封装本地存储操作模块
//存储数据
export const setItem = (key, value) => {
  //将数组或者对象类型的转换为JSON格式字符串进行存储
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
//获取数据
export const getItem =key=>{
    const data = window.localStorage.getItem(key)
    try{
        //如果是一个有效的json格式的字符串就会执行成功
        return JSON.parse(data)
    }catch(err){
        return data
    }
}
//删除数据
export const removeItem=(key)=>{
    window.localStorage.removeItem(key)
}
