<template>
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">

            <!--            用户的表单信息-->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select placeholder="请选择" v-model="form.sex">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <el-form :inline="true" :model="userForm">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
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
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    label="操作">
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
                    :total="totalCount"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import {getUser, addUser, editUser, delUser} from '../api/index'

export default {
    name: "User",
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            totalCount: 0,
            modalType: 0,//用以区分弹窗的模式 新增-0:编辑-1
            pageData: {
                page: 1,
                limit: 10
            },
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            userForm:{
                name:''
            },
            rules: {
                name: [
                    {required: true, message: '请输入姓名'}
                ],
                age: [
                    {required: true, message: '请输入年龄'}
                ],
                sex: [
                    {required: true, message: '请选择性别'}
                ],
                birth: [
                    {required: true, message: '请选择出生日期'}
                ],
                addr: [
                    {required: true, message: '请选择出生日期'}
                ]
            }
        }
    },
    methods: {
        //提交用户表单
        submit() {
            this.$refs.form.validate((isValid) => {
                // console.log(isValid)
                if (isValid) {
                    //后续对表单数据的处理
                    if (this.modalType === 0) {
                        //新增
                        addUser(this.form).then(() => {
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    // console.log(this.form, 'form')

                    //关闭弹窗
                    this.handleClose()
                }
            })
        },
        //查询按钮
        searchSubmit(){
            this.getList()
        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        //弹窗关闭的时候
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.modalType = 1
            this.dialogVisible = true
            //深拷贝 否则会直接修改数据
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({id: row.id}).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getList() {
            getUser({params: {...this.userForm,...this.pageData}}).then(({data}) => {
                console.log(data)
                this.tableData = data.list
                this.totalCount = data.count || 0
            })
        },
        handlePage(curPage) {
            this.pageData.page = curPage
            this.getList()
        }

    },
    mounted() {
        //获取的列表的数据
        this.getList()
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

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>