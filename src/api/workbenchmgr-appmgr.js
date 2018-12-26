import http from "./base.js"

export let appList = (data, self)=>{
    return http.fetchGet('/my-app/list',data, self)
}

export let setTopOrDown = (data, self)=>{
    return http.fetchGet('/my-app/set-top-or-down',data, self)
}