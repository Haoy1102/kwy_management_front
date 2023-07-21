<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/img/logo.png" alt="">
                    <div class="userinfo">
                        <p class="name">{{ this.employee.name }}</p>
                        <p class="access">{{ this.employee.status }}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登陆时间: <span>---以下内容待开发---</span></p>
                    <p>上次登陆地点: <span>---以下内容待开发---</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 460px;">
                <!--                <el-table-->
                <!--                    :data="tableData"-->
                <!--                    style="width: 100%">-->
                <!--                    &lt;!&ndash;                    <el-table-column&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        prop="name"&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        label="商家">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    <el-table-column&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        prop="todayBuy"&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        label="今日购买">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    <el-table-column&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        prop="monthBuy"&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        label="本月购买">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    <el-table-column&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        prop="totalBuy"&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        label="总购买">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
                <!--                    <el-table-column v-for="(val,key) in tableLable" :key="key" :prop="key" :label="val"/>-->
                <!--                </el-table>-->
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="price">¥ {{ item.value }}</p>
                        <p class="desc">{{ item.lable }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px"></div>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px">
                    <!--                    <div ref="echarts2" style="height: 260px"></div>-->
                </el-card>
                <el-card style="height: 260px">
                    <!--                    <div ref="echarts3" style="height: 240px"></div>-->
                </el-card>
            </div>

        </el-col>
    </el-row>

</template>

<script>
import http from "@/utils/request";
import * as echarts from "echarts";

export default {
    name: "Home",
    data() {
        return {
            tableData: [],
            tableLable: {
                name: "商家",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            employee: {
                name: '',
                status: '',
            },
            countData: [
                {
                    name: "totalAmount",
                    lable: '近3月订单总额',
                    value: null,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "totalAmountCurrent",
                    lable: '现存订单额',
                    value: null,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "totalAmountDelivered",
                    lable: "已出货金额",
                    value: null,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "totalAmountNoDelivered",
                    lable: "未出货金额",
                    value: null,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "totalAmountDebt",
                    lable: "待入账总金额",
                    value: null,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "totalAssetsMaterial",
                    lable: "原材料总资产",
                    value: null,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        }
    },
    methods: {
        getAcount() {
            let month = 3
            http.get(`/accounts/${month}`).then(({data}) => {
                if (!data.code) {
                    data.data.totalAmount = data.data.totalAmount !== null ? data.data.totalAmount.toFixed(2) : null;
                    data.data.totalAmountCurrent = data.data.totalAmountCurrent !== null ? data.data.totalAmountCurrent.toFixed(2) : null;
                    data.data.totalAmountDelivered = data.data.totalAmountDelivered !== null ? data.data.totalAmountDelivered.toFixed(2) : null;
                    data.data.totalAmountNoDelivered = data.data.totalAmountNoDelivered !== null ? data.data.totalAmountNoDelivered.toFixed(2) : null;
                    data.data.totalAmountDebt = data.data.totalAmountDebt !== null ? data.data.totalAmountDebt.toFixed(2) : null;
                    data.data.totalAssetsMaterial = data.data.totalAssetsMaterial !== null ? data.data.totalAssetsMaterial.toFixed(2) : null;
                    this.countData = this.countData.map(item => {
                        // 在这里根据你的需求修改value的值
                        item.value = data.data[item.name]; // 使用data中对应的值来替换
                        return item;
                    });
                } else {
                    this.$message.error(data.messages)
                }
            })
        },
        getEmployeesInfo() {
            http.get(`/employees/sessions`).then(({data}) => {
                if (!data.code) {
                    if (data.data) {
                        this.$set(this.employee, "status", "超级管理员")
                    } else {
                        this.$set(this.employee, "status", "管理员")
                    }
                } else {
                    this.$message.error(`获取用户身份信息失败!${data.message}`)
                }
            })
            http.get(`/employees`).then(({data}) => {
                if (!data.code) {
                    this.$set(this.employee, "name", data.data.name)
                } else {
                    this.$message.error(`获取用户身份信息失败!${data.message}`)
                }
            })
        }

    },
    mounted() {
        this.getAcount()
        this.getEmployeesInfo()
    },
}
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: left;

        .price {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999;
            text-align: left;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}
</style>