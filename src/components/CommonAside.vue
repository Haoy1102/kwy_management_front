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
        <h3> {{ isCollapse ? '后台' : '通用后台管理' }}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.lable" :index="item.lable">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>


    </el-menu>


</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
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
                    url: 'Home.vue'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '商品管理',
                    icon: 'video-play',
                    url: 'Mall.vue'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'User.vue'
                },

                {
                    path: '/customer',
                    name: 'customer',
                    label: '客户信息',
                    icon: 's-custom',
                    url: 'Customer.vue'
                },
                {
                    path: '/order',
                    name: 'order',
                    label: '订单管理',
                    icon: 's-order',
                    url: 'Order.vue'
                },
                {
                    label: '原料管理',
                    icon: 'box',
                    children: [
                        {
                            path: '/material_overview',
                            name: 'material_overview',
                            label: '材料总览',
                            icon: 'view',
                            url: 'MaterialOverview.vue'
                        },
                        {
                            path: '/material_info',
                            name: 'material_info',
                            label: '原料信息',
                            icon: 'info',
                            url: 'MaterialInfo.vue'
                        },
                        {
                            path: '/purchase',
                            name: 'purchase',
                            label: '采购',
                            icon: 'shopping-cart-2',
                            url: 'Purchase.vue'
                        },
                        {
                            path: '/goods_management',
                            name: 'goods_management',
                            label: '库存管理',
                            icon: 'box',
                            url: 'GoodsManagement.vue'
                        },
                        {
                            path: '/goods_record',
                            name: 'goods_record',
                            label: '库存记录',
                            icon: 'document',
                            url: 'GoodsRecord.vue'
                        }
                    ]
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 'setting',
                            url: 'PageOne.vue'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 'setting',
                            url: 'PageTwo.vue'
                        }
                    ]
                }
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
            // console.log(this.menuData.filter(item => !item.children),'noChildren')
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

