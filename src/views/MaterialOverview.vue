<template>

    <div class="manage">
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
                <el-form-item label="品类" prop="category">
                    <el-input placeholder="请输入品类名称" v-model="addForm.category"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input-number
                        placeholder="例:100.00"
                        :precision="2"
                        v-model.number="addForm.price">
                    </el-input-number>
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
            <!--  采购的表单信息-->
            <el-form
                ref="editForm"
                :model="editForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="品类" prop="category">
                    <el-input disabled v-model="editForm.category"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input-number
                        disabled
                        placeholder="例: 5.3"
                        :precision="0"
                        v-model.number="editForm.number">
                    </el-input-number>
<!--                    <span>{{this.editForm.number}}</span>-->
                </el-form-item>
                <el-form-item label="状态" prop="tag">
                    <el-select v-model="editForm.numberTag" filterable placeholder="">
                        <el-option
                            v-for="item in options4Tag"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input-number
                        placeholder="例:100.00"
                        :precision="2"
                        v-model.number="editForm.price">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="估值">
                    <el-input-number
                        placeholder="例:2000.00"
                        :precision="2"
                        v-model.number="editForm.value">
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
                + 新增品类
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入品类名" v-model="pageData.category"></el-input>
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
                            <el-form-item label="库存详情-(至多显示十条，详细内容请至库存管理模块查询)">
                                <el-table
                                    :data="expandedRows[props.row.id]"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        prop="id"
                                        label="货号ID">
                                    </el-table-column>
                                    <el-table-column
                                        prop="supplier"
                                        label="货源">
                                    </el-table-column>
                                    <el-table-column
                                        prop="number"
                                        label="数量">
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
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="品类">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="总量">
                </el-table-column>
                <el-table-column
                    prop="updateDate"
                    label="最近入库">
                </el-table-column>

                <el-table-column
                    prop="price"
                    label="单价">
                    <template slot-scope="props">
                        ¥ {{ props.row.price }}
                    </template>
                    <template slot="header" slot-scope="scope">
                        <div class="column-header">
                            <span>{{ scope.column.label }}</span>
                            <el-tooltip class="header-tooltip"
                                        effect="dark"
                                        :content="tooltipContent4Price"
                                        placement="top">
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </div>
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
                    width="150"
                    label="操作">
                    <template slot-scope="scope">
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
    name: "MaterialOverview",
    data() {
        return {
            addDialogVisible: false,
            editDialogVisible: false,
            editGoodsDialogVisible: false,
            outDialogVisible: false,
            tableData: [],
            expandedRows: {},
            curRow: {},
            tooltipContent4Price: "默认为最新成交价，可自行修改，相关交易发生后自动修改为最新成交价",
            options4Tag: [
                {
                    label: "正常",
                    value: 1

                }, {
                    label: "偏少",
                    value: 2
                },
                {
                    label: "及时补货",
                    value: 3
                }
            ],
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
            tagLabels: {
                1: {type: '', label: '正常'},
                2: {type: 'warning', label: '偏少'},
                3: {type: 'danger', label: '及时补货'},
            },
            statusLabels: {
                1: {type: 'success', label: '新鲜'},
                2: {type: 'warning', label: '临期'},
                3: {type: 'danger', label: '尽快使用'},
            },
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                id: '',
                category: '',
            },
            addForm: {
                id: '',
                category: '',
                number: 0,
                updateDate: '',
                price: 0,
                value: 0,
                numberTag: '',
                note: '',
            },
            editForm: {
                id: '',
                category: '',
                number: 0,
                updateDate: '',
                price: 0,
                value: 0,
                numberTag: '',
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
                category: [
                    {required: true, message: '请输入品类名'}
                ],
                supplier: [
                    {required: true, message: '请输入供货商名'}
                ],
                number: [
                    {required: true, message: '请输入数量'}
                ],
                totalAmount: [
                    {required: true, message: '请输入总金额'}
                ],
                operateNumber: [
                    {required: true, message: '请输入操作数量'}
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
                    http.post(`/materials/overviews`, this.addForm).then(({data}) => {
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
        //编辑总览材料提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/materials/overviews`, this.editForm).then(({data}) => {
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
                        this.getGoods(this.curRow)
                        // //重新加载数据
                        // this.getPage();
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
                        this.getGoods(this.curRow)
                        //重新加载数据
                        // this.getPage();
                    })
                }
            })
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('库存数量为0才可执行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/materials/overviews/${row.id}`).then(({data}) => {
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
        //查询按钮点击事件
        searchSubmit() {
            this.getPage()
        },
        //新增按钮点击事件
        handleAdd() {
            this.addDialogVisible = true
        },
        //编辑按钮点击事件
        handleEdit(index, row) {
            console.log(row, "row")
            this.editDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editForm = JSON.parse(JSON.stringify(row))
            console.log(this.editForm, 'this.editForm')
        },
        //编辑货品按钮点击事件
        handleEdit4Goods(index, row) {
            this.editGoodsDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editGoodsForm = JSON.parse(JSON.stringify(row))
            this.$set(this.editGoodsForm, 'materialInfo', row.category + "-" + row.supplier)
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
        handleCloseForEdit() {
            this.$refs.editForm.resetFields()
            this.editDialogVisible = false
        },
        //编辑货品弹窗关闭
        handleCloseForEditGoods() {
            this.$refs.editGoodsForm.resetFields()
            this.editGoodsDialogVisible = false
        },
        //出库弹窗关闭
        handleCloseForOut() {
            this.$refs.outForm.resetFields()
            this.outDialogVisible = false
        },
        //处理行展开事件
        handleExpandChange(row) {
            this.curRow = row;
            this.getGoods(row)
        },
        //获取货品数据
        getGoods(row) {
            http.get(`/goods/1/10/?category=${row.category}`)
                .then(({data}) => {
                        if (!data.code) {
                            this.$set(this.expandedRows, row.id, data.data.records)
                        } else {
                            this.$message.error(`获取页面信息失败!${data.message}`)
                        }
                    }
                )
        },
        //获取页面
        getPage() {
            http.get(`/materials/overviews/${this.pageData.currentPage}/${this.pageData.pageSize}/?category=${this.pageData.category}`).then(({data}) => {
                    if (!data.code) {
                        data.data.records.forEach(record => {
                            if (record.price !== null) {
                                record.price = record.price.toFixed(2)
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
    },
    watch: {
        'editForm.price': function (newPrice) {
            if (newPrice !== 0 && newPrice !== '' && newPrice !== null && newPrice !== undefined) {
                if (this.editForm.number !== 0 && this.editForm.number !== '' && this.editForm.number !== null && this.editForm.number !== undefined)
                    this.$set(this.editForm, 'value', this.editForm.number * newPrice)
            }
        },
        'editForm.value': function (newValue) {
            if (newValue !== 0 && newValue !== '' && newValue !== null && newValue !== undefined) {
                if (this.editForm.number !== 0 && this.editForm.number !== '' && this.editForm.number !== null && this.editForm.number !== undefined)
                    this.$set(this.editForm, 'price', newValue / this.editForm.number)
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