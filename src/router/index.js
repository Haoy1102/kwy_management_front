import Vue from 'vue'
import VueRouter from "vue-router"
import Home from "@/views/Home.vue";
import User from "@/views/User.vue";
import Main from "@/views/Main.vue";
import Mall from "@/views/Mall.vue";
import PageOne from "@/views/PageOne.vue";
import PageTwo from "@/views/PageTwo.vue";
import Login from "@/views/Login.vue";
import Customer from "@/views/Customer.vue";
import Order from "@/views/Order.vue";
import MaterialOverview from "@/views/MaterialOverview.vue";
import MaterialInfo from "@/views/MaterialInfo.vue";
import Purchase from "@/views/Purchase.vue"
import GoodsManagement from "@/views/GoodsManagement.vue";
import GoodsRecord from "@/views/GoodsRecord.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect: '/home',
        children: [
            {path: 'home', name: 'home', component: Home},    //首页
            {path: 'user', name: 'user', component: User},    //用户管理
            {path: 'mall', name: 'mall', component: Mall},    //商品管理
            {path: 'page1', name: 'page1', component: PageOne},
            {path: 'page2', name: 'page2', component: PageTwo},

            {path: 'customer', name: 'customer', component: Customer},    //客户信息
            {path: 'order', name: 'order', component: Order},    //订单管理
            {path: 'material_overview', name: 'material_overview', component: MaterialOverview},    //材料总览
            {path: 'material_info', name: 'material_info', component: MaterialInfo},    //原料信息
            {path: 'purchase', name: 'purchase', component: Purchase},    //采购
            {path: 'goods_management', name: 'goods_management', component: GoodsManagement},    //库存管理
            {path: 'goods_record', name: 'goods_record', component: GoodsRecord},    //库存记录

        ]
    },
    {
        path: '/login',
        name:'login',
        component: Login
    }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router


