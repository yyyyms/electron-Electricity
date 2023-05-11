import request from "../util/request";
export const getAll = (params) =>{
    // console.log(params);
    return request.request({
        url:'getAll',
        method:"get",
        params,
        headers:{}
    })
}

export const sendElectricityone = (params) =>{
    // console.log(params);
    return request.request({
        url:'/one',
        method:"post",
        data: params,
        headers:{}
    })
}
export const sendElectricitytwo = (params) =>{
    // console.log(params);
    return request.request({
        url:'/two',
        method:"post",
        data: params,
        headers:{}
    })
}
export const sendElectricitythree = (params) =>{
    // console.log(params);
    return request.request({
        url:'/three',
        method:"post",
        data: params,
        headers:{}
    })
}
