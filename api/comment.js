//评论
import request from '../utils/request'
export default{
    getComment(params){
        return request({
            url:'/v1_0/comments',
            method:'GET',
            params
        })
    },
    //对评论或评论回复点赞
    likings(commentId){
        return request({
          url:'/v1_0/comment/likings',
          method:'POST',
          data:{
            target:commentId
          }
         })
      },
      dellik(commentId){
        return request({
          url:`/v1_0/comment/likings/${commentId}`,
          method:'DELETE',
         })
        },
    //对文章或者评论进行评论
    sendComm(data){
      return request({
        url:'/v1_0/comments',
        method:'POST',
        data
      })
    }
} 