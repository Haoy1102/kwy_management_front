<template>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             :router="isRouter"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <h3> {{ isCollapse ? '后台' : '后台管理' }}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.lable" :index="item.index">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <h3 class="fixed-bottom">Beta-v1.0</h3>


    </el-menu>


</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    position: relative;
}

.el-menu {
    height: 100vh;

    h3 {
        color: white;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }

    .fixed-bottom {
        font-size: 14px;
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #545c64;
        color: rgb(204, 204, 204);
        padding: 10px;
        text-align: center;
        width: 50%;
    }
}
</style>

<script>
// import Cookie from "js-cookie";
export default {
    name: "CommonAside",
    data() {
        return {
            isRouter: true,
            menuData: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首页-账务',
                    icon: 's-home',
                    url: 'Home.vue',
                    index:1
                },
                {
                    path: '/employee_management',
                    name: 'employee_management',
                    label: '员工信息',
                    icon: 'user',
                    url: 'EmployeeManagement.vue',
                    index:2
                },
                {
                    label: '产品管理',
                    icon: 'sell',
                    index:3,
                    children: [
                        {
                            path: '/product_overview',
                            name: 'product_overview',
                            label: '产品总览',
                            icon: 'view',
                            url: 'ProductOverview.vue',
                            index:1
                        },
                        {
                            path: '/product_management',
                            name: 'product_management',
                            label: '产品管理',
                            icon: 'info',
                            url: 'ProductManagement.vue',
                            index:2
                        },
                        {
                            path: '/product_record',
                            name: 'product_record',
                            label: '批次记录',
                            icon: 'shopping-cart-2',
                            url: 'ProductRecord.vue',
                            index:3
                        },
                    ]
                },
                {
                    path: '/customer',
                    name: 'customer',
                    label: '客户信息',
                    icon: 's-custom',
                    url: 'Customer.vue',
                    index:4
                },
                {
                    path: '/order',
                    name: 'order',
                    label: '订单管理',
                    icon: 's-order',
                    url: 'Order.vue',
                    index:5
                },
                {
                    label: '原料管理',
                    icon: 'box',
                    index:6,
                    children: [
                        {
                            path: '/material_overview',
                            name: 'material_overview',
                            label: '材料总览',
                            icon: 'view',
                            url: 'MaterialOverview.vue',
                            index:1
                        },
                        {
                            path: '/goods_management',
                            name: 'goods_management',
                            label: '库存管理',
                            icon: 'box',
                            url: 'GoodsManagement.vue',
                            index:2
                        },
                        {
                            path: '/material_info',
                            name: 'material_info',
                            label: '采购管理',
                            icon: 'info',
                            url: 'MaterialInfo.vue',
                            index:3
                        },
                        {
                            path: '/purchase',
                            name: 'purchase',
                            label: '采购记录',
                            icon: 'shopping-cart-2',
                            url: 'Purchase.vue',
                            index:4
                        },
                        {
                            path: '/goods_record',
                            name: 'goods_record',
                            label: '库存记录',
                            icon: 'document',
                            url: 'GoodsRecord.vue',
                            index:5
                        }
                    ]
                },
            ],
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            //更新面包屑
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        // menuData() {
        //     // console.log(JSON.parse(Cookie.get('menu')),'menuData')
        //     // console.log(this.$store.state.tab.menu,'this.$store.state.tab.menu')
        //     return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        // }
    }
}
</script>
<style lang="less" scoped>
.el-menu {
    border-right: 0;
}
</style>

