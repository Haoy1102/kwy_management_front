<template>
    <div class="manage">
        <el-dialog
            title="采购"
            :visible.sync="editDialogVisible"
            width="30%"
            :before-close="handleCloseForEdit">
            <!--  采购的表单信息-->
            <el-form
                ref="editForm"
                :model="editForm"
                :rules="rules"
                label-width="auto">
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
                    <el-input placeholder="请输入操作ID" v-model="pageData.id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入货号" v-model="pageData.pageData"></el-input>
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
            >
                <el-table-column
                    width="100"
                    prop="id"
                    label="操作记录ID">
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
                    label="供货商">
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
                    prop="operateNumber"
                    label="操作数量">
                </el-table-column>
                <el-table-column
                    prop="remainNumber"
                    label="本批余量">
                </el-table-column>
                <el-table-column
                    width="180"
                    prop="updateTime"
                    label="操作时间">
                </el-table-column>
                <el-table-column
                    prop="location"
                    label="仓储">
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
    name: "GoodsRecord",
    data() {
        return {
            editDialogVisible: false,
            tableData: [],
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
                goodsId: '',
                category: '',
                supplier: ''
            },
            editForm: {
                id: '',
                note: '',
            },
            operateTypeLabels: {
                1: {type: 'success', label: '入库'},
                2: {type: 'primary', label: '出库'},
                3: {type: 'info', label: '手工录入'},
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
                    http.put(`/purchase`, this.editForm).then(({data}) => {
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
            http.get(`/goods/records/${this.pageData.currentPage}/${this.pageData.pageSize}/?id=${this.pageData.id}&goodsId=${this.pageData.goodsId}&category=${this.pageData.category}&supplier=${this.pageData.supplier}`).then(({data}) => {
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
    }

}

</style>