import artivle from './artivle'
import search from './search'
import user from './user'
import comment from './comment'

export const login=user.login
export const sendSms=user.sendSms
export const getUser=user.getUser
export const getTab=user.getTab
// console.log(getTab());
export const artList=artivle.artList
// console.log(artList());
export const allBar=artivle.allBar
export const addUserChannel=artivle.addUserChannel
export const delUserChannel=artivle.delUserChannel
// console.log('2222',addUserChannel());
export const getSugges=search.getSugges
export const getResult=search.getResult
export const getArtId=artivle.getArtId
// console.log(getArtId());

export const follow=user.follow
export const delFollow=user.delFollow
// 收藏
export const addCollect=artivle.addCollect
export const removeCollect=artivle.addCollect

export const addLike=artivle.addLike
export const noLike=artivle.noLike

//评论
export const getComment=comment.getComment
//对评论或评论回复点赞
export const likings=comment.likings
export const dellik=comment.dellik

export const sendComm=comment.sendComm

//用户信息
export const userInfo=user.userInfo
export const userProfile=user.userInfo
// console.log(userInfo());
