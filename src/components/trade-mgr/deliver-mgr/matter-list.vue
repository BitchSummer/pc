//实物收货
<template>
	<div>
		<toolbar>
			<span slot="left">
				<el-radio-group v-model="queryParam.status" size="small" @change="doSearch" >
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="待签收">待签收</el-radio-button>
					<el-radio-button label="拒签收">拒签收</el-radio-button>
					<el-radio-button label="已签收">已签收</el-radio-button>
				</el-radio-group>
				<el-input size="small" style="width: 150px;" v-model="queryParam.providerName" placeholder="服务商搜索..."  />
				<el-button icon="el-icon-search" size="small" style="width: 70px;" type="primary" @click="doSearch">查询</el-button>
				<el-button icon="el-icon-close" size="small" style="width: 90px;" @click="doReset">清空条件</el-button>
			</span>
		</toolbar>
		  <el-table  ref="table" height="600" :data="tableData" style="width: 100%" @row-dblclick="doView" @row-click="tableRowClick">
			<el-table-column type="selection" align="center" width="50" />
			<el-table-column resizable show-overflow-tooltip property="status" align="center" label="流程状态" />
		  <el-table-column resizable show-overflow-tooltip property="providerName"  label="服务商" align="center"/>
			<el-table-column resizable show-overflow-tooltip property="deliverAddrStr"  label="收货地址" align="center"/>
			<el-table-column resizable show-overflow-tooltip label="发货信息" align="center">
				<el-table-column resizable show-overflow-tooltip property="deliverTime" align="center" label="发货时间"  />
				<el-table-column resizable show-overflow-tooltip property="deliverUser" align="center" label="发货人"  />
				<el-table-column resizable show-overflow-tooltip property="orderCount" align="center" label="订单数量"  />
				<el-table-column resizable show-overflow-tooltip property="remark" align="center" label="备注"  />
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip label="收货信息" align="center">
				<el-table-column resizable show-overflow-tooltip property="signInTime" align="center" label="签收时间" />
				<el-table-column resizable show-overflow-tooltip property="signInUser" align="center" label="签收人" />
				</el-table-column>
				<el-table-column label="操作" align="center" width="100">
		  		<template slot-scope="scope">     
          <el-button size="mini" type="text" @click="doSignIn(scope.row.id)" v-if="scope.row.status=='待签收'">签收</el-button>
          <el-button size="mini" type="text" @click="doSignIn(scope.row.id)" v-if="scope.row.status=='已签收'" disabled>签收</el-button>
          <el-button size="mini" type="text" @click="refuseSignIn(scope.row.id)" v-if="scope.row.status=='待签收'">拒签</el-button>
          <el-button size="mini" type="text" @click="refuseSignIn(scope.row.id)" v-if="scope.row.status=='拒签收'" disabled>拒签</el-button>
		  		</template>
		  	</el-table-column>
		  </el-table>
		  <div class="my-pagination">
			<page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
		  </div>
			<deliver-win ref="deliverWin" />
	</div>
</template>

<script>
	import {
		matterPage,
		signInOrRefuseDeliver
	} from '../../../api/trademgr-delivermgr.js'
	import DeliverWin from './deliver-win.vue'
	export default {
		data() {
			return {
				tableData:[],
				page: {
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
				queryParam:{
					status:''
				}
			};
		},
		methods:{
      doReset(){
      this.queryParam.providerName=''
      },
			doSignIn(id){
				this.$confirm('您确认签收货, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.doSignInOrRefuse(id,'已签收','')
				})
			},
			refuseSignIn(id){
				this.$prompt('请输入拒收货理由', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({ value }) => {
						this.doSignInOrRefuse(id,'拒签收',value)
				})
			},
			doSignInOrRefuse(id,status,remark){
					signInOrRefuseDeliver({
						Vue: this,
						params: {
							id: id,
							status:status,
							remark:remark
						}
					}).then(res => {
						if (res.result)
							this.doSearch()
					})
			},
			doSearch(page) {
				let param = { ...this.queryParam}
				if (page == null || page.pageNo == null) {
					this.page.pageNo = 1
				}
				param.pageNo = this.page.pageNo
				param.pageSize = this.page.pageSize
				matterPage({Vue:this,params:param}).then(res=>{
						if(res.result){
							this.page.total= res.model.numRows
							this.tableData = res.model.items;
						}
				})
			},
			doView(row){
				this.$refs.deliverWin.show(row);
			},
			tableRowClick(row) {
				if (row) {
					this.$refs.table.toggleRowSelection(row);
				} else {
					this.$refs.table.clearSelection();
				}
			}
		},
		components: {
			DeliverWin
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
			width:180px;
		}
		.orderCode{
			width:130px;
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
