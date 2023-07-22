<template>
    <div class="manage">
        <el-dialog
            title="新增订单"
            :visible.sync="addDialogVisible"
            :width="activeStep === 1 ? '70%' : '30%'"
            :before-close="handleCloseForAdd">
            <el-steps :active="activeStep"
                      align-center
                      finish-status="success"
                      style="margin-bottom: 20px">
                <el-step title="客户信息"></el-step>
                <el-step title="订单内容"></el-step>
                <el-step title="提交"></el-step>
            </el-steps>
            <div v-if="activeStep === 0">
                <!--  录入时用户的表单信息-->
                <el-form
                    ref="addForm"
                    :model="addForm"
                    :rules="rules"
                    label-width="auto"
                    :close-on-click-modal="false">
                    <el-form-item label="客户" prop="customer">
                        <el-select v-model="addForm.customerId" filterable placeholder="请选择客户"
                                   @visible-change="selectCustomerClick"
                                   @change="(customerId) => selectCustomerChange(customerId, 1)">
                            <el-option
                                v-for="item in options4Customer"
                                :key="item.id"
                                :label="item.customer"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人" prop="people">
                        <el-input placeholder="请输入联系人名称" v-model="addForm.people"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input placeholder="请输入联系电话" v-model="addForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input placeholder="请输入地址" v-model="addForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期" prop="createDate">
                        <el-date-picker
                            v-model="addForm.createDate"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="activeStep === 1" style="height: 500px;">
                <el-table
                    stripe
                    height="90%"
                    :data="orderDetailTableData"
                    style="width: 100% ;height: 100%"
                >
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
                        prop="packageNumber"
                        label="件数">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价">
                        <template slot-scope="props">
                            ¥ {{ props.row.price }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额">
                        <template slot-scope="props">
                            ¥ {{ props.row.amount }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150px">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete4OrderDetail(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-if="activeStep === 2">
                <el-result v-if="showResult4AddOrder" icon="success" title="新增成功" subTitle="返回可查看订单详情">
                    <template slot="extra">
                        <el-button type="primary" size="medium" @click="handleCloseForAdd">确定</el-button>
                    </template>
                </el-result>
                <el-result v-if="!showResult4AddOrder" icon="warning" title="新增失败" subTitle="请检查提交内容">
                    <template slot="extra">
                        <el-button type="primary" size="medium" @click="prevStep">上一步</el-button>
                    </template>
                    <template slot="extra">
                        <el-button size="medium" @click="handleCloseForAdd">取 消</el-button>
                    </template>
                </el-result>
            </div>

            <div slot="footer" class="dialog-footer"
                 style="  display: flex;
                        justify-content: center;">
                <el-button @click="prevStep" v-if="activeStep > 0&&activeStep !== 2">上一步</el-button>
                <el-button type="primary" @click="handle4AddOrderDetail" v-if="activeStep ===1 ">添 加</el-button>
                <el-button type="primary" @click="submitForAddOrder" v-if="activeStep ===1 ">提 交</el-button>
                <el-button @click="nextStep" v-if="activeStep  < 1">下一步
                </el-button>
                <el-button @click="handleCloseForAdd" v-if="activeStep !== 2">取 消</el-button>
            </div>


            <!--            <span slot="footer" class="dialog-footer">-->
            <!--                <el-button @click="handleCloseForAdd">取 消</el-button>-->
            <!--                <el-button type="primary" @click="submitForAdd">确 定</el-button>-->
            <!--            </span>-->
        </el-dialog>

        <el-dialog
            title="编辑"
            :visible.sync="editDialogVisible"
            width="30%"
            :before-close="handleCloseForEdit">
            <!--  b时用户的表单信息-->
            <el-form
                ref="editForm"
                :model="editForm"
                :rules="rules"
                label-width="80px">
                <el-form-item label="客户" prop="customer">
                    <el-select disabled v-model="editForm.customer" filterable placeholder="请选择客户"
                    >
                        <el-option
                            v-for="item in options4Customer"
                            :key="item.value"
                            :label="item.customer"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人" prop="people">
                    <el-input placeholder="请输入联系人名称" v-model="editForm.people"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input placeholder="请输入联系电话" v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input placeholder="请输入地址" v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" prop="createDate">
                    <el-date-picker
                        v-model="editForm.createDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单状态" prop="status">
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
                <el-form-item label="订单金额" prop="amount">
                    <el-input-number
                        placeholder="请输入订单金额"
                        :precision="2"
                        v-model.number="editForm.amount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="交付进度" prop="deliveryProgress">
                    <el-input-number
                        disabled
                        placeholder="0-100"
                        v-model.number="editForm.deliveryProgress"
                        size="small">
                    </el-input-number>
                    <span> %</span>
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
            :visible.sync="editPaymentDialogVisible"
            :before-close="handleCloseForEditPayment">
            <div style="height: 350px;">
                <el-table
                    stripe
                    height="90%"
                    :data="curPaymentDetail"
                    style="width: 100%">
                    <el-table-column
                        prop="payDate"
                        label="回款日期">
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="回款金额">
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
                                type="danger"
                                @click="handleDelete4Payment(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
                <el-button type="primary" @click="handleAddPayment">添 加</el-button>
                <el-button @click="handleCloseForEditPayment">取 消</el-button>

            </span>
        </el-dialog>

        <el-dialog
            title="添加回款明细"
            :visible.sync="addPaymentDialogVisible"
            width="30%"
            :before-close="handleCloseForAddPayment">
            <el-form
                ref="payForm"
                :model="payForm"
                :rules="rules"
                label-width="80px">
                <el-form-item label="回款日期" prop="payDate">
                    <el-date-picker
                        v-model="payForm.payDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回款金额" prop="amount">
                    <el-input-number
                        placeholder="请输入回款金额"
                        :precision="2"
                        v-model.number="payForm.amount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="payForm.note">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForAddPayment">取 消</el-button>
                <el-button type="primary" @click="submitForAddPayment">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="添加订单内容"
            :visible.sync="addOrderDetailDialogVisible"
            width="30%"
            :before-close="handleCloseForAddOrderDetail">
            <el-form
                ref="orderDetailForm"
                :model="orderDetailForm"
                :rules="rules"
                label-width="80px">
                <el-form-item label="产品名称" prop="productName">
                    <el-select v-model="orderDetailForm.productId" filterable placeholder="请选择产品"
                               @visible-change="selectProductClick"
                               @change="(productId) => selectProductChange(productId)">
                        <el-option
                            v-for="item in options4Product"
                            :key="item.id"
                            :label="item.productName"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品编号" prop="productCode">
                    <el-select v-model="orderDetailForm.productId" filterable placeholder="请选择产品"
                               @visible-change="selectProductCodeClick"
                               @change="(productId) => selectProductCodeChange(productId)">
                        <el-option
                            v-for="item in options4Product"
                            :key="item.id"
                            :label="item.productCode"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        placeholder="订购数量"
                        :precision="0"
                        v-model.number="orderDetailForm.number"
                    >
                    </el-input-number>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input placeholder="请输入产品单位" v-model="orderDetailForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="数量/件" prop="numberPerBox">
                    <el-input-number
                        placeholder="每件(箱)数量"
                        :precision="0"
                        v-model.number="orderDetailForm.numberPerBox"
                    >
                    </el-input-number>
                </el-form-item>
                <el-form-item label="件数" prop="packageNumber">
                    <p>{{ orderDetailForm.packageNumber }}</p>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input-number
                        placeholder="请输入单价"
                        :precision="2"
                        v-model.number="orderDetailForm.price">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="金额" prop="amount">
                    <el-input-number
                        placeholder="请输入估值"
                        :precision="2"
                        v-model.number="orderDetailForm.amount"
                        width="100%">
                    </el-input-number>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForAddOrderDetail">取 消</el-button>
                <el-button type="primary" @click="submitForAddOrderDetail">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="库存单(全选状态下默认出货最早生产时间货品)"
            :visible.sync="deliverDialogVisible"
            width="60%"
            :before-close="handleCloseForDeliver">
            <div style="height: 350px;">
                <el-table
                    stripe
                    ref="tableRef"
                    height="90%"
                    :data="curProducts"
                    style="width: 100%"
                    @selection-change="handleSelectionChange4DeliverProducts"
                    :default-selection="curProducts">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="batchId"
                        label="货号">
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
                        prop="producedDate"
                        label="生产日期">
                    </el-table-column>
                    <el-table-column
                        prop="location"
                        label="仓储">
                    </el-table-column>
                    <!--                <el-table-column-->
                    <!--                    width="150"-->
                    <!--                    label="操作">-->
                    <!--                    <template slot-scope="scope">-->
                    <!--                        <el-button-->
                    <!--                            size="mini"-->
                    <!--                            type="danger"-->
                    <!--                            @click="handleDelete4Payment(scope.$index, scope.row)">删除-->
                    <!--                        </el-button>-->
                    <!--                    </template>-->
                    <!--                </el-table-column>-->
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer"
                  style="display: flex; align-items: center; justify-content: space-between;">
                <el-progress type="circle" :percentage=percentage width="50"
                             style="margin-left: 10px">
                </el-progress>
                 <el-statistic>
                    <template slot="formatter"> {{ curTotalSelectNumber }}/{{ curRowNumberNeed4Product }} </template>
                 </el-statistic>
                <!--                <div>-->
                    <el-button @click="handleCloseForDeliver">取 消</el-button>
                    <el-button type="primary"
                               :disabled="percentage !== 100"
                               @click="submitForDeliver">发 货</el-button>
                <!--                </div>-->
            </span>
        </el-dialog>

        <el-dialog
            title="编辑订单内容"
            :visible.sync="editOrderDetailDialogVisible"
            width="30%"
            :before-close="handleCloseForEditOrderDetail">
            <!--  b时用户的表单信息-->
            <el-form
                ref="editOrderDetailForm"
                :model="editOrderDetailForm"
                :rules="rules"
                label-width="80px">

                <el-form-item label="产品名称" prop="productName">
                    <el-input disabled placeholder="请输入订单内容"
                              v-model="editOrderDetailForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品编号" prop="productCode">
                    <el-input disabled placeholder="请输入联系人名称"
                              v-model="editOrderDetailForm.productCode"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number
                        placeholder="请输入数量"
                        :precision="0"
                        v-model.number="editOrderDetailForm.number"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input placeholder="请输入地址" v-model="editOrderDetailForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="件数" prop="packageNumber">
                    <el-input-number
                        placeholder="产品件数"
                        :precision="0"
                        v-model.number="editOrderDetailForm.packageNumber"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input-number
                        placeholder="请输入订单金额"
                        :precision="2"
                        v-model.number="editOrderDetailForm.price"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="金额" prop="amount">
                    <el-input-number
                        placeholder="请输入订单金额"
                        :precision="2"
                        v-model.number="editOrderDetailForm.amount"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="editOrderDetailForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForEditOrderDetail">取 消</el-button>
                <el-button type="primary" @click="submitForEditOrderDetail">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="导出采购单"
            :visible.sync="purchaseDataDialogVisible"
            width="30%"
            :before-close="handleCloseForpurchaseData">
            <el-form
                ref="orderDataForm"
                :model="orderDataForm"
                :rules="rules"
                label-width="auto">
                <el-form-item label="起始日期" prop="startDate">
                    <el-date-picker
                        v-model="orderDataForm.startDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="截止日期" prop="endDate">
                    <el-date-picker
                        v-model="orderDataForm.endDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseForpurchaseData">取 消</el-button>
                <el-button type="primary" @click="submitForOrderData">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header" style="text-align: right;">
            <div>
                <el-button @click="handleAdd" type="primary">
                    + 新增订单
                </el-button>
                <el-button @click="handlePrint" type="success">
                    导出记录
                </el-button>
            </div>
            <el-form :inline="true" :model="pageData">
                <el-form-item>
                    <el-input placeholder="请输入订单号" v-model="pageData.orderId"></el-input>
                </el-form-item>
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
                style="width: 100%"
                @expand-change="handleExpandChange">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="联系人 ">
                                <span>{{ props.row.people }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="地址信息">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.note }}</span>
                            </el-form-item>
                            <el-form-item label="最后操作">
                                <span>{{ props.row.updateTime }}</span>
                            </el-form-item>
                            <el-form-item label="订单内容">
                                <el-button type="primary" size="small"
                                           :disabled="selectedItemsCount === 0"
                                           @click="submitForDeliverBatch(props.row.orderId)">
                                    批量发货
                                </el-button>
                                <el-table
                                    :data="expandedRows[props.row.orderId]"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange4OrderDetails">
                                    <el-table-column
                                        type="selection"
                                        width="55">
                                    </el-table-column>
                                    <!-- 其他表格列 -->
                                    <el-table-column
                                        prop="productName"
                                        label="产品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="productCode"
                                        label="产品编号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="packageNumber"
                                        label="件数">
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
                                        prop="price"
                                        label="单价">
                                        <template slot-scope="props">
                                            ¥ {{ props.row.price }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="amount"
                                        label="金额">
                                        <template slot-scope="props">
                                            ¥ {{ props.row.amount }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="isDelivered"
                                        label="发货状态"
                                        width="90">
                                        <template slot-scope="props">
                                            <el-tag :type="status4isDelivered[props.row.isDelivered].type">{{
                                                    status4isDelivered[props.row.isDelivered].label
                                                }}
                                            </el-tag>
                                        </template>
                                        <template slot="header" slot-scope="scope">
                                            <div class="column-header">
                                                <span>{{ scope.column.label }}</span>
                                                <el-tooltip class="header-tooltip"
                                                            effect="dark"
                                                            :content="tooltipContent4DeliverStatus"
                                                            placement="top">
                                                    <i class="el-icon-info"></i>
                                                </el-tooltip>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="deliveredDate"
                                        label="发货日期">
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
                                                type="success"
                                                :disabled="scope.row.isDelivered === 1"
                                                @click="handleDeliver(scope.$index, scope.row)">发货
                                            </el-button>
                                            <el-button
                                                size="mini"
                                                type="primary"
                                                @click="handleEdit4OrderDetail(scope.$index, scope.row)">编辑
                                            </el-button>
                                            <el-button
                                                size="mini"
                                                type="danger"
                                                :disabled="scope.row.isDelivered === 1"
                                                @click="handleDelete4OrderDetailInTable(scope.$index, scope.row)">删除
                                            </el-button>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="customer"
                    label="客户">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                    prop="content"-->
                <!--                    label="订单内容">-->
                <!--                </el-table-column>-->
                <el-table-column
                    prop="people"
                    label="联系人"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="日期"
                    width="130">
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
                    prop="amount"
                    label="订单金额">
                    <template slot-scope="props">
                        ¥ {{ props.row.amount }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deliveryProgress"
                    label="交付进度"
                    width="90">
                    <template slot-scope="props">
                        {{ props.row.deliveryProgress }}%
                    </template>
                    <template slot="header" slot-scope="scope">
                        <div class="column-header">
                            <span>{{ scope.column.label }}</span>
                            <el-tooltip class="header-tooltip"
                                        effect="dark"
                                        :content="tooltipContent4DeliverProgress"
                                        placement="top">
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="totalPayment"
                    label="已回金额">
                    <template slot-scope="props">
                        ¥ {{ props.row.totalPayment }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="210"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handlePrintOrder(scope.$index, scope.row)">票据
                        </el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="handlePayment(scope.$index, scope.row)">回款
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <!--                        <el-button-->
                        <!--                            size="mini"-->
                        <!--                            type="danger"-->
                        <!--                            @click="handleDelete(scope.$index, scope.row)">删除-->
                        <!--                        </el-button>-->
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
import {Loading} from 'element-ui';

export default {
    name: "Order",
    data() {
        return {
            activeStep: 0,
            addDialogVisible: false,
            editDialogVisible: false,
            addPaymentDialogVisible: false,
            editPaymentDialogVisible: false,
            addOrderDetailDialogVisible: false,
            editOrderDetailDialogVisible: false,
            showResult4AddOrder: false,
            deliverDialogVisible: false,
            purchaseDataDialogVisible:false,
            expandedRows: {},
            tableData: [],
            curTotalSelectNumber: 0,
            curRowNumberNeed4Product: 0,
            curDetailRow: 0,
            percentage: 0,
            selectedItems4OrderDetails: [], // 存储选中的项
            orderDetailTableData: [],
            tooltipContent4DeliverStatus: "如需退货，建议在下方订单内容处备注，并修改单价为0，金额为0。(请自行选择是否移步至产品管理界面手动添加数量，以供二次售卖。)",
            tooltipContent4DeliverProgress: "计算公式：已出货产品金额 / 订单金额",
            options4Customer: [],
            options4Product: [],
            options4Status: [
                {
                    label: "未制作",
                    value: 1

                }, {
                    label: "制作中",
                    value: 2
                }, {
                    label: "部分交付",
                    value: 3
                }, {
                    label: "待回款",
                    value: 4
                }, {
                    label: "完成",
                    value: 5
                }, {
                    label: "返厂",
                    value: 6
                }, {
                    label: "作废",
                    value: 7
                }
            ],
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                customer: '',
                address: '',
                orderId: '',
            },
            addForm: {
                id: 0,
                orderId: "",
                customerId: '',
                customer: "",
                people: "",
                content: "",
                phone: "",
                address: "",
                createDate: "",
                status: 1,
                amount: '',
                deliveryProgress: '',
                totalPayment: '',
                note: "",
            },
            orderDataForm:{
                startDate:'',
                endDate:''
            },
            editForm: {
                id: 0,
                customerId: "",
                orderId: "",
                customer: "",
                people: "",
                content: "",
                phone: "",
                address: "",
                createDate: "",
                status: 1,
                amount: '',
                deliveryProgress: '',
                totalPayment: '',
                note: "",
            },
            editOrderDetailForm: {
                id: '',
                orderId: '',
                productId: '',
                productName: '',
                productCode: '',
                packageNumber: 0,
                unit: '',
                number: 0,
                price: 0,
                amount: 0,
                isDelivered: '',
                deliveredDate: '',
                note: "",
            },
            payForm: {
                id: '',
                orderId: '',
                payDate: '',
                amount: '',
                note: '',
            },
            orderDetailForm: {
                id: '',
                orderId: '',
                productId: '',
                productName: '',
                productCode: '',
                numberPerBox: '',
                packageNumber: '',
                unit: '',
                number: 0,
                price: 0.00,
                amount: 0.00,
                isDelivered: '',
                deliveredDate: '',
                note: ''
            },
            deliverForm: {
                orderDetail: '',
                products: []
            },
            deliverBatchForm: {
                orderDetails: [],
            },
            curPaymentDetail: [
                {}, {}, {}, {}
            ],
            curProducts: [
                {}, {}, {}, {}
            ],
            curOrderInfo: '',
            statusLabels: {
                1: {type: 'warning', label: '未制作'},
                2: {type: 'info', label: '制作中'},
                3: {type: 'info', label: '部分交付'},
                4: {type: '', label: '待回款'},
                5: {type: 'success', label: '完成'},
                6: {type: 'danger', label: '返厂'},
                7: {type: 'danger', label: '作废'}
            },
            status4isDelivered: {
                0: {type: 'warning', label: '未发货'},
                1: {type: 'success', label: '已发货'},
            },
            rules: {
                productName: [
                    {required: true, message: '请选择产品'}
                ],
                productCode: [
                    {required: true, message: '请选择产品编码'}
                ],
                number: [
                    {required: true, message: '请选择订单数量'},
                    {type: 'number', message: '必须为数字值'}
                ],
                price: [
                    {required: true, message: '请输入单价'},
                    {type: 'number', message: '必须为数字值'}
                ],
                amount: [
                    {required: true, message: '请输入总金额'},
                    {type: 'number', message: '必须为数字值'}
                ],
                customer: [
                    {required: true, message: '请选择客户公司'}
                ],
                status: [
                    {required: true, message: '请选择订单状态'}
                ],
                deliveryProgress: [
                    {type: 'number', message: '必须为0-100数字值'}
                ],
                payDate: [
                    {required: true, message: '请选择回款日期'}
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
        // 在Element UI的某个事件中触发打印
        printTicket() {
            window.print();
        },
        //新增提交表单
        submitForAddOrder() {
            this.activeStep++
            let loadingInstance = Loading.service({text: "正在提交中..."})
            console.log(this.orderDetailTableData, 'orderDetailTableData')
            this.addForm.orderDetails = this.orderDetailTableData;
            http.post(`/orders`, this.addForm).then(({data}) => {
                // console.log(data)
                if (!data.code) {
                    this.showResult4AddOrder = true
                    this.$message.success(data.message)
                } else {
                    this.$message.error(data.message)
                }
            }).finally(() => {
                //重新加载数据
                loadingInstance.close();
                this.getPage();
            })
        },
        //提交导出订单记录请求
        submitForOrderData() {
            this.$confirm('此操作会导出订单记录和订单明细记录，生成Excel格式表单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log("进入")
                // 获取选择的日期
                let selectedDate = new Date(this.orderDataForm.endDate);
                // 格式化日期为LocalDate格式
                this.orderDataForm.endDate = selectedDate.toISOString().split('T')[0];
                selectedDate = new Date(this.orderDataForm.startDate);
                // 格式化日期为LocalDate格式
                this.orderDataForm.startDate = selectedDate.toISOString().split('T')[0];

                let loadingInstance = Loading.service({text: "正在处理中..."})
                http.get(`/orders/printData/?startDate=${this.orderDataForm.startDate}&endDate=${this.orderDataForm.endDate}`
                    , {responseType: 'blob'})
                    .then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `订单记录_${this.orderDataForm.startDate}_${this.orderDataForm.endDate}.xlsx`);
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
        //编辑提交表单
        submitForEdit() {
            this.$refs.editForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/orders`, this.editForm).then(({data}) => {
                        if (!data.code) {
                            this.$message.success(data.message)
                        } else {

                            this.$message.error(data.message)
                        }
                    }).finally(() => {
                        this.handleCloseForEdit()
                        //重新加载数据
                        this.getPage();
                    })
                }
            })
        },
        //编辑订单明细提交表单
        submitForEditOrderDetail() {
            this.$refs.editOrderDetailForm.validate((isValid) => {
                if (isValid) {
                    http.put(`/orders/orderDetails`, this.editOrderDetailForm).then(({data}) => {
                        if (!data.code) {
                            this.$message.success(data.message)
                        } else {
                            this.$message.error(data.message)
                        }
                    }).finally(() => {
                        this.handleCloseForEditOrderDetail()
                        //重新加载数据
                        this.getOrderDetails(this.curDetailRow.orderId)
                    })
                }
            })
        },
        //新增回款明细提交表单
        submitForAddPayment() {
            this.payForm.orderId = this.curOrderInfo.orderId
            http.post(`/paymentDetails`, this.payForm).then(({data}) => {
                if (!data.code) {
                    this.$message.success(data.message)
                    this.handleCloseForAddPayment()
                } else {
                    this.$message.error(data.message)
                }
            }).finally(() => {
                this.getPaymentDetail(this.curOrderInfo.orderId)
                this.getPage()
            })
        },
        //新增订单明细提交表单
        submitForAddOrderDetail() {
            this.orderDetailTableData.push({...this.orderDetailForm})
            console.log(this.orderDetailTableData, 'this.orderDetailTableData')
            this.handleCloseForAddOrderDetail()
        },
        //发货提交表单
        submitForDeliver() {
            http.post(`orders/orderDetails/deliver`, this.deliverForm).then(({data}) => {
                if (!data.code) {
                    this.$message.success(data.message)
                } else {
                    this.$message.error(data.message)
                }
            }).finally(() => {
                this.handleCloseForDeliver()
                this.getOrderDetails(this.curDetailRow.orderId)
                // this.getPage()
            })
        },
        //批量发货提交表单
        submitForDeliverBatch(orderId) {
            this.$confirm('批量发货前请确认库存中存在足够数量以下产品,若产品数量不足则' +
                '发货失败,发货产品默认为最早生产批次,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.post(`orders/orderDetails/deliverBatch`, this.deliverBatchForm).then(({data}) => {
                    if (!data.code) {
                        this.$message.success(data.message)
                    } else {
                        this.$message.error(data.message)
                    }
                }).finally(() => {
                    this.handleCloseForDeliver()
                    this.getOrderDetails(orderId)
                    // this.getPage()
                })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //查询按钮点击事件
        searchSubmit() {
            this.getPage()
        },
        //录入按钮点击事件
        handleAdd() {
            this.$nextTick(function () {
                this.$refs.addForm.resetFields();
            });
            this.addDialogVisible = true
            //刷新最后的结果状态
            this.showResult4AddOrder = false
        },
        //新增明细点击事件
        handleAddPayment() {
            this.addPaymentDialogVisible = true;
        },
        //新增订单内容点击事件
        handle4AddOrderDetail() {
            this.addOrderDetailDialogVisible = true;
        },
        //导出按钮点击事件
        handlePrint(){
            this.purchaseDataDialogVisible = true
        },
        //编辑按钮点击事件
        handleEdit(index, row) {
            this.editDialogVisible = true
            //深拷贝 否则会直接修改数据
            this.editForm = JSON.parse(JSON.stringify(row))
        },
        //订单明细编辑按钮点击事件
        handleEdit4OrderDetail(index, row) {
            this.editOrderDetailDialogVisible = true
            this.editOrderDetailForm = JSON.parse(JSON.stringify(row))
            this.curDetailRow = row
        },
        //回款按钮点击事件
        handlePayment(index, row) {
            //获取回款明细
            this.getPaymentDetail(row.orderId)
            this.editPaymentDialogVisible = true
            //获取当前orderInfo
            this.curOrderInfo = row;
        },
        //发货按钮点击事件
        handleDeliver(index, row) {
            this.getProducts(row.productId)
            this.curRowNumberNeed4Product = row.number
            this.deliverDialogVisible = true
            this.deliverForm.orderDetail = row
            this.curDetailRow = row
        },
        //新增订单弹窗关闭
        handleCloseForAdd() {
            this.$set(this.addForm, 'id', '')
            this.$set(this.addForm, 'orderId', '')
            this.$set(this.addForm, 'productId', '')
            this.$set(this.addForm, 'productName', '')
            this.$set(this.addForm, 'productCode', '')
            this.$set(this.addForm, 'numberPerBox', '')
            this.$set(this.addForm, 'packageNumber', '')
            this.$set(this.addForm, 'unit', '')
            this.$set(this.addForm, 'number', 0)
            this.$set(this.addForm, 'price', 0.00)
            this.$set(this.addForm, 'amount', 0.00)
            this.$set(this.addForm, 'isDelivered', '')
            this.$set(this.addForm, 'deliveredDate', '')
            this.$set(this.addForm, 'note', '')
            this.orderDetailTableData = []
            this.addDialogVisible = false
            this.activeStep = 0; // 关闭对话框时重置步骤为第一步
        },
        //导出弹窗关闭
        handleCloseForpurchaseData(){
            this.purchaseDataDialogVisible=false;
        },
        //编辑订单弹窗关闭
        handleCloseForEdit() {
            this.editDialogVisible = false
        },
        //编辑订单明细弹窗关闭
        handleCloseForEditOrderDetail() {
            this.editOrderDetailDialogVisible = false
        },
        //新增明细弹窗关闭
        handleCloseForAddPayment() {
            this.$refs.payForm.resetFields()
            this.addPaymentDialogVisible = false
        },
        //发货弹窗关闭
        handleCloseForDeliver() {
            this.deliverDialogVisible = false;
        },
        //新增订单内容弹窗关闭
        handleCloseForAddOrderDetail() {
            this.$refs.orderDetailForm.resetFields()
            this.addOrderDetailDialogVisible = false
        },

        //管理明细弹窗关闭
        handleCloseForEditPayment() {
            this.editPaymentDialogVisible = false
        },
        //删除按钮点击事件
        handleDelete(index, row) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/orders/${row.id}`).then(({data}) => {

                    if (!data.code) {
                        this.$message.success(data.message)
                    } else {
                        this.$message.error(data.message)
                    }
                }).finally(() => {
                    this.getOrderDetails(row.orderId)
                    //重新加载数据
                    this.getPage();
                })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //打票按钮点击事件
        handlePrintOrder(index, row) {
            this.$confirm('此操作会生成Excel格式订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let loadingInstance = Loading.service({text: "正在处理中..."})
                http.get(`/orders/print/${row.orderId}`, {responseType: 'blob'})
                    .then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `订单_${row.customer}_${row.createDate}.xlsx`);
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
        //删除回款明细按钮点击事件
        handleDelete4Payment(index, row) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/paymentDetails/${row.id}`).then(({data}) => {
                    if (!data.code) {
                        this.$message.success(data.message)
                        // this.handleCloseForEditPayment()
                    } else {
                        this.$message.error(data.message)
                    }
                }).finally(() => {
                    //重新加载数据
                    this.getPaymentDetail(this.curOrderInfo.orderId);
                    this.getPage()
                })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //删除订单明细点击事件
        handleDelete4OrderDetail(index, row) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.orderDetailTableData.splice(index, 1);
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //在Table中删除订单明细点击事件
        handleDelete4OrderDetailInTable(index, row) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(`/orders/orderDetails/${row.id}`).then(({data}) => {
                    if (!data.code) {
                        this.$message.success(data.message)
                    } else {
                        this.$message.error(data.message)
                    }
                }).finally(() => {
                    //重新加载数据
                    this.getPaymentDetail(this.curOrderInfo.orderId);
                    this.getPage()
                })
            }).catch(() => {
                this.$message.info('当前操作取消')
            })
        },
        //获取页面
        getPage() {
            http.get(`/orders/${this.pageData.currentPage}/${this.pageData.pageSize}/?customer=${this.pageData.customer}&address=${this.pageData.address}&orderId=${this.pageData.orderId}`)
                .then(({data}) => {
                        if (!data.code) {
                            data.data.records.forEach(record => {
                                record.amount = record.amount.toFixed(2)
                                record.totalPayment = record.totalPayment.toFixed(2)
                            });
                            this.tableData = data.data.records
                            this.pageData.total = data.data.total
                        } else {
                            this.$message.error(`获取页面信息失败!${data.message}`)
                        }
                    }
                )
        },
        //请求回款明细
        getPaymentDetail(orderId) {
            http.get(`/paymentDetails/${orderId}`).then(({data}) => {
                if (!data.code) {
                    this.curPaymentDetail = data.data
                    this.curPaymentDetail.forEach((item) => {
                        item.amount = item.amount.toFixed(2)
                    })
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //请求货品信息
        getProducts(productId) {
            http.get(`/products/${productId}`).then(({data}) => {
                if (!data.code) {
                    this.curProducts = data.data
                    this.$nextTick(() => {
                        this.$refs.tableRef.toggleAllSelection();
                    });
                } else {
                    this.$message.error(data.message)
                }
            })
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
                    this.$set(this.expandedRows, orderId, data.data)
                }
            })
        },
        //页码栏点击事件
        handlePage(currentPage) {
            this.pageData.currentPage = currentPage
            this.getPage()
        },
        //弹出客户选择选项
        selectCustomerClick() {
            http.get("/customers").then(({data}) => {
                if (!data.code) {
                    this.options4Customer = data.data
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //选择客户后自动填充
        selectCustomerChange(customerId,) {
            let customerData = {}
            customerData = this.options4Customer.find(item => item.id === customerId)
            this.$set(this.addForm, 'people', customerData.people)
            this.$set(this.addForm, 'phone', customerData.phone)
            this.$set(this.addForm, 'address', customerData.address)
            this.$set(this.addForm, 'customer', customerData.customer)
        },
        //弹出产品名称选择选项
        selectProductClick() {
            http.get("/products/overviews").then(({data}) => {
                if (!data.code) {
                    this.$set(this, 'options4Product', data.data);
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //选择产品名称后自动填充
        selectProductChange(productId) {
            let productData = {}
            productData = this.options4Product.find(item => item.id === productId)
            // this.$set(this.orderDetailForm, 'productId', productData.productId)
            this.$set(this.orderDetailForm, 'productName', productData.productName)
            this.$set(this.orderDetailForm, 'productCode', productData.productCode)
            this.$set(this.orderDetailForm, 'unit', productData.unit)
            this.$set(this.orderDetailForm, 'price', productData.priceDefault)
            this.$set(this.orderDetailForm, 'numberPerBox', productData.numberPerBox)
        },
        //弹出产品编码选择选项
        selectProductCodeClick() {
            http.get("/products/overviews").then(({data}) => {
                if (!data.code) {
                    this.$set(this, 'options4Product', data.data);
                } else {
                    this.$message.error(data.message)
                }
            })
        },
        //选择产品编码后自动填充
        selectProductCodeChange(productId,) {
            let productData = {}
            productData = this.options4Product.find(item => item.id === productId)
            // this.$set(this.orderDetailForm, 'productId', productData.productId)
            this.$set(this.orderDetailForm, 'productName', productData.productName)
            this.$set(this.orderDetailForm, 'productCode', productData.productCode)
            this.$set(this.orderDetailForm, 'unit', productData.unit)
            this.$set(this.orderDetailForm, 'price', productData.priceDefault)
            this.$set(this.orderDetailForm, 'numberPerBox', productData.numberPerBox)
        },
        //处理行展开事件
        handleExpandChange(row) {
            this.getOrderDetails(row.orderId)
        },
        //处理发货时的多行选择
        handleSelectionChange4DeliverProducts(selection) {
            // 1.将选项内容加入表单
            this.deliverForm.products = selection
            // 2.处理面板显示
            let sum = 0;
            selection.forEach((obj) => {
                if (typeof obj.number === 'number') {
                    sum += obj.number;
                }
            });
            this.curTotalSelectNumber = sum > this.curRowNumberNeed4Product ? this.curRowNumberNeed4Product : sum
            let percentage = Math.floor(sum / this.curRowNumberNeed4Product * 100);
            this.percentage = percentage > 100 ? 100 : percentage;
            console.log(this.percentage, "this.percentage");
        },
        handleSelectionChange4OrderDetails(selection) {
            this.selectedItems4OrderDetails = selection;
            this.deliverBatchForm.orderDetails = selection;
        },
        next() {
            if (this.active++ > 2) this.active = 0;
        },

        prevStep() {
            this.activeStep--;
        },
        nextStep() {
            this.activeStep++;
        }
    },
    watch: {
        'orderDetailForm.price': function (newPrice) {
            if (newPrice !== 0 && newPrice !== '' && newPrice !== null && newPrice !== undefined) {
                if (this.orderDetailForm.number !== 0 && this.orderDetailForm.number !== '' && this.orderDetailForm.number !== null && this.orderDetailForm.number !== undefined)
                    this.$set(this.orderDetailForm, 'amount', this.orderDetailForm.number * newPrice)
            }
        },
        'orderDetailForm.number': function (newNumber) {
            if (newNumber !== 0 && newNumber !== '' && newNumber !== null && newNumber !== undefined) {
                if (this.orderDetailForm.price !== 0 && this.orderDetailForm.price !== '' && this.orderDetailForm.price !== null && this.orderDetailForm.price !== undefined)
                    this.$set(this.orderDetailForm, 'amount', newNumber * this.orderDetailForm.price)
                if (this.orderDetailForm.numberPerBox !== 0 && this.orderDetailForm.numberPerBox !== '' && this.orderDetailForm.numberPerBox !== null && this.orderDetailForm.numberPerBox !== undefined)
                    this.$set(this.orderDetailForm, 'packageNumber', newNumber / this.orderDetailForm.numberPerBox)
            }
        },
        'orderDetailForm.numberPerBox': function (newPerBox) {
            if (newPerBox !== 0 && newPerBox !== '' && newPerBox !== null && newPerBox !== undefined) {
                if (this.orderDetailForm.number !== 0 && this.orderDetailForm.number !== '' && this.orderDetailForm.number !== null && this.orderDetailForm.number !== undefined)
                    this.$set(this.orderDetailForm, 'packageNumber', this.orderDetailForm.number / newPerBox)
            }
        },
        'editOrderDetailForm.price': function (newPrice) {
            if (newPrice !== 0 && newPrice !== '' && newPrice !== null && newPrice !== undefined) {
                if (this.editOrderDetailForm.number !== 0 && this.editOrderDetailForm.number !== '' && this.editOrderDetailForm.number !== null && this.editOrderDetailForm.number !== undefined)
                    this.$set(this.editOrderDetailForm, 'amount', this.editOrderDetailForm.number * newPrice)
            }
        },
        'editOrderDetailForm.number': function (newNumber) {
            if (newNumber !== 0 && newNumber !== '' && newNumber !== null && newNumber !== undefined) {
                if (this.editOrderDetailForm.price !== 0 && this.editOrderDetailForm.price !== '' && this.editOrderDetailForm.price !== null && this.editOrderDetailForm.price !== undefined)
                    this.$set(this.editOrderDetailForm, 'amount', newNumber * this.editOrderDetailForm.price)
            }
        }
    },
    computed: {
        selectedItemsCount() {
            return this.selectedItems4OrderDetails.length; // 计算选中的项的数量
        },
    },
    mounted() {
        this.$nextTick(() => {
            console.log(this.$refs.addForm, 'this.$refs.addForm');
        });

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