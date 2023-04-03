import request from '@/utils/request';
import Axios from 'axios';
//  /admin/product/baseTrademark/${page}/${limit}  获取商品列表
export const reqMark = (page,limit)=>{
   return request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});
}
//添加
export const reqAddAdmin = (data) => {
   return request({url:'/admin/product/baseTrademark/save',method:'post',data});
}
//修改
export const reqUapAdmin = (data) => {
   return request({url:'/admin/product/baseTrademark/update',method:'put',data});
}
// 软件测试
export function ss(){
   return Axios({
     method: 'post',
     url: 'https://go.apipost.cn/'
   })
 }

 //删除商品
 export const removeAdmin = (id) =>{
   return request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'});
 }
