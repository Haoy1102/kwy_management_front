<template>
    <!--        <h1>Customer</h1>-->
    <div class="manage">
        <!--        录入对话框-->
        <el-dialog
            title="添加"
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="handleCloseForAdd">
            <!--  录入时用户的表单信息-->
            <el-form
                ref="addForm"
                :model="addForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="username">
                    <el-input placeholder="请输入账户名" v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input placeholder="请输入联系电话" v-model="addForm.phone"></el-input>
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
            <!--  录入时用户的表单信息-->
            <el-form
                ref="editForm"
                :model="editForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="username">
                    <el-input placeholder="请输入账户名" v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input placeholder="请输入联系电话" v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="用户状态" prop="status">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForEdit">取 消</el-button>
                <el-button type="primary" @click="submitForEdit">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入姓名" v-model="pageData.name"></el-input>
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
                style="width: 100%"
                @expand-change="handleExpandChange">
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="账号">
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    label="用户状态"
                    prop="status">
                    <template slot-scope="props">
                        <el-tag :type="status4isDelivered[props.row.status].type">{{
                                status4isDelivered[props.row.status].label
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    width="210"
                    label="操作"
                >
                    <template slot-scope="scope" v-if="isAdmin">
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
import {Loading} from "element-ui";

export default {
    name: "EmployeeManagement",
    data() {
        return {
            addDialogVisible: false,
            editDialogVisible: false,
            checkBillDialogVisible: false,
            tableData: [{
                id: '',
                customer: '',
                people: '',
                phone: '',
                phoneStandby: '',
                address: '',
                note: '',
                totalAmountPerYear: '',
                totalAmountCurrent: '',
                totalAmountDelivered: '',
                totalAmountDebt4Completed: '',
                totalAmountDebt: '',
            }],
            isAdmin:false,
            customerDetails: [],// 展开行的数据
            expandedRows: {},
            expandedDetailRows:{},
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                name:''
            },
            status4isDelivered: {
                0: {type: 'danger', label: '禁用'},
                1: {type: 'success', label: '正常'},
                2: {type: 'primary', label: '超级管理员'},
            },
            checkForm: {
                customerId: '',
                customer: '',
                startDate: '',
                endDate: ''
            },
            editForm: {
                id: '',
                customer: '',
                people: '',
                phone: '',
                phoneStandby: '',
                address: '',
                note: '',
            },
            addForm: {
                id: '',
                customer: '',
                people: '',
                phone: '',
                phoneStandby: '',
                address: '',
                note: '',
            },
            options4Status: [
                {
                    label: "禁用",
                    value: 0

                }, {
                    label: "正常",
                    value: 1
                }
            ],
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
                name: [
                    {required: true, message: '请输入姓名'}
                ],
                username: [
                    {required: true, message: '请输入账户名'}
                ],
                password: [
                    {required: true, message: '请输入密码'}
                ],
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '本月初',
                        onClick(picker) {
                            const date = new Date();
                            date.setDate(1);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '本月末',
                        onClick(picker) {
                            const date = new Date();
                            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                            picker.$emit('pick', lastDayOfMonth);
                        }
                    },
                    {
                        text: '本年初',
                        onClick(picker) {
                            const date = new Date();
                            date.setMonth(0);
                            date.setDate(1);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '本年末',
                        onClick(picker) {
                            const date = new Date();
                            date.setMonth(11);
                            date.setDate(31);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
        }
    },
    methods: {
        //新增客户提交表单
        submitForAdd() {
            this.$refs.addForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/employees`, this.addForm).then(({data}) => {
                        console.log(data)
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
        //提交查看对账单请求
        submitForCheckBill() {
            this.$confirm('此操作会生成Excel格式订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 获取选择的日期
                let selectedDate = new Date(this.checkForm.endDate);
                // 格式化日期为LocalDate格式
                this.checkForm.endDate = selectedDate.toISOString().split('T')[0];
                selectedDate = new Date(this.checkForm.startDate);
                // 格式化日期为LocalDate格式
                this.checkForm.startDate = selectedDate.toISOString().split('T')[0];

                let loadingInstance = Loading.service({text: "正在处理中..."})
                http.get(`/customers/checkBills/${this.checkForm.customerId}/?startDate=${this.checkForm.startDate}&endDate=${this.checkForm.endDate}`
                    , {responseType: 'blob'})
                    .then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `对账_${this.checkForm.customer}_${this.checkForm.startDate}_${this.checkForm.endDate}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }).finally(() => {
                    loadingInstance.close();
                })
                    .catch(error => {
                        console.error('Error downloading Excel file:', error);
                    })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })


        },
        //编辑客户提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/employees`, this.editForm).then(({data}) => {
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
        //查询按钮点击事件
        searchSubmit() {
            this.getPage()
        },
        //录入按钮点击事件
        handleAdd() {
            this.addDialogVisible = true
        },
        //对账按钮点击事件
        handleCheckBill(index, row) {
            this.checkForm.customerId = row.id
            this.checkForm.customer = row.customer
            this.checkBillDialogVisible = true
        },
        //编辑按钮点击事件
        handleEdit(index, row) {
            this.editDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editForm = JSON.parse(JSON.stringify(row))
        },
        //录入弹窗关闭
        handleCloseForAdd() {
            this.$refs.addForm.resetFields()
            this.addDialogVisible = false
        },
        //对账弹窗关闭
        handleCloseForCheckBill() {
            this.checkBillDialogVisible = false
        },
        //编辑弹窗关闭
        handleCloseForEdit() {
            this.editDialogVisible = false
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/employees/${row.id}`).then(({data}) => {
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
        //获取页面
        getPage() {
            http.get(`/employees/sessions`).then(({data}) => {
                if (!data.code) {
                    this.isAdmin=data.data
                    console.log(this.isAdmin,"this.isAdmin")
                } else {
                    this.$message.error(`获取用户身份信息失败!${data.message}`)
                }
            })
            http.get(`/employees/${this.pageData.currentPage}/${this.pageData.pageSize}/?name=${this.pageData.name}`).then(({data}) => {
                    if (!data.code) {
                        this.tableData = data.data.records
                        this.pageData.total = data.data.total
                    } else {
                        this.$message.error(`获取页面信息失败!${data.message}`)
                    }
                }
            )
        },
        //请求订单明细
        getOrderDetails(orderId) {
            http.get(`/orders/orderDetails/${orderId}`).then(({data}) => {
                if (!data.code) {
                    data.data.forEach(record => {
                        if (record.price !== null) {
                            record.price = record.price.toFixed(2)
                        }
                        if (record.amount !== null) {
                            record.amount = record.amount.toFixed(2)
                        }
                    })
                    this.$set(this.expandedDetailRows, orderId, data.data)
                    console.log(this.expandedDetailRows,"this.expandedDetailRows")
                }
            })
        },
        //页码栏点击事件
        handlePage(currentPage) {
            this.pageData.currentPage = currentPage
            this.getPage()
        },
        //处理行展开事件
        handleExpandChange(row) {
            const index = this.tableData.indexOf(row);
            if (index !== -1) {
                http.get(`/customers/${row.id}`).then(({data}) => {
                    if (!data.code) {
                        data.data.totalAmountPerYear = data.data.totalAmountPerYear !== null ? data.data.totalAmountPerYear.toFixed(2) : null;
                        data.data.totalAmountCurrent = data.data.totalAmountCurrent !== null ? data.data.totalAmountCurrent.toFixed(2) : null;
                        data.data.totalAmountDelivered = data.data.totalAmountDelivered !== null ? data.data.totalAmountDelivered.toFixed(2) : null;
                        data.data.totalAmountDebt4Completed = data.data.totalAmountDebt4Completed !== null ? data.data.totalAmountDebt4Completed.toFixed(2) : null;
                        data.data.totalAmountPayment = data.data.totalAmountPayment !== null ? data.data.totalAmountPayment.toFixed(2) : null;
                        data.data.totalAmountDebt = data.data.totalAmountDebt !== null ? data.data.totalAmountDebt.toFixed(2) : null;
                        this.$set(this.customerDetails, index, JSON.parse(JSON.stringify(data.data)));
                    }
                });
            }
            http.get(`/orders/customers/${row.id}`).then(({data}) => {
                if (!data.code) {
                    data.data.forEach(record => {
                        if (record.amount !== null) {
                            record.amount = record.amount.toFixed(2)
                        }
                        if (record.totalPayment !== null) {
                            record.totalPayment = record.totalPayment.toFixed(2)
                        }
                    })
                    this.$set(this.expandedRows, row.id, data.data)
                }
            })
        },
        //处理内部(订单细节)行展开事件
        handleExpandChangeDetail(row){
            this.getOrderDetails(row.orderId)
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

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .common-tabel {
        position: relative;
        height: calc(100% - 62px);

        //.demo-table-expand {
        //    font-size: 0;
        //}

        //.demo-table-expand label {
        //    width: 90px;
        //    color: #99a9bf;
        //}

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

        .item-tooltip {
            width: 3%;
        }
    }

}
</style>