
import http from "./base.js"

//设备中心--设备模型
export let viewStorage = (data, self) => {
    return http.fetchPost('/business-storage/view', data, self)
}

export let monthList = (data, self) => {
    return http.fetchPost('/business-storage/month-list', data, self)
}

export let purchaseRecordList = (data, self) => {
    return http.fetchPost('/business-storage/purchase-record', data, self)
}

export let monthPrice = (data, self) => {
    return http.fetchPost('/business-storage/month-price', data, self)
}

export let sumbitPurchaseApply = (data, self) => {
    return http.fetchPost('/business-storage/submit-apply', data, self)
}

export let findYearList = (data, self) => {
  return http.fetchPost('/business-storage/findYearList', data, self)
}

