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
                <el-form-item label="产品名称" prop="productName">
                    <el-input placeholder="请输入产品名称" v-model="addForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品编号" prop="productCode">
                    <el-input placeholder="请输入产品编号" v-model="addForm.productCode"></el-input>
                </el-form-item>
                <el-form-item label="默认单价" prop="priceDefault">
                    <el-input-number
                        placeholder="请输入默认单价"
                        :precision="2"
                        v-model.number="addForm.priceDefault"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input placeholder="请输入单位" v-model="addForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="数量状态" prop="status">
                    <el-select v-model="addForm.numberTag" filterable placeholder="">
                        <el-option
                            v-for="item in options4NumberTag"
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
                <el-form-item label="产品名称" prop="productName">
                    <el-input :disabled="true" placeholder="请输入产品名称" v-model="editForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品编号" prop="productCode">
                    <el-input placeholder="请输入产品编号" v-model="editForm.productCode"></el-input>
                </el-form-item>
                <el-form-item label="最近生产" prop="producedDateLast">
                    <el-date-picker
                        v-model="editForm.producedDateLast"
                        align="right"
                        type="date"
                        placeholder="最近生产"
                        :disabled="true"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="默认单价" prop="priceDefault">
                    <el-input-number
                        placeholder="请输入默认单价"
                        :precision="2"
                        v-model.number="editForm.priceDefault"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="数量/件" prop="numberPerBox">
                    <el-input-number
                        placeholder="请输入每件(箱)货品的数量"
                        :precision="0"
                        v-model.number="editForm.numberPerBox"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <p>{{ editForm.number }}</p>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input placeholder="请输入产品单位" v-model="editForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="估值" prop="value">
                    <el-input-number
                        placeholder="请输入估值"
                        :precision="2"
                        v-model.number="editForm.value"
                        width="100%">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="数量状态" prop="numberTag">
                    <el-select v-model="editForm.numberTag" filterable placeholder="">
                        <el-option
                            v-for="item in options4NumberTag"
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
            title="生产"
            :visible.sync="produceDialogVisible"
            width="30%"
            :before-close="handleCloseForProduce">
            <!--  采购的表单信息-->
            <el-form
                ref="produceForm"
                :model="produceForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="产品名称" prop="productName">
                    <el-input :disabled="true" placeholder="" v-model="produceForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品编号" prop="productCode">
                    <el-input :disabled="true" placeholder="" v-model="produceForm.productCode"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        placeholder="例: 500"
                        :precision="1"
                        v-model.number="produceForm.number"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="仓储" prop="location">
                    <el-input placeholder="请输入仓储位置" v-model="produceForm.location"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" prop="producedDate">
                    <el-date-picker
                        v-model="produceForm.producedDate"
                        align="right"
                        type="date"
                        placeholder="生产日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="produceForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForProduce">取 消</el-button>
                <el-button type="primary" @click="submitForProduce">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 添加
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入产品名称" v-model="pageData.productName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入产品编号" v-model="pageData.productCode"></el-input>
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
                            <el-form-item label="产品详情-(至多显示十条，详细内容请至产品管理模块查询)">
                                <el-table
                                    :data="expandedRows[props.row.id]"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        prop="batchId"
                                        label="批次号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="productName"
                                        label="产品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="productCode"
                                        label="产品编号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="number"
                                        label="数量">
                                    </el-table-column>
                                    <el-table-column
                                        prop="unit"
                                        label="单位">
                                    </el-table-column>
                                    <el-table-column
                                        prop="location"
                                        label="仓储">
                                    </el-table-column>
                                    <el-table-column
                                        prop="producedDate"
                                        label="生产日期">
                                    </el-table-column>
                                    <el-table-column
                                        prop="status"
                                        label="状态">
                                        <template slot-scope="props">
                                            <el-tag :type="statusLabels[props.row.status].type">
                                                {{ statusLabels[props.row.status].label }}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="note"
                                        label="备注">
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="产品名称"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="productCode"
                    label="产品编号">
                </el-table-column>
                <el-table-column
                    prop="producedDateLast"
                    label="最近生产"
                    width="110px">
                </el-table-column>
                <el-table-column
                    prop="numberPerBox"
                    label="数量/件">
                    <template slot="header" slot-scope="scope">
                        <div class="column-header">
                            <span>{{ scope.column.label }}</span>
                            <el-tooltip class="header-tooltip"
                                        effect="dark"
                                        :content="tooltipContent4NumberPerBox"
                                        placement="top">
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    width="50px">
                </el-table-column>
                <el-table-column
                    prop="priceDefault"
                    label="默认单价">
                    <template slot-scope="props">
                        ¥ {{ props.row.priceDefault }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="估值">
                    <template slot-scope="props">
                        ¥ {{ props.row.value }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="numberTag"
                    label="数量状态">
                    <template slot-scope="props">
                        <el-tag :type="tagLabels[props.row.numberTag].type">
                            {{ tagLabels[props.row.numberTag].label }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="note"
                    label="备注">
                </el-table-column>
                <el-table-column
                    width="210"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleProduce(scope.$index, scope.row)">生产
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
            produceDialogVisible: false,
            tableData: [],
            tableData4Purchase: [{}, {}, {}, {}, {}, {}, {}, {}],
            expandedRows: {},
            tooltipContent4NumberPerBox: "指每一件(箱)货品的容量，建议填写，方便订单出货计算",
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
            options4NumberTag: [
                {
                    label: "正常",
                    value: 1
                }, {
                    label: "建议备货",
                    value: 2
                }, {
                    label: "优先生产",
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
                productName: '',
                productCode: ''
            },
            addForm: {
                id: '',
                productName: '',
                productCode: '',
                producedDateLast: '',
                priceDefault: 0,
                unit: 'kg',
                numberPerBox: 0,
                number: 0,
                value: 0.00,
                numberTag: 1,
                note: '',
            },
            editForm: {
                id: '',
                productName: '',
                productCode: '',
                producedDateLast: '',
                priceDefault: 0,
                unit: 'kg',
                numberPerBox: 0,
                number: 0,
                value: 0.00,
                numberTag: 1,
                note: '',
            },
            produceForm: {
                productId: '',
                productName: '',
                productCode: '',
                unit: '',
                number: 0.00,
                location: '',
                producedDate: '',
                note:""
            },
            tagLabels: {
                1: {type: '', label: '正常'},
                2: {type: 'warning', label: '建议备货'},
                3: {type: 'danger', label: '优先生产'},
            },
            rules: {
                productName: [
                    {required: true, message: '请输入产品名称'}
                ],
                productCode: [
                    {required: true, message: '请输入产品编号'}
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
        //新增提交表单
        submitForAdd() {
            this.$refs.addForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/products/overviews`, this.addForm).then(({data}) => {
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
        //编辑提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/products/overviews`, this.editForm).then(({data}) => {
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
        //生产提交表单
        submitForProduce() {
            this.$refs.produceForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/products/overviews/produce`, this.produceForm).then(({data}) => {
                        console.log(data)
                        if (!data.code) {
                            this.handleCloseForProduce()
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
        handleProduce(index, row) {
            this.produceDialogVisible = true
            this.$set(this.produceForm, 'productId', row.id)
            this.$set(this.produceForm, 'productName', row.productName)
            this.$set(this.produceForm, 'productCode', row.productCode)
            this.$set(this.produceForm, 'unit', row.unit)
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
        handleCloseForProduce() {
            this.$refs.produceForm.resetFields()
            this.produceDialogVisible = false
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('产品数量为0才可执行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/products/overviews/${row.id}`).then(({data}) => {
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
            http.get(`/products/overviews/${this.pageData.currentPage}/${this.pageData.pageSize}/?productName=${this.pageData.productName}&productCode=${this.pageData.productCode}`)
                .then(({data}) => {
                        if (!data.code) {
                            data.data.records.forEach(record => {
                                if (record.priceDefault !== null) {
                                    record.priceDefault = record.priceDefault.toFixed(2)
                                }
                                if (record.value !== null) {
                                    record.value = record.value.toFixed(2)
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
            http.get(`/products/1/10/?productId=${row.id}`).then(({data}) => {
                if (!data.code) {
                    this.$set(this.expandedRows, row.id, data.data.records)
                }
            })
        }
    },
    computed: {
        item4Purchase() {
            return this.produceForm.category + "-" + this.produceForm.supplier
        }
    },
    watch: {
        'editForm.priceDefault': function (newPrice) {
            if (newPrice !== 0 && newPrice !== '' && newPrice !== null && newPrice !== undefined) {
                if (this.editForm.number !== 0 && this.editForm.number !== '' && this.editForm.number !== null && this.editForm.number !== undefined)
                    this.$set(this.editForm, 'value', this.editForm.number * newPrice)
            }
        },
        'editForm.value': function (newValue) {
            if (newValue !== 0 && newValue !== '' && newValue !== null && newValue !== undefined) {
                if (this.editForm.number !== 0 && this.editForm.number !== '' && this.editForm.number !== null && this.editForm.number !== undefined)
                    this.$set(this.editForm, 'priceDefault', newValue / this.editForm.number)
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