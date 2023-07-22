import Vue from 'vue'
import VueRouter from "vue-router"
import Home from "@/views/Home.vue";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Customer from "@/views/Customer.vue";
import Order from "@/views/Order.vue";
import MaterialOverview from "@/views/MaterialOverview.vue";
import MaterialInfo from "@/views/MaterialInfo.vue";
import Purchase from "@/views/PurchaseRecord.vue"
import GoodsManagement from "@/views/GoodsManagement.vue";
import GoodsRecord from "@/views/GoodsRecord.vue";
import EmployeeManagement from "@/views/EmployeeManagement.vue";
import ProductOverview from "@/views/ProductOverview.vue";
import ProductManagement from "@/views/ProductManagement.vue";
import ProductRecord from "@/views/ProductRecord.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect: '/home',
        children: [
            {path: 'home', name: 'home', component: Home},    //首页
            // {path: 'user', name: 'user', component: User},    //用户管理
            // {path: 'mall', name: 'mall', component: Mall},    //商品管理
            // {path: 'page1', name: 'page1', component: PageOne},
            // {path: 'page2', name: 'page2', component: PageTwo},

            {path: 'employee_management', name: 'employee_management', component: EmployeeManagement},    //员工管理
            {path: 'customer', name: 'customer', component: Customer},    //客户信息
            {path: 'order', name: 'order', component: Order},    //订单管理
            {path: 'material_overview', name: 'material_overview', component: MaterialOverview},    //材料总览
            {path: 'material_info', name: 'material_info', component: MaterialInfo},    //原料信息
            {path: 'purchase', name: 'purchase', component: Purchase},    //采购
            {path: 'goods_management', name: 'goods_management', component: GoodsManagement},    //库存管理
            {path: 'goods_record', name: 'goods_record', component: GoodsRecord},    //库存记录
            {path: 'product_overview', name: 'product_overview', component: ProductOverview},    //库存记录
            {path: 'product_management', name: 'product_management', component: ProductManagement},    //库存记录
            {path: 'product_record', name: 'product_record', component: ProductRecord},    //库存记录

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


