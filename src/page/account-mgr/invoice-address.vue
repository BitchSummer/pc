<template>
	<el-row class="invoice-address">
		<el-col :span="24"  class="invoice-address-main">
			<el-button type="text" icon="el-icon-edit" class="add-invoice" @click="doAdd">新增开票信息</el-button>
			<el-tabs v-model="activeName">
				<el-tab-pane label="开票信息" name="first">
					<el-card class="box-card" v-for="item in invoiceData">
						<div slot="header" class="clearfix">
							<span>{{item.title}}</span>
							<span class="default-fp" v-if="item.isDefault!=false" >默认发票
							</span>
						    <span class="default-fp" v-else style="display:none">
							</span>
						</div>
						<el-form label-width="110px">
							<el-form-item label="票据抬头:">{{item.title}}</el-form-item>
							<el-form-item label="纳税人识别码:">{{item.code||'无'}}</el-form-item>
							<el-form-item label="地址:">{{item.area+item.address||'无'}}</el-form-item>
							<el-form-item label="电话:">{{item.phone||'无'}}</el-form-item>
							<el-form-item label="开户银行:">{{item.bank||'无'}}</el-form-item>
							<el-form-item label="开户账号:">
								<el-col :span="16">{{item.accountNo||'无'}}</el-col>
								<el-col :span="8" class="to-operation">
									<span  v-if="item.isDefault!=true" @click="setDefault(item.id)">设为默认</span>
									<span @click="doEdit(item)">编辑</span>
									<span @click="doDel(item.id)">删除</span>
								</el-col>
							</el-form-item>
						</el-form>
					</el-card>
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<!-- 添加 编辑 -->
		<invoice-addr-form ref="invoiceAddrForm" :form="form" @callback="doSearch" />
	</el-row>
</template>
<script>
	import {
		invoiceAddrList,
		saveOrUpdateInvoiceAddr,
		deleteInvoiceAddr,
		setDefaultInvoiceAddr
	} from '../../api/accountmgr-invoiceaddress.js'
	import InvoiceAddrForm from '../../components/account-mgr/invoice-address/form-win.vue';
	export default {
		data() {
			return {
				activeName: 'first',
				invoiceData: [],
				form: {}
			}
		},
		mounted() {
			this.doSearch();
		},
		methods: {
			setDefault(id) {
				this.$confirm("您确认设定默认开票信息？", "系统提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						setDefaultInvoiceAddr({
							Vue: this,
							params: {
								id: id
							}
						}).then(res => {
							if (res.result)
								this.doSearch()
						})
					})


			},
			doDel(id) {
				this.$confirm("您确认删除开票信息？", "系统提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						deleteInvoiceAddr({
							Vue: this,
							params: {
								id: id
							}
						}).then(res => {
								if (res.result)
								this.doSearch()
						})
					})
			},
			doEdit(item) {
				console.log(item,item)
				let data=item.area	
				this.form = { 
					id:item.id,
					address1:data,
					title:item.title,
					code:item.code,
					address:item.address,
					phone:item.phone,
					bank:item.bank,
					accountNo:item.accountNo
				},
				this.$refs.invoiceAddrForm.show(item);
			},
			doAdd() {
				this.form = {
					address1: [],
					phone:'',
					bank:'',
					accountNo:'',
					title:'',
					code:'',
					address:'',
					isDefault:false
				}
				this.$refs.invoiceAddrForm.show1();
			},
			doSearch() {
				invoiceAddrList({
					Vue: this,
					param: {}
				}).then(res => {
					if (res.result) {
						this.invoiceData = res.model;
					}
				})
			}
		},
		components: {
			InvoiceAddrForm
		}
	}
</script>
<style lang="less">
	.invoice-address {
		background-color: #f0f2f5;

		.el-tabs__content {
			border: none;
		}

		.invoice-address-main {
			background-color: #fff;
			position: relative;
		}

		.el-tab-pane {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.el-card {
			width: 80%;
			margin: 10px 0;

			.el-form-item {
				margin-bottom: 0;
			}
		}

		.to-operation {
			font-size: 14px;
			color: #0D6FF4;

			span {
				margin-right: 25px;
				cursor: pointer;
			}
		}

		.default-fp {
			background: rgba(255, 159, 0, 1);
			border-radius: 10px;
			font-size: 10px;
			color: #fff;
			display: inline-block;
			vertical-align: middle;
			padding: 3px 8px;
			margin-left: 10px;
		}

		.add-invoice {
			position: absolute;
			right: 15px;
			z-index: 3;
		}
	}
</style>
