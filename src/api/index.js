import http from "@/utils/request";

export const getData=()=>{
    return http.get('/home/getData')
}
export const getUser=(params)=>{
    return http.get('/user/getUser',params)
}

export const addUser=(data)=>{
    return http.post('/user/add',data)
}

export const editUser=(data)=>{
    return http.post('/user/edit',data)
}

export const delUser=(data)=>{
    return http.post('/user/del',data)
}

export const login=(data)=>{
    return http.post('/employee/login',data)
}

export const test=()=>{
    return http.post('/employee/test')
}

//customer
export const addCustomer=(data)=>{
    return http.post('/customers',data)
}
export const getCustomer=(params)=>{
    return http.get('/customers',params)
}