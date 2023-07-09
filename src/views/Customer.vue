<template>
    <!--        <h1>Customer</h1>-->
    <div class="manage">
        <!--        录入对话框-->
        <el-dialog
            title="录入"
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="handleCloseForAdd">
            <!--  录入时用户的表单信息-->
            <el-form
                ref="addForm"
                :model="addForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="客户" prop="customer">
                    <el-input placeholder="请输入客户公司名称" v-model="addForm.customer"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="people">
                    <el-input placeholder="请输入联系人名称" v-model="addForm.people"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input placeholder="请输入联系电话" v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="备用电话" prop="phone_standby">
                    <el-input placeholder="请输入备用电话" v-model="addForm.phoneStandby"></el-input>
                </el-form-item>
                <el-form-item label="默认地址" prop="address">
                    <el-input placeholder="请输入地址" v-model="addForm.address"></el-input>
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
            <!--  录入时用户的表单信息-->
            <el-form
                ref="editForm"
                :model="editForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="客户" prop="customer">
                    <el-input :disabled="true" placeholder="请输入客户公司名称" v-model="editForm.customer"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="people">
                    <el-input placeholder="请输入联系人名称" v-model="editForm.people"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input placeholder="请输入联系电话" v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="备用电话">
                    <el-input placeholder="请输入备用电话" v-model="editForm.phoneStandby"></el-input>
                </el-form-item>
                <el-form-item label="默认地址">
                    <el-input placeholder="请输入地址" v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="备注">
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

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 录入
            </el-button>
            <el-form :inline="true" :model="pageData">
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
                            <el-form-item label="联系人 ">
                                <span>{{ props.row.people }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="备用电话">
                                <span>{{ props.row.phoneStandby }}</span>
                            </el-form-item>
                            <el-form-item label="地址信息">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="年总成交额">
                                <span>{{ props.row.totalAmountPerYear }}</span>
                            </el-form-item>
                            <el-form-item label="现存订单额">
                                <span>{{ props.row.totalAmountCurrent }}</span>
                            </el-form-item>
                            <el-form-item label="已出货额">
                                <span>{{ props.row.totalAmountDelivered }}</span>
                            </el-form-item>
                            <el-form-item label="欠缴">
                                <span>{{ props.row.totalAmountDebt }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.note }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="customer"
                    label="客户">
                </el-table-column>
                <el-table-column
                    prop="people"
                    label="联系人">
                </el-table-column>
                <el-table-column
                    prop="totalAmountPerYear"
                    label="年总成交额">
                </el-table-column>
                <el-table-column
                    prop="totalAmountCurrent"
                    label="现存订单额">
                </el-table-column>
                <el-table-column
                    prop="totalAmountDelivered"
                    label="已出货额">
                </el-table-column>
                <el-table-column
                    prop="totalAmountDebt"
                    label="欠缴">
                </el-table-column>
                <el-table-column
                    prop="note"
                    label="备注">
                </el-table-column>
                <el-table-column
                    width="150"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
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
    name: "Customer",
    data() {
        return {
            addDialogVisible: false,
            editDialogVisible: false,
            tableData: [],
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                customer: '',
                address: ''
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
            rules: {
                customer: [
                    {required: true, message: '请输入客户公司名称'}
                ],
            }
        }
    },
    methods: {
        //新增客户提交表单
        submitForAdd() {
            this.$refs.addForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/customers`, this.addForm).then(({data}) => {
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
        //编辑客户提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/customers`, this.editForm).then(({data}) => {
                        console.log(data)
                        if (!data.code) {
                            this.handleCloseForEdit()
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
        //查询按钮点击事件
        searchSubmit() {
            this.getPage()
        },
        //录入按钮点击事件
        handleAdd() {
            this.addDialogVisible = true
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
            this.$message.info("当前操作取消")
        },
        //编辑弹窗关闭
        handleCloseForEdit() {
            this.editDialogVisible = false
            this.$message.info("当前操作取消")
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/customers/${row.id}`).then(({data}) => {
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
            http.get(`/customers/${this.pageData.currentPage}/${this.pageData.pageSize}
            /?customer=${this.pageData.customer}&address=${this.pageData.address}`).then(({data}) => {
                    if (!data.code) {
                        this.tableData = data.data.records
                        this.pageData.total = data.data.total
                    } else {
                        this.$message.error(`获取页面信息失败!${data.message}`)
                    }
                }
            )
        },
        //页码栏点击事件
        handlePage(currentPage) {
            this.pageData.currentPage = currentPage
            this.getPage()
        }
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

        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }

        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }

    }
}
</style>