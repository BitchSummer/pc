import http from "./base.js"

export let reportList = (data, self)=>{
    return http.fetchGet('/my-report/list',data, self)
}

export let setTopOrDown = (data, self)=>{
    return http.fetchGet('/my-report/set-top-or-down',data, self)
}

export let schemeList = (data, self)=>{
    return http.fetchGet('/my-report/scheme/list',data, self)
}

export let schemeDetailList = (data, self)=>{
    return http.fetchGet('/my-report/scheme/detail/list',data, self)
}

export let saveOrUpdateScheme = (data, self)=>{
    return http.fetchPostJson('/my-report/scheme/save-or-update',data, self)
}

export let deleteScheme = (data, self)=>{
    return http.fetchGet('/my-report/scheme/delete',data, self)
}

