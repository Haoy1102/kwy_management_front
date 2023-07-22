import axios from "axios";
import router from "@/router";
import Cookie from "js-cookie";


const http = axios.create({
    //通用请求地址前缀
    baseURL: '/api',
    timeout: 10000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(
    response => {
        //如果接口返回token，替换本地旧token
        // if (response.headers.token) {
        //     sessionStorage.setItem("token", response.headers.token);
        // }
        console.log(response)
        //自定义设置后台返回code对应的响应方式
        if (response.data.code === 41015) { // 未登录或登录超时
            Cookie.remove('employeeId')
            if (router.currentRoute.path !== '/login') { // 当前页面不是登录页面
                router.push('login'); // 替换为你的首页路由路径
            }
            // return Promise.reject(new Error('登录超时'));
        }
        return response;
    },
    error => {
        if (error.message) {
            this.$massage.error('服务器开小差了，请稍后再试!')
            //错误响应
            // alert('服务器开小差了，请稍后再试!')
        }
        return Promise.reject(error);
    }
);

export default http
