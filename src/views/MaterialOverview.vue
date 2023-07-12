<template>

    <div class="manage">
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
                <el-form-item label="生产日期" prop="producedDate">
                    <el-date-picker
                        disabled
                        v-model="editForm.updateDate"
                        align="right"
                        type="date"
                        placeholder="生产日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        disabled
                        placeholder="例: 5.3"
                        :precision="1"
                        v-model.number="editForm.number"
                        size="small">
                    </el-input-number>
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
                <el-form-item label="单价">
                    <el-input-number
                        placeholder="例:100.00"
                        :precision="2"
                        v-model.number="editForm.price"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="估值">
                    <el-input-number
                        placeholder="例:2000.00"
                        :precision="2"
                        v-model.number="editForm.value"
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

        <div class="manage-header">
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
                    width="80"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type=""
                            @click="handleEdit(scope.$index, scope.row)">编辑
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
            editDialogVisible: false,
            tableData: [],
            tooltipContent4Price:"默认为最新成交价，可自行修改，相关交易发生后自动修改为最新成交价",
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
            tagLabels: {
                1: {type: '', label: '正常'},
                2: {type: 'warning', label: '偏少'},
                3: {type: 'danger', label: '及时补货'},
            },
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                id: '',
                category: '',
            },
            editForm: {
                id: '',
                category: '',
                number: '',
                updateDate: '',
                price: '',
                value: '',
                numberTag: '',
                note: '',
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
                price: [
                    {required: true, message: '请输入供货商名'}
                ],
                totalAmount: [
                    {required: true, message: '请输入供货商名'}
                ],
            },
        }
    },
    methods: {
        //编辑客户提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/materials/overviews`, this.editForm).then(({data}) => {
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
        //编辑按钮点击事件
        handleEdit(index, row) {
            this.editDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editForm = JSON.parse(JSON.stringify(row))
        },
        //编辑弹窗关闭
        handleCloseForEdit() {
            this.$refs.editForm.resetFields()
            this.editDialogVisible = false
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