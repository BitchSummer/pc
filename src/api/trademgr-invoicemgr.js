import http from "./base.js"

export let invoicePage = (data, self)=>{
    return http.fetchPost('/trade-invoice/page',data, self)
}

export let invoiceApply = (data, self)=>{
    return http.fetchPostJson('/trade-invoice/apply',data, self)
}

export let signInInvoice = (data, self)=>{
    return http.fetchPost('/trade-invoice/sign-in',data, self)
}

export let invoiceDetailList = (data, self)=>{
    return http.fetchPost('/trade-invoice/detail/list',data, self)
}
