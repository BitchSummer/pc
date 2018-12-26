import http from "./base.js"

export let matterPage = (data, self)=>{
    return http.fetchPost('/trade-delivery/matter-page',data, self)
}

export let matterDetailList = (data, self)=>{
    return http.fetchPost('/trade-delivery/matter-detail/list',data, self)
}

export let grantPage = (data, self)=>{
    return http.fetchPost('/trade-delivery/grant-page',data, self)
}

export let filePage = (data, self)=>{
    return http.fetchPost('/trade-delivery/file-page',data, self)
}

export let signInOrRefuseDeliver = (data, self)=>{
    return http.fetchPost('/trade-delivery/sign-in-or-refuse',data, self)
}

