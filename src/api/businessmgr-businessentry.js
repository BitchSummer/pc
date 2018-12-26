import http from "./base.js"

//设备中心--设备模型
export let viewEntry = (data, self) => {
    return http.fetchPost('/business-entry/view', data, self)
}

export let submitApply = (data, self) => {
    return http.fetchPost('/business-entry/submit-apply', data, self)
}


