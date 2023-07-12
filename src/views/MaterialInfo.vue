<template>
    <div class="manage">

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
                <el-form-item label="品类" prop="category">
                    <el-input placeholder="请输入品类名" v-model="addForm.category"></el-input>
                </el-form-item>
                <el-form-item label="货源" prop="supplier">
                    <el-input placeholder="请输入供货商名" v-model="addForm.supplier"></el-input>
                </el-form-item>
                <el-form-item label="默认单价" prop="defaultPrice">
                    <el-input-number
                        placeholder="请输入默认单价"
                        :precision="2"
                        v-model.number="addForm.defaultPrice"
                        size="small">
                    </el-input-number>
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
                <el-form-item label="品类" prop="category">
                    <el-input :disabled="true" placeholder="请输入品类名" v-model="editForm.category"></el-input>
                </el-form-item>
                <el-form-item label="货源" prop="supplier">
                    <el-input :disabled="true" placeholder="请输入供货商名" v-model="editForm.supplier"></el-input>
                </el-form-item>
                <el-form-item label="默认单价" prop="defaultPrice">
                    <el-input-number
                        placeholder="请输入默认单价"
                        :precision="2"
                        v-model.number="editForm.defaultPrice"
                        size="small">
                    </el-input-number>
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
            title="采购"
            :visible.sync="purchaseDialogVisible"
            width="30%"
            :before-close="handleCloseForPurchase">
            <!--  采购的表单信息-->
            <el-form
                ref="purchaseForm"
                :model="purchaseForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="采购项" prop="item4Purchase">
                    <el-input :disabled="true" placeholder="" v-model="item4Purchase"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        placeholder="例: 5.3"
                        :precision="1"
                        v-model.number="purchaseForm.number"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input-number
                        placeholder="例:100.00"
                        :precision="2"
                        v-model.number="purchaseForm.price"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="总金额" prop="totalAmount">
                    <el-input-number
                        placeholder="例:2000.00"
                        :precision="2"
                        v-model.number="purchaseForm.totalAmount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="仓储" prop="location">
                    <el-input placeholder="请输入仓储位置" v-model="purchaseForm.location"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" prop="producedDate">
                    <el-date-picker
                        v-model="purchaseForm.producedDate"
                        align="right"
                        type="date"
                        placeholder="生产日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="purchaseForm.status" filterable placeholder="">
                        <el-option
                            v-for="item in options4Status"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="purchaseForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForPurchase">取 消</el-button>
                <el-button type="primary" @click="submitForPurchase">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 添加
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入品类名" v-model="pageData.category"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入货源" v-model="pageData.supplier"></el-input>
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
                @expand-change="handleExpandChange"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="备注">
                                <span>{{ props.row.note }}</span>
                            </el-form-item>
                            <el-form-item label="采购记录-(只显示最多十条，详细内容请至采购模块查询)">
                                <el-table
                                    :data="expandedRows[props.row.id]"
                                    style="width: 100%"
                                    >
                                    <el-table-column
                                        prop="id"
                                        label="货号ID">
                                    </el-table-column>
                                    <el-table-column
                                        prop="number"
                                        label="数量">
                                    </el-table-column>
                                    <el-table-column
                                        prop="price"
                                        label="单价">
                                        <template slot-scope="props">
                                            ¥ {{ props.row.price }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="totalAmount"
                                        label="总价">
                                        <template slot-scope="props">
                                            ¥ {{ props.row.totalAmount }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="状态">
                                        <template slot-scope="props">
                                            <el-tag :type="statusLabels[props.row.status].type">
                                                {{ statusLabels[props.row.status].label }}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="品类">
                </el-table-column>
                <el-table-column
                    prop="supplier"
                    label="货源">
                </el-table-column>
                <el-table-column
                    prop="defaultPrice"
                    label="默认单价">
                    <template slot-scope="props">
                        ¥ {{ props.row.defaultPrice }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="latestPrice"
                    label="最新采购价">
                    <template slot-scope="props">
                        ¥ {{ props.row.latestPrice }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="210"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handlePurchase(scope.$index, scope.row)">采购
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
    name: "MaterialInfo",
    data() {
        return {
            addDialogVisible: false,
            editDialogVisible: false,
            purchaseDialogVisible: false,
            tableData: [],
            tableData4Purchase: [{}, {}, {}, {}, {}, {}, {}, {}],
            expandedRows: {},
            options4Status: [
                {
                    label: "新鲜",
                    value: 1

                }, {
                    label: "临期",
                    value: 2
                }, {
                    label: "尽快使用",
                    value: 3
                }
            ],
            statusLabels: {
                1: {type: 'success', label: '新鲜'},
                2: {type: 'warning', label: '临期'},
                3: {type: 'danger', label: '尽快使用'},
            },
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                category: '',
                supplier: ''
            },
            editForm: {
                id: '',
                category: '',
                supplier: '',
                defaultPrice: '',
                note: '',
            },
            addForm: {
                id: '',
                category: '',
                supplier: '',
                defaultPrice: '',
                note: '',
            },
            purchaseForm: {
                materialInfoId: '',
                category: '',
                supplier: '',
                number: 0.00,
                price: 0.00,
                totalAmount: 0.00,
                location: '',
                producedDate: '',
                status: 1,
                createDate: ''
            },
            rules: {
                category: [
                    {required: true, message: '请输入品类名'}
                ],
                supplier: [
                    {required: true, message: '请输入供货商名'}
                ],
                number: [
                    {required: true, message: '请输入供货商名'}
                ],
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
            }
        }
    },
    methods: {
        //新增客户提交表单
        submitForAdd() {
            this.$refs.addForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/materials`, this.addForm).then(({data}) => {
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
                    http.put(`/materials`, this.editForm).then(({data}) => {
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
        //采购提交数据
        submitForPurchase() {
            this.$refs.purchaseForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/purchase`, this.purchaseForm).then(({data}) => {
                        console.log(data)
                        if (!data.code) {
                            this.handleCloseForPurchase()
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
        //采购按钮点击事件
        handlePurchase(index, row) {
            this.purchaseDialogVisible = true
            this.$set(this.purchaseForm, 'materialInfoId', row.id)
            this.$set(this.purchaseForm, 'category', row.category)
            this.$set(this.purchaseForm, 'supplier', row.supplier)
            this.$set(this.purchaseForm, 'price', row.defaultPrice)
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
        //编辑弹窗关闭
        handleCloseForEdit() {
            this.$refs.editForm.resetFields()
            this.editDialogVisible = false
        },
        //采购弹窗关闭
        handleCloseForPurchase() {
            this.$refs.purchaseForm.resetFields()
            this.purchaseDialogVisible = false
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/materials/${row.id}`).then(({data}) => {
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
            http.get(`/materials/${this.pageData.currentPage}/${this.pageData.pageSize}/?category=${this.pageData.category}&supplier=${this.pageData.supplier}`)
                .then(({data}) => {
                    if (!data.code) {
                        data.data.records.forEach(record => {
                            if (record.defaultPrice !== null) {
                                record.defaultPrice = record.defaultPrice.toFixed(2)
                            }
                            if (record.latestPrice !== null) {
                                record.latestPrice = record.latestPrice.toFixed(2)
                            }
                        })
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
        },
        //处理行展开事件
        handleExpandChange(row) {
            let materialInfoId = row.id
            http.get(`/purchase/${materialInfoId}`).then(({data}) => {
                if (!data.code) {
                    data.data.records.forEach(record => {
                        if (record.price !== null) {
                            record.price = record.price.toFixed(2)
                        }
                        if (record.totalAmount !== null) {
                            record.totalAmount = record.totalAmount.toFixed(2)
                        }
                    })
                    this.$set(this.expandedRows, materialInfoId, data.data.records)
                }
            })
        }
    },
    computed: {
        item4Purchase() {
            return this.purchaseForm.category + "-" + this.purchaseForm.supplier
        }
    },
    watch: {
        'purchaseForm.number': function (newNumber) {
            if (newNumber !== 0 && newNumber !== '' && newNumber !== null && newNumber !== undefined) {
                this.$set(this.purchaseForm, 'totalAmount', newNumber * this.purchaseForm.price)
            }
        },
        'purchaseForm.price': function (newPrice) {
            if (newPrice !== 0 && newPrice !== '' && newPrice !== null && newPrice !== undefined) {
                if (this.purchaseForm.number !== 0 && this.purchaseForm.number !== '' && this.purchaseForm.number !== null && this.purchaseForm.number !== undefined)
                    this.$set(this.purchaseForm, 'totalAmount', this.purchaseForm.number * newPrice)
            }
        },
        'purchaseForm.totalAmount': function (newTotalAmount) {
            if (newTotalAmount !== 0 && newTotalAmount !== '' && newTotalAmount !== null && newTotalAmount !== undefined) {
                this.$set(this.purchaseForm, 'price', newTotalAmount / this.purchaseForm.number)
            }
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
}

</style>