import http from "./base.js"

//开票信息列表 
export let invoiceAddrList = (data,self)=>{
    return http.fetchGet('/invoice-address/list',data,self)
}
//添加
export let saveOrUpdateInvoiceAddr = (data,self)=>{
    return http.fetchPost('/invoice-address/save-or-update',data,self)
}
//删除 
export let deleteInvoiceAddr = (data,self)=>{
    return http.fetchPost('/invoice-address/delete',data,self)
}

//删除 
export let setDefaultInvoiceAddr  = (data,self)=>{
    return http.fetchPost('/invoice-address/set-default',data,self)
}