import http from "./base.js"

//开票信息列表 
export let deliveryAddrList = (data,self)=>{
    return http.fetchGet('/delivery-address/list',data,self)
}
//添加
export let saveOrUpdateDeliveryAddr = (data,self)=>{
    return http.fetchPost('/delivery-address/save-or-update',data,self)
}
//删除 
export let deleteDeliveryAddr = (data,self)=>{
    return http.fetchPost('/delivery-address/delete',data,self)
}

//删除 
export let setDefaultDeliveryAddr  = (data,self)=>{
    return http.fetchPost('/delivery-address/set-default',data,self)
}