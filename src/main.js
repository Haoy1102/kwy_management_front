import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import http from './utils/request'
import './api/mock'
import Cookie from "js-cookie";


// import {Axios} from "axios";
//
// // 设置全局的axios
// Vue.prototype.$axios=Axios
// // 设置基本路径
// Axios.defaults.baseURL='/api'

Vue.config.productionTip = false
Vue.use(ElementUI);

// const router = new VueRouter({...})
//添加全局前置导航守卫
// router.beforeEach((to, from, next) => {
//     // 判断token是否存在
//     const token = Cookie.get('token')
//     if (!token && to.name !== 'login') {
//         next({name: 'login'})
//     }else if (token && to.name==='login') {
//         next({name:'home'})
//     }else {
//         next()
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('addMenu',router)
    }
}).$mount('#app')
