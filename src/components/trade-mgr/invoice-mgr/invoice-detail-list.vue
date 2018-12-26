<template>
  <div>
    <toolbar>
			<span slot="right">
				  <el-select
            size="small"
            v-model="addOrderParam.orderId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入订单号"
            :remote-method="queryOrderList"
            >
					<el-option
            v-for="item in orderArr"
            :key="item.id"
            :label="item.orderCode"
            :value="item.id"
            :disabled="disabled">
					</el-option>
				  </el-select>
				<el-button icon="el-icon-plus" size="small" style="width: 100px;" type="danger" @click="addOrder">添加</el-button>
			</span>
    </toolbar>
    <el-table ref="table" height="200" :data="tableData" style="width: 100%">
      <el-table-column resizable show-overflow-tooltip property="orderCode" align="center" label="订单号"/>
      <el-table-column resizable show-overflow-tooltip property="orderTime" label="下单时间" width="110"/>
      <el-table-column resizable show-overflow-tooltip property="orderActualMoney" align="center" label="订单金额"/>
      <el-table-column resizable show-overflow-tooltip align="center" property="sumInvMoney" label="已开票总额"/>
      <el-table-column resizable show-overflow-tooltip property="noPayInvoice" align="center" label="未开票总额">
        <template slot-scope="scope">
          {{scope.row.orderActualMoney-scope.row.sumInvMoney}}
        </template>
          </el-table-column>
      <el-table-column resizable property="payInvoice" align="center" label="本次开票" width="140" >
        <template slot-scope="scope">
          <el-input-number :controls="false" size="small" v-model="scope.row.payInvoice" type="number" :precision="2" placeholder="请输入本次开票额度" @change="calculate(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column resizable align="center" label="备注" width="140">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.remark" placeholder="请输入内容"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="deleteRow(scope.$index,scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    invoiceDetailList
  } from '../../../api/trademgr-invoicemgr.js'
  import {
    orderList
  } from '../../../api/trademgr-ordermgr.js'

  export default {
    props: ['form','tableData'],
    data() {
      return {
        disabled:false,
        noprice:'',
        price:'',
        orderArr: [],
        addOrderParam: {}
      };
    },
    methods: {
      calculate(row){
        if(row.payInvoice==''||row.payInvoice==null){
          row.payInvoice=0
        }
        row.sumInvMoney=parseInt(this.price)+parseInt(row.payInvoice)
        row.noPayInvoice=parseInt(this.noprice)-parseInt(row.payInvoice)
        let sum = 0
        this.tableData.forEach(item=>{
        sum += item.payInvoice;
        })
        this.form.invoiceMoney=sum
      },
      doSearch() {
        if (this.form.id != null && this.form.id > 0) {
          invoiceDetailList({
            Vue: this,
            params: {
              invoiceId: this.form.id
            }
          }).then(res => {
            if (res.result) {
              this.tableData = res.model
            }
          })
        }
      },
      queryOrderList(keyword) {
        if (this.form.providerId == null || this.form.providerId == 0) {
          this.$message({
            message: '请选择服务商',
            type: 'warning'
          });
          return;
        } else {
          orderList({
            Vue: this,
            params: {
              status:"交易中",
              orderCode: keyword,
              providerId: this.form.providerId
            }
          }).then(res => {
            if (res.result) {
              this.orderArr = res.model
            }
          })
        }

      },
      addOrder(disabled) {
        if (this.addOrderParam.orderId == null || this.addOrderParam.orderId == 0) {
          this.$message({
            message: '请输入订单号进行搜索',
            type: 'warning'
          });
          return;
        } else {
          let orderTemp = {...this.orderArr.filter(item => item.id == this.addOrderParam.orderId)[0]}
          orderTemp.noPayInvoice = orderTemp.orderActualMoney - orderTemp.sumInvMoney  
          delete orderTemp.sumBalanceMoney;
          delete orderTemp.sumDeliveryAmount;
          this.price = orderTemp.sumInvMoney
          this.noprice = orderTemp.noPayInvoice
          this.tableData.splice(0, 0, orderTemp);
          console.log(this.addOrderParam.orderId,orderTemp.id,'ooooooo')
          if(this.addOrderParam.orderId==orderTemp.id){
            this.disabled=true
          }
        }
        this.addOrderParam.orderId=''
      },
  deleteRow(index, row) { //移除
			if (row.id == null || row.id == 0)
			this.tableData.splice(index, 1);
      else
      this.tableData.splice(index, 1);
			this.$set(this.tableData[index], 'deleted', true);
		}
    }
  }
</script>

