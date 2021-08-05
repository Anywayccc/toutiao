import request from '../utils/request'

export default{
    getSugges(q){
        return request({
            url:'/v1_0/suggestion',
            method:'GET',
            params:{q}
        })
    },
    getResult(params){
        return request({
            url:'/v1_0/search',
            method:'GET',
            params
        })
    },
    
}