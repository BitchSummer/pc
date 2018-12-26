import http from "./base.js"

export let payablePage = (data, self)=>{
    return http.fetchPost('/trade-payable/page',data, self)
}

export let orderPage = (data, self)=>{
    return http.fetchPost('/trade-payable/order/page',data, self)
}

export let orderDetailList = (data, self)=>{
    return http.fetchPost('/trade-payable/order-detail/list',data, self)
}