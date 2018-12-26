
import http from "./base.js"

//设备中心--设备模型
export let viewMsg = (data, self) => {
    return http.fetchPost('/business-msg/view', data, self)
}

export let monthMsgList = (data, self) => {
    return http.fetchPost('/business-msg/month-list', data, self)
}

export let purchaseRecordList = (data, self) => {
    return http.fetchPost('/business-msg/purchase-record', data, self)
}

export let msgPrice = (data, self) => {
    return http.fetchPost('/business-msg/msg-price', data, self)
}

export let sumbitPurchaseApply = (data, self) => {
    return http.fetchPost('/business-msg/submit-apply', data, self)
}

export let deletePurchaseApply = (data, self) => {
    return http.fetchPost('/business-msg/purchase-record/delete', data, self)
}


// 下拉
export let findYearList = (data, self) => {
    return http.fetchPost('/business-msg/findYearList', data, self)
}