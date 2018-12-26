import http from "./base.js"

//设备中心--设备模型
export let accountInfo = (data, self) => {
    return http.fetchPost('/account-mgr/view', data, self)
}

export let authInfo = (data, self) => {
    return http.fetchPost('/account-mgr/auth/view', data, self)
}

export let accountReName = (data, self) => {
    return http.fetchPost('/account-mgr/re-name', data, self)
}

export let accountRePsw = (data, self) => {
    return http.fetchPost('/account-mgr/re-psw', data, self)
}

export let accountReEmail = (data, self) => {
    return http.fetchPost('/account-mgr/re-email', data, self)
}

export let accountRePhone = (data, self) => {
    return http.fetchPost('/account-mgr/re-phone', data, self)
}
//发送验证码
export let sendCheckCode = (data, self) => {
    return http.fetchPost('/account-mgr/send-check-code', data, self)
}
//确认修改
export let checkCheckCode = (data, self) => {
    return http.fetchPost('/account-mgr/check-check-code', data, self)
}

export let authSubmit = (data, self) => {
    return http.fetchPost('/account-mgr/auth/submit', data, self)
}
//上传头像
export let changeHeadImg = (data, self) => {
    return http.fetchPost('/account-mgr/re-headImg', data, self)
}