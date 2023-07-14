<template>
    <div class="manage">
        <el-dialog
            title="新增订单"
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="handleCloseForAdd">
            <!--  录入时用户的表单信息-->
            <el-form
                ref="addForm"
                :model="addForm"
                :rules="rules"
                label-width="auto"
                :close-on-click-modal="false">
                <el-form-item label="客户" prop="customer">
                    <el-select v-model="addForm.customerId" filterable placeholder="请选择客户"
                               @visible-change="selectCustomerClick"
                               @change="(customerId) => selectCustomerChange(customerId, 1)">
                        <el-option
                            v-for="item in options4Customer"
                            :key="item.value"
                            :label="item.customer"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单内容" prop="content">
                    <el-input type="textarea" placeholder="请输入订单内容" v-model="addForm.content"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="people">
                    <el-input placeholder="请输入联系人名称" v-model="addForm.people"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input placeholder="请输入联系电话" v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input placeholder="请输入地址" v-model="addForm.address"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" prop="createDate">
                    <el-date-picker
                        v-model="addForm.createDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单状态" prop="status">
                    <el-select v-model="addForm.status" filterable placeholder="">
                        <el-option
                            v-for="item in options4Status"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单金额" prop="amount">
                    <el-input-number
                        placeholder="请输入订单金额"
                        :precision="2"
                        v-model.number="addForm.amount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="出货进度" prop="deliveryProgress">
                    <el-input-number
                        placeholder="0-100"
                        v-model.number="addForm.deliveryProgress"
                        size="small">
                    </el-input-number>
                    <span> %</span>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="addForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForAdd">取 消</el-button>
                <el-button type="primary" @click="submitForAdd">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="编辑"
            :visible.sync="editDialogVisible"
            width="30%"
            :before-close="handleCloseForEdit">
            <!--  b时用户的表单信息-->
            <el-form
                ref="editForm"
                :model="editForm"
                :rules="rules"
                label-width="80px">
                <el-form-item label="客户" prop="customer">
                    <el-select disabled v-model="editForm.customer" filterable placeholder="请选择客户"
                    >
                        <el-option
                            v-for="item in options4Customer"
                            :key="item.value"
                            :label="item.customer"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单内容" prop="content">
                    <el-input type="textarea" placeholder="请输入订单内容" v-model="editForm.content"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="people">
                    <el-input placeholder="请输入联系人名称" v-model="editForm.people"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input placeholder="请输入联系电话" v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input placeholder="请输入地址" v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" prop="createDate">
                    <el-date-picker
                        v-model="editForm.createDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单状态" prop="status">
                    <el-select v-model="editForm.status" filterable placeholder="">
                        <el-option
                            v-for="item in options4Status"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单金额" prop="amount">
                    <el-input-number
                        placeholder="请输入订单金额"
                        :precision="2"
                        v-model.number="editForm.amount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="出货进度" prop="deliveryProgress">
                    <el-input-number
                        placeholder="0-100"
                        v-model.number="editForm.deliveryProgress"
                        size="small">
                    </el-input-number>
                    <span> %</span>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="editForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForEdit">取 消</el-button>
                <el-button type="primary" @click="submitForEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :visible.sync="editPaymentDialogVisible"
            :before-close="handleCloseForEditPayment">
            <el-table
                stripe
                height="90%"
                :data="curPaymentDetail"
                style="width: 100%">
                <el-table-column
                    prop="payDate"
                    label="回款日期">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="回款金额">
                </el-table-column>
                <el-table-column
                    width="150"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete4Payment(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
                <el-button type="primary" @click="handleAddPayment">添 加</el-button>
                <el-button @click="handleCloseForEditPayment">取 消</el-button>

            </span>
        </el-dialog>

        <el-dialog
            title="添加回款明细"
            :visible.sync="addPaymentDialogVisible"
            width="30%"
            :before-close="handleCloseForAddPayment">
            <el-form
                ref="payForm"
                :model="payForm"
                :rules="rules"
                label-width="80px">
                <el-form-item label="回款日期" prop="payDate">
                    <el-date-picker
                        v-model="payForm.payDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回款金额" prop="amount">
                    <el-input-number
                        placeholder="请输入回款金额"
                        :precision="2"
                        v-model.number="payForm.amount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="payForm.note">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForAddPayment">取 消</el-button>
                <el-button type="primary" @click="submitForAddPayment">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="printTicket" type="primary">
                打印
            </el-button>
            <el-button @click="handleAdd" type="primary">
                + 新增订单
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入订单号" v-model="pageData.orderId"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入客户名" v-model="pageData.customer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入地址" v-model="pageData.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="common-tabel">
            <el-table
                stripe
                height="90%"
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="客户名称">
                                <span>{{ props.row.customer }}</span>
                            </el-form-item>
                            <el-form-item label="订单内容">
                                <span>{{ props.row.content }}</span>
                            </el-form-item>
                            <el-form-item label="联系人 ">
                                <span>{{ props.row.people }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="地址信息">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="创建日期">
                                <span>{{ props.row.createDate }}</span>
                            </el-form-item>
                            <el-form-item label="订单状态">
                                <el-tag :type="statusLabels[props.row.status].type">
                                    {{ statusLabels[props.row.status].label }}
                                </el-tag>
                            </el-form-item>
                            <el-form-item label="订单金额">
                                <span>¥ {{ props.row.amount }}</span>
                            </el-form-item>
                            <el-form-item label="交付进度">
                                <span>{{ props.row.deliveryProgress }}%</span>
                            </el-form-item>
                            <el-form-item label="已回金额">
                                <span>¥ {{ props.row.totalPayment }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.note }}</span>
                            </el-form-item>
                            <el-form-item label="最后操作">
                                <span>{{ props.row.updateTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="customer"
                    label="客户">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="订单内容">
                </el-table-column>
                <el-table-column
                    prop="people"
                    label="联系人"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="日期"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="90">
                    <template slot-scope="props">
                        <el-tag :type="statusLabels[props.row.status].type">{{
                                statusLabels[props.row.status].label
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="订单金额">
                    <template slot-scope="props">
                        ¥ {{ props.row.amount }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deliveryProgress"
                    label="交付进度"
                    width="80">
                    <template slot-scope="props">
                        {{ props.row.deliveryProgress }}%
                    </template>
                </el-table-column>
                <el-table-column
                    prop="totalPayment"
                    label="已回金额">
                    <template slot-scope="props">
                        ¥ {{ props.row.totalPayment }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="210"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handlePayment(scope.$index, scope.row)">回款
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                    layout="prev, pager, next"
                    :total="pageData.total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
import http from "@/utils/request";

export default {
    name: "Order",
    data() {
        return {
            addDialogVisible: false,
            editDialogVisible: false,
            addPaymentDialogVisible: false,
            editPaymentDialogVisible: false,
            tableData: [],
            options4Customer: [],
            options4Status: [
                {
                    label: "未制作",
                    value: 1

                }, {
                    label: "制作中",
                    value: 2
                }, {
                    label: "部分交付",
                    value: 3
                }, {
                    label: "待回款",
                    value: 4
                }, {
                    label: "完成",
                    value: 5
                }, {
                    label: "返厂",
                    value: 6
                }, {
                    label: "作废",
                    value: 7
                }
            ],
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                customer: '',
                address: '',
                orderId: '',
            },
            payForm: {
                id: '',
                orderId: '',
                payDate: '',
                amount: '',
                note: '',
            },
            addForm: {
                id: 0,
                orderId: "",
                customerId: '',
                customer: "",
                people: "",
                content: "",
                phone: "",
                address: "",
                createDate: "",
                status: 1,
                amount: '',
                deliveryProgress: '',
                totalPayment: '',
                note: "",
            },
            editForm: {
                id: 0,
                customerId: "",
                orderId: "",
                customer: "",
                people: "",
                content: "",
                phone: "",
                address: "",
                createDate: "",
                status: 1,
                amount: '',
                deliveryProgress: '',
                totalPayment: '',
                note: "",
            },
            curPaymentDetail: [
                {}, {}, {}, {}
            ],
            curOrderInfo: '',
            statusLabels: {
                1: {type: 'warning', label: '未制作'},
                2: {type: 'info', label: '制作中'},
                3: {type: 'info', label: '部分交付'},
                4: {type: '', label: '待回款'},
                5: {type: 'success', label: '完成'},
                6: {type: 'danger', label: '返厂'},
                7: {type: 'danger', label: '作废'}
            },
            rules: {
                customer: [
                    {required: true, message: '请选择客户公司'}
                ],
                status: [
                    {required: true, message: '请选择订单状态'}
                ],
                amount: [
                    {required: true, message: '请输入订单金额'},
                    {type: 'number', message: '必须为数字值'}
                ],
                deliveryProgress: [
                    {type: 'number', message: '必须为0-100数字值'}
                ],
                payDate: [
                    {required: true, message: '请选择回款日期'}
                ]
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
        }
    },
    methods: {
        // 在Element UI的某个事件中触发打印
        printTicket() {
            window.print();
        },
        //新增提交表单
        submitForAdd() {
            this.$refs.addForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/orders`, this.addForm).then(({data}) => {
                        // console.log(data)
                        if (!data.code) {
                            this.handleCloseForAdd()
                            this.$message.success(data.message)
                        } else {
                            this.$message.error(data.message)
                        }
                    }).finally(() => {
                        //重新加载数据
                        this.getPage();
                    })
                }
            })
        },
        //编辑提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/orders`, this.editForm).then(({data}) => {
                        console.log(data)
                        if (!data.code) {
                            this.handleCloseForEdit()
                            this.$message.success(data.message)
                        } else {
                            this.handleCloseForEdit()
                            this.$message.error(data.message)
                        }
                    }).finally(() => {
                        //重新加载数据
                        this.getPage();
                    })
                }
            })
        },
        //新增回款明细提交表单
        submitForAddPayment() {
            this.payForm.orderId = this.curOrderInfo.orderId
            http.post(`/paymentDetails`, this.payForm).then(({data}) => {
                if (!data.code) {
                    this.$message.success(data.message)
                    this.handleCloseForAddPayment()
                } else {
                    this.$message.error(data.message)
                }
            }).finally(() => {
                this.getPaymentDetail(this.curOrderInfo.orderId)
                this.getPage()
            })
        },
        //查询按钮点击事件
        searchSubmit() {
            this.getPage()
        },
        //录入按钮点击事件
        handleAdd() {
            this.addDialogVisible = true
        },
        //新增明细点击事件
        handleAddPayment() {
            this.addPaymentDialogVisible = true;
        },
        //编辑按钮点击事件
        handleEdit(index, row) {
            this.editDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editForm = JSON.parse(JSON.stringify(row))
        },
        //回款按钮点击事件
        handlePayment(index, row) {
            //获取回款明细
            this.getPaymentDetail(row.orderId)

            this.editPaymentDialogVisible = true
            //获取当前orderInfo
            this.curOrderInfo = row;
        },
        //新增订单弹窗关闭
        handleCloseForAdd() {
            this.$refs.addForm.resetFields()
            this.addDialogVisible = false
        },
        //编辑订单弹窗关闭
        handleCloseForEdit() {
            this.editDialogVisible = false
        },
        //新增明细弹窗关闭
        handleCloseForAddPayment() {
            this.$refs.payForm.resetFields()
            this.addPaymentDialogVisible = false
        },
        //管理明细弹窗关闭
        handleCloseForEditPayment() {
            this.editPaymentDialogVisible = false
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/orders/${row.id}`).then(({data}) => {
                    if (!data.code) {
                        this.$message.success(data.message)
                    } else {
                        this.$message.error(data.message)
                    }
                }).finally(() => {
                    //重新加载数据
                    this.getPage();
                })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //删除明细按钮点击事件
        handleDelete4Payment(index, row) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/paymentDetails/${row.id}`).then(({data}) => {
                    if (!data.code) {
                        this.$message.success(data.message)
                        // this.handleCloseForEditPayment()
                    } else {
                        this.$message.error(data.message)
                    }
                }).finally(() => {
                    //重新加载数据
                    this.getPaymentDetail(this.curOrderInfo.orderId);
                    this.getPage()
                })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //获取页面
        getPage() {
            http.get(`/orders/${this.pageData.currentPage}/${this.pageData.pageSize}/?customer=${this.pageData.customer}&address=${this.pageData.address}&orderId=${this.pageData.orderId}`)
                .then(({data}) => {
                        if (!data.code) {
                            data.data.records.forEach(record => {
                                record.amount = record.amount.toFixed(2)
                                record.totalPayment = record.totalPayment.toFixed(2)
                            });
                            this.tableData = data.data.records
                            this.pageData.total = data.data.total
                        } else {
                            this.$message.error(`获取页面信息失败!${data.message}`)
                        }
                    }
                )
        },
        //请求回款明细
        getPaymentDetail(orderId) {
            http.get(`/paymentDetails/${orderId}`).then(({data}) => {
                if (!data.code) {
                    this.curPaymentDetail = data.data
                    this.curPaymentDetail.forEach((item) => {
                        item.amount = item.amount.toFixed(2)
                    })
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //页码栏点击事件
        handlePage(currentPage) {
            this.pageData.currentPage = currentPage
            this.getPage()
        },
        //弹出客户选择选项
        selectCustomerClick() {
            http.get("/customers").then(({data}) => {
                if (!data.code) {
                    this.options4Customer = data.data
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //选择客户后自动填充
        selectCustomerChange(customerId,) {
            let customerData = {}
            customerData = this.options4Customer.find(item => item.id === customerId)
            this.addForm.people = JSON.parse(JSON.stringify(customerData.people))
            this.addForm.phone = JSON.parse(JSON.stringify(customerData.phone))
            this.addForm.address = JSON.parse(JSON.stringify(customerData.address))
            this.addForm.customer = JSON.parse(JSON.stringify(customerData.customer))
        },
    },
    mounted() {
        //获取页面
        this.getPage()
    }
}
</script>

<style lang="less" scoped>
.manage {
    height: 90%;

    .text-container {
        display: inline-block;
        margin-right: 10px; /* 可以根据需要调整间距 */

        .detail-font {
            font-size: 12px;
            margin-top: 3px;
            margin-bottom: 3px;
            line-height: 1.0;
        }
    }

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .common-tabel {
        position: relative;
        height: calc(100% - 62px);

        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }

        .demo-table-expand .el-form-item {
            margin-left: 5%;
            margin-right: 5%;
            margin-bottom: 0;
            width: 90%;
        }

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }

    @media print {
        /* 打印样式规则 */
        /* 隐藏不需要打印的元素 */
        .no-print {
            display: none;
        }
        /* 调整打印页面的布局和样式 */
        /* 例如，设置合适的页面尺寸、页边距等 */
    }

}
</style>