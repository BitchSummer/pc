import http from "./base.js"

//设备中心--设备模型
export let viewApply = (data, self) => {
    return http.fetchPost('/business-market/view', data, self)
}

export let submitApply = (data, self) => {
    return http.fetchPost('/business-market/submit-apply', data, self)
}

