<template>
	<toast :config="winConfig" @doSave="doSave" @close="winConfig.dialogVisible=false" class="invoice-win">
		<el-card>
		<invoice-form ref="form" :form="form" :invoiceAddrs="invoiceAddrs" @callback="doSubmit"/>
		</el-card>
		<el-card style="margin: 10px auto;">
		<invoice-detail-list :form="form" :tableData="tableData" ref="invoiceDetailList"/>
		</el-card>
	</toast>
</template>
<script>
	import {
    invoiceApply
	} from '../../../api/trademgr-invoicemgr.js'
	import {
	invoiceAddrList
	} from '../../../api/accountmgr-invoiceaddress.js'
	import InvoiceForm from './invoice-form.vue'
	import InvoiceDetailList from './invoice-detail-list.vue'
	export default {
		data() {
			return {
				count:'',
				form:{
					applyTime:'',
					applyUser:'',
					providerId:'',
					invoiceType:'',
					invoiceMoney:'',
					invoiceAddrId:'',
					invoiceAddrStr:'',
					remark:'',
				},
				tableData: [],
				invoiceAddrs:[],
				winConfig: { //办结弹窗数据
					title: "开票申请", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "1300px", //弹窗宽
					btnData: [{
						name: '取消', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white', //按钮背景

					}, {
						name: '提交申请', //按钮名
						method: 'doSave', //回调函数
						bgColor: 'dialog-bule' //按钮背景
					}]
				}
			}
		},
		methods: {
			show() {
				invoiceAddrList({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						this.invoiceAddrs = res.model;
						//this.form = form;
						this.winConfig.dialogVisible = true;	 
					}
				 	this.$nextTick(()=>{
						this.$refs['form'].empty()
					})  
					this.tableData=[]
				})
			},
			doSave() {
				this.$refs.form.doSave();
			},
			doSubmit(){		
 				this.$confirm("您确认提交申请？", "系统提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						let param = {...this.form};
						param.detailList = this.tableData;
						param.orderCount=this.tableData.length
						let a=0;
						for(let item in this.tableData){
						param.detailList[item].orderId=this.tableData[item].id
                        a+=this.tableData[item].payInvoice;
            		}
					param.invoiceMoney=a;
					invoiceApply({
									Vue: this,
									params: param
								}).then(res => {
									if (res.result) {
						this.winConfig.dialogVisible = false;
						this.$emit('callback');
					}
					})
				})
 
			}
		},
		components:{
			InvoiceForm,
			InvoiceDetailList
		}
	}
</script>
<style lang="less">
	.invoice-win{
		.el-form-item {
			margin-bottom: 12px;
		}
		.el-card__body {
			padding: 0px;
		}
	}

</style>
