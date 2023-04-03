import request from '@/utils/request';

///admin/product/getCategory1
export const getCategory1 = ()=> request({url:'/admin/product/getCategory1',method:'get'});
///admin/product/getCategory2/{category1Id}
export const getCategory2 = (category1Id) => request({url:`admin/product/getCategory2/${category1Id}`,method:'get'});
///admin/product/getCategory3/{category2Id}
export const getCategory3 = (category2Id) => request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'});

//获得属性/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 上传接口/admin/product/saveAttrInfo
export const setSaveAttrInfo = (data) => request({url:'/admin/product/saveAttrInfo',method:'post'},data);

//保存分类品牌关联/admin/product/saveAttrInfo
export const reqUpdteOrAddd = (data)=>{
  return request({url:`/admin/product/saveAttrInfo`,method:'post',data});
}
