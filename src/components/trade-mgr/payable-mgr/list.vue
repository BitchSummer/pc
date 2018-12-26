<template>
	<div>
		<toolbar>
			<span slot="left">
				<el-radio-group v-model="queryParam.status" size="small" @change="doSearch1" >
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="未结清">未结清</el-radio-button>
					<el-radio-button label="已结清">已结清</el-radio-button>
				</el-radio-group>
				<el-input size="small" style="width: 150px;" v-model="queryParam.name" placeholder="服务商搜索..."  />
				<el-button icon="el-icon-search" size="small" style="width: 70px;" type="primary" @click="doSearch2">查询</el-button>
				<el-button icon="el-icon-close" size="small" style="width: 90px;" @click="doReset">清空条件</el-button>
			</span>
			<span slot="right">
			<!-- 	:disabled="selRow==null"  -->
				<el-button icon="el-icon-plus" size="small" style="width: 110px;" type="primary"  @click="doInvoiceApply">发票申请</el-button>
				<el-button icon="el-icon-plus" size="small" style="width: 110px;" type="primary"  @click="doSignOutBalance">签发结算单</el-button>
			</span>
		</toolbar>
		  <el-table  ref="table" height="600" :data="tableData" style="width: 100%" border stripe @selection-change="tableSelectChanged" @row-click="tableRowClick">
			<el-table-column type="selection" align="center" width="50" />
		  	<el-table-column resizable show-overflow-tooltip property="providerName"  label="服务商" align="center"/>
			<el-table-column resizable show-overflow-tooltip property="lastTradeDate"  label="最近交易日" width="110" align="center"/>

			<el-table-column resizable show-overflow-tooltip label="订单信息" align="center">
				<el-table-column resizable show-overflow-tooltip property="finishOrderCount" align="center" label="完成订单"  />
	<!-- 			<el-table-column resizable show-overflow-tooltip property="suspendOrderCount" align="center" label="中止订单"  /> -->
				<el-table-column resizable show-overflow-tooltip property="processOrderCount" align="center" label="交易中" />
				<el-table-column resizable show-overflow-tooltip property="allOrderCount" align="center" label="小计" />
			</el-table-column>
			<el-table-column resizable show-overflow-tooltip label="开票信息" align="center">
				<el-table-column resizable show-overflow-tooltip property="processOrderInvoice" align="center" label="流程中" />
				<el-table-column resizable show-overflow-tooltip property="payedOrderInvoice" align="center" label="已开票" />
				<el-table-column resizable show-overflow-tooltip property="noPayOrderInvoice" align="center" label="未开票" />
				<el-table-column resizable show-overflow-tooltip property="allOrderInvoice" align="center" label="小计"  />
			</el-table-column>
			<el-table-column resizable show-overflow-tooltip label="结算信息" align="center">
				<el-table-column resizable show-overflow-tooltip property="processOrderBalance" align="center" label="流程中"  />
				<el-table-column resizable show-overflow-tooltip property="payedOrderBalance" align="center" label="已结算" />
				<el-table-column resizable show-overflow-tooltip property="noPayOrderBalance" align="center" label="未结算"  />
				<el-table-column resizable show-overflow-tooltip property="allOrderBalance" align="center" label="小计"  />
			</el-table-column>
		  </el-table>
		  <div class="my-pagination">
			<page-tool @doSearch="doSearch"  @doSearch1="doSearch1"  @doSearch2="doSearch2" :pageParam="page"></page-tool>
		  </div>
		
		<invoice-win ref='invoiceWin'/>
		<balance-win ref="balanceWin"  @callback="callback" :detail='detail'/>
	</div>
</template>

<script>
	import {
		payablePage
	} from '../../../api/trademgr-payablemgr.js'
	
	import InvoiceWin from '../invoice-mgr/invoice-win.vue'
	import BalanceWin from '../balance-mgr/balance-win.vue'
	export default {
		data() {
			return {
				detail:'',
				selRow:null,
				tableData:[],
				page: {
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
				queryParam:{
					status:'',
					name:''
				}
			};
		},
		methods:{
			callback() {
                this.doSearch()
            },
			doInvoiceApply(){
				this.$refs.invoiceWin.show({});
			},
			doSignOutBalance(form){
        this.$refs.balanceWin.show({
          disAble: false,
          signOutTime: '',
          signOutUser: '',
          providerId: '',
          providerName:'',
          balanceType: '',
          balanceMoney:'',
          remark:''
        });
        this.detail="add"
      },
			tableRowClick(row) {
				this.currSelItem = row;
				if (row) {
					this.$refs.table.toggleRowSelection(row);
				} else {
					this.$refs.table.clearSelection();
				}
			},
			tableSelectChanged(selectRows){
				if (selectRows.length === 1) {
					this.selRow = selectRows[0]
				} else {
				    this.selRow = null
				}
			},
			doReset(){
			 this.queryParam.name = null;
			},
			doSearch(page){
				let param = {}
					if (page == null || page.pageNo == null) {
					this.page.pageNo = 1
					}
					param.pageNo = this.page.pageNo
					param.pageSize = this.page.pageSize
				payablePage({
					Vue:this,
					params:param
				}).then(res=>{
						if (res.result) {
						 if(res.model){
							 this.tableData = res.model.items
							 this.page.total = res.model.numRows
						 }	else{
							 this.tableData = ''
							 this.page.total = res.model.numRows
						 }	
					}
				})
			},
			doSearch1(page){
					let param = {
				...this.queryParam
					}
					if (page == null || page.pageNo == null) {
					this.page.pageNo = 1
					}
					param.pageNo = this.page.pageNo
					param.pageSize = this.page.pageSize
					delete param.name
				payablePage({
					Vue:this,
					params:param
				}).then(res=>{
						if (res.result) {
						 if(res.model){
							 this.tableData = res.model.items
							 this.page.total = res.model.numRows
						 }	else{
							 this.tableData = ''
							 this.page.total = res.model.numRows
						 }	
					}
				})
			},
			doSearch2(page){
				let param = {
				...this.queryParam
					}
					if (page == null || page.pageNo == null) {
					this.page.pageNo = 1
					}
					param.pageNo = this.page.pageNo
					param.pageSize = this.page.pageSize
				payablePage({
					Vue:this,
					params:param
				}).then(res=>{
						if (res.result) {
						 if(res.model){
							 this.tableData = res.model.items
							 this.page.total = res.model.numRows
						 }	else{
							 this.tableData = ''
							 this.page.total = res.model.numRows
						 }	
					}
				})
			},
		},
		components: {
			InvoiceWin,
			BalanceWin
		}
	}
</script>

<style lang="less">
	.flexbox{
		display: flex;
		.text{
			margin-top: 5px;
			color: #666;
			font: 12px/1.5 tahoma,arial,Hiragino Sans GB,\\5B8B\4F53,sans-serif;
		}
		.orderTime{
			width:192px;
		}
		.orderCode{
			width:140px;
		}
		.providerName{
			flex:1;
		}
		.orderMoney{
			width: 100px;
		}
		.sumDeliveryAmount{
			width: 100px;
		}
		.sumInvMoney{
			width: 100px;
		}
		.sumBalanceMoney{
			width: 100px;
		}
		.status{
			width: 130px;
		}
		.btn{
			width:100px;
		}
	}
</style>
