import request from '@/utils/request';
//获取spu列表展示数据 /admin/product/{page}/{limit}
export const reqSpudataList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params: {category3Id}})

// 获取spu基本数据/admin/product/getSpuById/{spuId}
export  const reqGetSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});
//获取品牌信息
export  const reqTradeMarkList = () => request({url:`/admin/product/baseTrademark/getTrademarkList`,method:'get'});
//获取spu图片的接口
export  const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});
//获取平台全部销售属性
export  const reqBaseSaleAttrList = () => request({url:`/admin/product/baseSaleAttrList`,method:'get'});

//修改或者新增spu
export const reqAddOrUpdataSpu = (spuInfo) =>{
   if(spuInfo.id){
     return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
   }else {
     return  request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo});
   }
}

//删除spu  /admin/product/deleteSpu/{spuId}
export const deleteSpu = (spuId)=> request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})
