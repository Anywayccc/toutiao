import request from '../utils/request'
export default{
    artList(params){
      return request({
        url:'/v1_0/articles',
        method:'GET',
        params
       })
    },
    allBar(){
      return request({
        url:'/v1_0/channels',
        method:'GET',
       })
    },
    addUserChannel(channels){
      return request({
        url:'/v1_0/user/channels',
        method:'PATCH',
        data:{
          channels:[channels]
        }
      })
    },
    delUserChannel(channelId){
      return request({
        url:`/v1_0/user/channels/${channelId}`,
        method: 'DELETE',
      })
    },
    getArtId(articleId){
      return request({
        url:`/v1_0/articles/${articleId}`,
        method:'GET',
       })
    },
    //收藏
    addCollect(articleId){
      return request({
        url:'/v1_0/article/collections',
        method:'POST',
        data:{
          target:articleId
        }
       })
    },
    //取消收藏
    removeCollect(articleId){
      return request({
        url:`/v1_0/article/collections${articleId}`,
        method:'DELETE',
        data:{
          target:articleId
        }
       })
    },
    //喜欢
    addLike(articleId){
      return request({
        url:'/v1_0/article/likings',
        method:'POST',
        data:{
          target:articleId
        }
       })
    },
    //取消喜欢
    noLike(articleId){
      return request({
        url:`/v1_0/article/likings/${articleId}`,
        method:'DELETE',
        data:{
          target:articleId
        }
       })
    },
    
    
}