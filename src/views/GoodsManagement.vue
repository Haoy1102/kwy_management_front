<template>
    <div class="manage">

        <el-dialog
            title="库存录入"
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="handleCloseForAdd">
            <!--  录入时用户的表单信息-->
            <el-form
                ref="addForm"
                :model="addForm"
                :rules="rules"
                label-width="auto">
                <p style="margin-bottom: 10px;">（数据录入后，请使用采购模块进行货品入库）</p>
                <el-form-item label="品类" prop="categoryId">
                    <el-select v-model="addForm.categoryId" filterable placeholder="请选择货品"
                               @visible-change="selectMaterialClick"
                               @change="(categoryId) => selectMaterialChange(categoryId)">
                        <el-option
                            v-for="item in options4Materials"
                            :key="item.id"
                            :label="item.category"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        placeholder="例：10.7"
                        :precision="0"
                        v-model.number="addForm.number"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="仓储" prop="location">
                    <el-input placeholder="请输入仓储位置"
                              v-model="addForm.location">
                    </el-input>
                </el-form-item>
                <el-form-item label="生产日期" prop="producedDate">
                    <el-date-picker
                        v-model="addForm.producedDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" prop="status">
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
            title="编辑货品"
            :visible.sync="editGoodsDialogVisible"
            width="30%"
            :before-close="handleCloseForEditGoods">
            <el-form
                ref="editGoodsForm"
                :model="editGoodsForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="货号" prop="goodsId">
                    <el-input disabled  v-model="editGoodsForm.goodsId"></el-input>
                </el-form-item>
                <el-form-item label="货品" >
                    <el-select disabled v-model="editGoodsForm.materialInfo" >
                    </el-select>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        placeholder="例：10.7"
                        :precision="1"
                        v-model.number="editGoodsForm.number"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="仓储" prop="location">
                    <el-input placeholder="请输入仓储位置" v-model="editGoodsForm.location"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" prop="producedDate">
                    <el-date-picker
                        v-model="editGoodsForm.producedDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="editGoodsForm.status" filterable placeholder="">
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
                        v-model="editGoodsForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForEditGoods">取 消</el-button>
                <el-button type="primary" @click="submitForEditGoods">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="出库"
            :visible.sync="outDialogVisible"
            width="30%"
            :before-close="handleCloseForOut">
            <!--  出库的表单信息-->
            <el-form
                ref="outForm"
                :model="outForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="品类" prop="category">
                    <el-input disabled v-model="outForm.category"></el-input>
                </el-form-item>
                <el-form-item label="货源" >
                    <el-input disabled v-model="outForm.supplier"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="operateNumber">
                    <el-input-number
                        placeholder="例: 5.3"
                        :precision="1"
                        v-model.number="outForm.operateNumber"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="操作备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请说明出库去向"
                        v-model="outForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForOut">取 消</el-button>
                <el-button type="primary" @click="submitForOut">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 库存录入
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入货号" v-model="pageData.goodsId"></el-input>
                </el-form-item>
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
                            <el-form-item label="库存记录-(至多显示十条，详细内容请至库存记录模块查询)">
                                <el-table
                                    :data="expandedRows[props.row.id]"
                                    style="width: 100%">
                                    <el-table-column
                                        width="100"
                                        prop="id"
                                        label="ID">
                                    </el-table-column>
                                    <el-table-column
                                        label="操作类型">
                                        <template slot-scope="props">
                                            <el-tag :type="operateTypeLabels[props.row.operateType].type">
                                                {{ operateTypeLabels[props.row.operateType].label }}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="originNumber"
                                        label="原量">
                                    </el-table-column>
                                    <el-table-column
                                        prop="operateNumber"
                                        label="操作数量">
                                    </el-table-column>
                                    <el-table-column
                                        prop="remainNumber"
                                        label="余量">
                                    </el-table-column>
                                    <el-table-column
                                        label="状态">
                                        <template slot-scope="props">
                                            <el-tag :type="statusLabels[props.row.status].type">
                                                {{ statusLabels[props.row.status].label }}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="createUser"
                                        label="操作人">
                                    </el-table-column>
                                    <el-table-column
                                        width="180"
                                        prop="updateTime"
                                        label="操作时间">
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
                    prop="goodsId"
                    label="货号">
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
                    prop="number"
                    label="余量">
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
                    prop="note"
                    label="备注">
                </el-table-column>
                <el-table-column
                    width="210"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleOut(scope.$index, scope.row)">出库
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit4Goods(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete4Goods(scope.$index, scope.row)">删除
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
    name: "GoodsManagement",
    data() {
        return {
            addDialogVisible: false,
            editGoodsDialogVisible: false,
            outDialogVisible: false,
            // tooltipContent4Number:"只显示余量不为0的数据",
            expandedRows: {},
            tableData: [],
            options4Materials: [],
            tableData4Record: [{}, {}, {}, {}, {}, {}, {}, {}],
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
            operateTypeLabels: {
                1: {type: 'success', label: '采购'},
                2: {type: 'primary', label: '出库'},
                3: {type: 'info', label: '手工录入'},
                4: {type: 'info', label: '手动调整'},
                5: {type: 'danger', label: '删除'},
            },
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                category: '',
                supplier: '',
                goodsId: ''
            },
            addForm: {
                id: '',
                categoryId: '',
                category: '',
                number: '',
                location: '',
                producedDate: '',
                status: 1,
                note: '',
            },
            editGoodsForm: {
                id: '',
                goodsId: '',
                categoryId: '',
                category: '',
                materialInfo:"",
                materialInfoId: '',
                supplier: '',
                number: '',
                location: '',
                producedDate: '',
                status: 1,
                note: '',
            },
            outForm: {
                goodsId: '',
                categoryId:'',
                category:'',
                materialInfoId:'',
                supplier:'',
                operateNumber: '',
                note: '',
            },
            rules: {
                goodsId: [
                    {required: true, message: '请输入货号'}
                ],
                categoryId:[
                    {required: true, message: '请选择品类'}
                ],
                materialInfo:[
                    {required: true, message: '请选择货品'}
                ],
                category: [
                    {required: true, message: '请输入品类名'}
                ],
                supplier: [
                    {required: true, message: '请输入供货商名'}
                ],
                number: [
                    {required: true, message: '请输入数量'}
                ],
                operateNumber: [
                    {required: true, message: '请输入操作数量'}
                ],
                price: [
                    {required: true, message: '请输入价格'}
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
        //新增货品提交表单
        submitForAdd() {
            this.$refs.addForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/goods`, this.addForm).then(({data}) => {
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
        //编辑货品提交表单
        submitForEditGoods() {
            this.$refs.editGoodsForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/goods`, this.editGoodsForm).then(({data}) => {
                        console.log(data)
                        if (!data.code) {
                            this.handleCloseForEditGoods()
                            this.$message.success(data.message)
                        } else {
                            this.handleCloseForEditGoods()
                            this.$message.error(data.message)
                        }
                    }).finally(() => {
                        //重新加载数据
                        this.getPage();
                    })
                }
            })
        },
        //出库提交表单
        submitForOut() {
            this.$refs.outForm.validate((isValid) => {
                if (isValid) {
                    http.post(`/goods/out`, this.outForm).then(({data}) => {
                        console.log(data)
                        if (!data.code) {
                            this.handleCloseForOut()
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
        handleEdit4Goods(index, row) {
            this.editGoodsDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editGoodsForm = JSON.parse(JSON.stringify(row))
            this.$set(this.editGoodsForm, 'materialInfo', row.category+"-"+row.supplier)
        },
        //出库按钮点击事件
        handleOut(index, row){
            this.outDialogVisible = true
            this.$set(this.outForm,"goodsId",row.goodsId)
            this.$set(this.outForm,"categoryId",row.categoryId)
            this.$set(this.outForm,"category",row.category)
            this.$set(this.outForm,"materialInfoId",row.materialInfoId)
            this.$set(this.outForm,"supplier",row.supplier)
        },
        //录入弹窗关闭
        handleCloseForAdd() {
            this.$refs.addForm.resetFields()
            this.addDialogVisible = false
        },
        //编辑弹窗关闭
        handleCloseForEditGoods() {
            this.$refs.editGoodsForm.resetFields()
            this.editGoodsDialogVisible = false
        },
        //采购弹窗关闭
        handleCloseForOut() {
            this.$refs.outForm.resetFields()
            this.outDialogVisible = false
        },
        //删除货品按钮点击事件
        handleDelete4Goods(index, row) {
            this.$confirm('此操作将删除该条目, 并记录您的行为，您可以在删除后为该操作添加记录说明，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/goods/${row.id}`).then(({data}) => {
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
            http.get(`/goods/${this.pageData.currentPage}/${this.pageData.pageSize}/?category=${this.pageData.category}&supplier=${this.pageData.supplier}&goodsId=${this.pageData.goodsId}`)
                .then(({data}) => {
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
        },
        //处理行展开事件
        handleExpandChange(row) {
            http.get(`/goods/records/${row.goodsId}`).then(({data}) => {
                if (!data.code) {
                    // data.data.records.forEach(record => {
                    //     if (record.price !== null) {
                    //         record.price = record.price.toFixed(2)
                    //     }
                    //     if (record.latestPrice !== null) {
                    //         record.totalAmount = record.totalAmount.toFixed(2)
                    //     }
                    // })
                    // this.tableData4Record = data.data.records
                    this.$set(this.expandedRows, row.id, data.data.records)
                }
            })
        },
        //弹出客户选择选项
        selectMaterialClick() {
            http.get("/materials/overviews").then(({data}) => {
                if (!data.code) {
                    this.options4Materials = data.data
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //选择客户后自动填充
        selectMaterialChange(categoryId) {
            let materialData = {}
            materialData = this.options4Materials.find(item => item.id === categoryId)
            this.$set(this.addForm,'categoryId',materialData.id)
            this.$set(this.addForm,'category',materialData.category)
        },
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

        .column-header {
            display: flex;
            align-items: center;
        }

        .header-tooltip {
            margin-left: 5px;
        }
    }

}

</style>