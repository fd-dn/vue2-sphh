import request from "@/utils/request";

//获取添加sku页面的图片 /admin/product/spuImageList/{spuId}
export  const getSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取添加sku页面的数据  /admin/product/spuSaleAttrList/{spuId}
export  const getSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

//获取页面数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export  const getAttrInfoList = (category1Id,category2Id,category3Id)=> request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//新增sku
export  const addSku = (skuInfo) => request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

//获取sku
export  const getSku = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})

//----------------------  sku
export  const getSkuList = (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

//上架
export  const onSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'get'})

//下架
export  const canceSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

//获取sku详细的信息
export  const getSkuBy = (skuId) => request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
