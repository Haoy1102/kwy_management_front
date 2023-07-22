<template>
    <div class="manage">

        <el-dialog
            title="采购信息"
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

        <el-dialog
            title="导出采购单"
            :visible.sync="orderDataDialogVisible"
            width="30%"
            :before-close="handleCloseForOrderData">
            <el-form
                ref="purchaseDataForm"
                :model="purchaseDataForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="起始日期" prop="startDate">
                    <el-date-picker
                        v-model="purchaseDataForm.startDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="截止日期" prop="endDate">
                    <el-date-picker
                        v-model="purchaseDataForm.endDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForOrderData">取 消</el-button>
                <el-button type="primary" @click="submitForOrderData">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handlePrint" type="success">
                导出记录
            </el-button>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入操作ID" v-model="pageData.id"></el-input>
                </el-form-item>
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
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="仓储 ">
                                <span>{{ props.row.location }}</span>
                            </el-form-item>
                            <el-form-item label="生产日期 ">
                                <span>{{ props.row.producedDate }}</span>
                            </el-form-item>
                            <el-form-item label="操作时间 ">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="ID"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="goodsId"
                    label="货号"
                    width="60">
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
                    label="总金额">
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
                <el-table-column
                    prop="createDate"
                    label="订单日期">
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="操作人">
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
import {Loading} from "element-ui";

export default {
    name: "Purchase",
    data() {
        return {
            editDialogVisible: false,
            orderDataDialogVisible:false,
            tableData: [],
            statusLabels: {
                1: {type: 'success', label: '新鲜'},
                2: {type: 'warning', label: '临期'},
                3: {type: 'danger', label: '尽快使用'},
            },
            purchaseDataForm:{
                startDate:'',
                endDate:''
            },
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                id: '',
                goodsId:'',
                category: '',
                supplier: ''
            },
            editForm: {
                id: '',
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
                startDate: [
                    {required: true, message: '请选择起始日期'}
                ],
                endDate: [
                    {required: true, message: '请选择截止日期'}
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
        //编辑客户提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/purchase`, this.editForm).then(({data}) => {
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
        //提交导出采购记录请求
        submitForOrderData() {
            this.$confirm('此操作会生成Excel格式订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log("进入")
                // 获取选择的日期
                let selectedDate = new Date(this.purchaseDataForm.endDate);
                // 格式化日期为LocalDate格式
                this.purchaseDataForm.endDate = selectedDate.toISOString().split('T')[0];
                selectedDate = new Date(this.purchaseDataForm.startDate);
                // 格式化日期为LocalDate格式
                this.purchaseDataForm.startDate = selectedDate.toISOString().split('T')[0];

                let loadingInstance = Loading.service({text: "正在处理中..."})
                http.get(`/purchase/printData/?startDate=${this.purchaseDataForm.startDate}&endDate=${this.purchaseDataForm.endDate}`
                    , {responseType: 'blob'})
                    .then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `采购记录_${this.purchaseDataForm.startDate}_${this.purchaseDataForm.endDate}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }).finally(() => {
                    loadingInstance.close();
                    this.handleCloseForOrderData()
                })
                    .catch(error => {
                        console.error('Error downloading Excel file:', error);
                    })
            }).catch(() => {
                this.$message.info('当前操作取消')
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
        //导出弹窗关闭
        handleCloseForOrderData(){
            this.orderDataDialogVisible=false;
        },
        //导出按钮点击事件
        handlePrint(){
            this.orderDataDialogVisible = true
        },
        //获取页面
        getPage() {
            http.get(`/purchase/${this.pageData.currentPage}/${this.pageData.pageSize}/?id=${this.pageData.id}&id=${this.pageData.goodsId}&goodsId=${this.pageData.goodsId}&category=${this.pageData.category}&supplier=${this.pageData.supplier}`).then(({data}) => {
                    if (!data.code) {
                        data.data.records.forEach(record => {
                            if (record.price !== null) {
                                record.price = record.price.toFixed(2)
                            }
                            if (record.totalAmount !== null) {
                                record.totalAmount = record.totalAmount.toFixed(2)
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
    }

}

</style>