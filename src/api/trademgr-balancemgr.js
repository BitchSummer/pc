import http from "./base.js"

export let balancePage = (data, self)=>{
    return http.fetchPost('/trade-balance/page',data, self)
}

export let signOutBalance = (data, self)=>{
    return http.fetchPostJson('/trade-balance/sign-out',data, self)
}

export let balanceDetailList = (data, self)=>{
    return http.fetchPost('/trade-balance/detail/list',data, self)
}

export let orderList = (data, self)=>{
    return http.fetchPost('/trade-order/list',data, self)
}