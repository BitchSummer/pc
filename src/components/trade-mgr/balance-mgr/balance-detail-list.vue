<template>
	<div>
		<div v-show='detail=="add"||mod=="add"'>
		<toolbar>
			<span slot="right"  >
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
						:disabled='disabled'>
					</el-option>
					</el-select>
				<el-button icon="el-icon-plus"  size="small" style="width: 100px;" type="danger" @click="addOrder">添加</el-button>
			</span>
		</toolbar>
		<el-table ref="table" height="200" :data="tableData1" style="width: 100%" >				
			<el-table-column resizable show-overflow-tooltip property="orderCode" align="center" label="订单号" />
			<el-table-column resizable show-overflow-tooltip property="orderTime" align="center" label="下单时间" width="110" />
			<el-table-column resizable show-overflow-tooltip property="orderActualMoney" align="center" label="订单金额" />
			<el-table-column resizable show-overflow-tooltip align="center" label="已结算总额" property="sumBalanceMoney">
			</el-table-column>
			<el-table-column resizable show-overflow-tooltip property="noPayBalance" align="center" label="未结算总额" >	
			  <template slot-scope="scope"  >			 
			 	{{scope.row.orderActualMoney-scope.row.sumBalanceMoney}}  	 
				</template>  	 
				</el-table-column>
			<el-table-column resizable show-overflow-tooltip property="payBalance" align="center" label="本次结算额" >
				<template slot-scope="scope">
					<el-input-number :controls="false" size="small" v-model="scope.row.payBalance"  type="number" :disabled="scope.row.disAble" @change="sumBalanceMoney(scope.row)" :precision="2"  placeholder="请输入本次结算额度" />
				</template>
			</el-table-column>
			<el-table-column resizable show-overflow-tooltip property="remark" align="center" label="备注" >
					<template slot-scope="scope" >
						<el-input size="small" v-model="scope.row.remark" :disabled="scope.row.disAble"  placeholder="请输入内容" />
					</template>
				</el-table-column>
			<el-table-column label="操作" align="center" width="100" >
				<template slot-scope="scope">
					<el-button size="mini" type="text" :disabled="scope.row.disAble" @click="deleteRow(scope.$index,scope.row)">移除</el-button>
				</template>
			</el-table-column>
		</el-table>
		</div>
			<el-table ref="table" height="200" :data="tableData" style="width: 100%" v-if='detail=="detail"'>
			<el-table-column resizable show-overflow-tooltip property="orderCode" align="center" label="订单号" />
			<el-table-column resizable show-overflow-tooltip property="orderTime" align="center" label="下单时间" width="110" />
			<el-table-column resizable show-overflow-tooltip property="orderMoney" align="center" label="订单金额" />
			<el-table-column resizable show-overflow-tooltip align="center" label="已结算总额" property="payBalance">
			</el-table-column>
			<el-table-column resizable show-overflow-tooltip property="noPayBalance" align="center" label="未结算总额" >	 	 
				 <template slot-scope="scope"  >			 
			 	{{scope.row.orderMoney-scope.row.payBalance}}  	 
				</template>  
				</el-table-column>
			<el-table-column resizable show-overflow-tooltip property="payBalance" align="center" label="本次结算额" >
				<template slot-scope="scope">
					<el-input-number :controls="false" size="small" v-model="scope.row.payBalance"  type="number" :disabled="scope.row.disAble" :precision="2"  placeholder="请输入本次结算额度" />
				</template>
			</el-table-column>
			<el-table-column resizable show-overflow-tooltip property="remark" align="center" label="备注" >
					<template slot-scope="scope" >
						<el-input size="small" v-model="scope.row.remark" :disabled="scope.row.disAble"  placeholder="请输入内容" />
					</template>
				</el-table-column>
			<el-table-column label="操作" align="center" width="100" >
				<template slot-scope="scope">
					<el-button size="mini" type="text" :disabled="scope.row.disAble" >移除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		orderList
	} from '../../../api/trademgr-ordermgr.js'
	export default {
		props: ['form','tableData','detail','mod'],
		data() {
			return {
				disabled:false,
				noprice:'',
			    price:'',
				tableData1:[],
				orderArr:[],
				addOrderParam:{
				}
			};
		},
		methods: {
        sumBalanceMoney(row){
		  if(row.payBalance==''||row.payBalance==null){
			   row.payBalance=0
		  }

	      row.sumBalanceMoney = parseInt(this.price)+parseInt(row.payBalance)
	      row.noPayInvoice=parseInt(this.noprice)-parseInt(row.payInvoice)
		  let sum = 0
		  this.tableData1.forEach(item=>{
          sum += item.payBalance;
		  })
		  this.form.balanceMoney=sum
      },
			queryOrderList(keyword){
			  this.orderArr=[]
				if(this.form.providerId==null||this.form.providerId==0){
					this.$message({
						message: '请选择服务商',
						type: 'warning'
					});
					return;
				}else{
					orderList({
						Vue: this,
						params: {
							status:'交易中',
							orderCode:keyword,
							providerId: this.form.providerId
						}
					}).then(res => {
						if (res.result) {
							this.orderArr = res.model
						}
					})
				}
			},
			addOrder(){
				if(this.addOrderParam.orderId==null||this.addOrderParam.orderId==0){
					this.$message({
						message: '请输入订单号进行搜索',
						type: 'warning'
					});
					return;
				}else{
					let orderTemp ={...this.orderArr.filter(item =>item.id==this.addOrderParam.orderId)[0]}
					orderTemp.noPayBalance =orderTemp.orderActualMoney - orderTemp.sumBalanceMoney
					delete orderTemp.sumInvMoney;
                    this.price = orderTemp.sumBalanceMoney
					delete orderTemp.sumDeliveryAmount;   
					this.tableData1.splice(0,0,orderTemp);
				 if(this.addOrderParam.orderId==orderTemp.id){
                 this.disabled=true
            }
				}
				this.addOrderParam.orderId=''
				this.$emit('callback',this.tableData1)
			},
		deleteRow(index, row) { //移除
		console.log(row,'row')
			if (row.id == null || row.id == 0)
			this.tableData1.splice(index, 1);
			else
			this.tableData1.splice(index, 1);
			/* this.$set(this.tableData1[index], 'deleted', true); */
		}
		}
	}
</script>

