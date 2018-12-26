<template>
	<el-row class="business-storage">
		<el-col :span="24" class="business-storage-main">
			<el-button type="text" icon="el-icon-setting" class="add-apply" @click="doApply()">月度容量设置</el-button>
			<el-tabs v-model="activeName">
				<el-tab-pane label="云存储扩容" name="first" class="tab-panel">
					<no-auth v-if="!isAuth" />
					<go-business :config="businessConfig" v-if="isAuth&&storageForm==null" @callback="doApply" />
					<div v-if="isAuth&&storageForm!=null">
					<el-row :gutter="16">
						<el-col :span="12">
							<el-card>
								<storage-form ref="storageForm" :form="storageForm"/>
							</el-card>
						</el-col>

						<el-col :span="12">
							<el-card>
								<storage-chat />
							</el-card>
						</el-col>
					</el-row>


					<el-tabs v-model="tabActive" @tab-click="tabClick">
						<el-tab-pane label="月度使用" name="month-list">
							<month-list ref="monthList" />
						</el-tab-pane>
						<el-tab-pane label="扩容记录" name="purchase-record">
							<purchase-record-list ref="purchaseRecordList" @doApply="doApply"/>
						</el-tab-pane>
					</el-tabs>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<!-- 短信申购 -->
		<purchase-win :form="purchaseForm" ref="purchaseWin" @callback="doApply1"/>
	</el-row>
</template>
<script>
	import NoAuth from "../../components/business-mgr/no-auth.vue";
	import GoBusiness from '../../components/business-mgr/go-business.vue'
	import StorageChat from '../../components/business-mgr/business-storage/echat.vue'
	import StorageForm from '../../components/business-mgr/business-storage/form.vue'
	import PurchaseRecordList from '../../components/business-mgr/business-storage/purchase-record-list.vue'
	import MonthList from '../../components/business-mgr/business-storage/month-list.vue'
	import PurchaseWin from '../../components/business-mgr/business-storage/purchase-win.vue'
	import {
		viewStorage,
		monthPrice
	 } from '../../api/businessmgr-businessstorage.js'
	 import {
	 	accountInfo
	 } from '../../api/accountmgr-accountmgr.js'
	export default {
		data() {
			return {
				isAuth: false,
				storageForm:{},
				activeName: 'first',
				tabActive: 'month-list',
				purchaseForm:{},
				businessConfig: {
					title: '您尚未云存储申购',
					btnText: '云存储申购',
					steps: ['云存储申购', '申购审核', '云存储使用']
				}
			}
		},
		mounted() {
			this.loadAccount();
		},
		methods: {
			doApply1(){
				this.loadAccount();
				this.tabActive = 'purchase-record'
			},
			loadAccount() {
				accountInfo({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						this.isAuth = res.model.authStatus == '已认证'
						if (this.isAuth) {
							this.doSearch();
						}
					}
				})
			},
			doSearch() {
				viewStorage({
					Vue: this,
					params: {},
				}).then(res => {
					if (res.result) {
						this.storageForm = res.model;
						setTimeout(()=>{
							this.tabClick();
						},0)
					}
				})
			},
			doApply(form){
				if(form==null){
					monthPrice({
						Vue: this,
						params: {}
					}).then(res => {
						if (res.result) {
							if (this.storageForm != null)
								this.purchaseForm={
									price:res.model,
									lastPrice:this.storageForm.price,
									lastMonthCapacity:this.storageForm.monthCapacity,
									usedCapacity:this.storageForm.usedCapacity,
									allotCapacity:this.storageForm.allotCapacity
								};
							else
								this.purchaseForm={
									price:res.model,
									usedCapacity:0,
									allotCapacity:0
								};
							this.$refs.purchaseWin.show()
						}
					})
				}else{
					this.purchaseForm ={...form}
					this.purchaseForm.usedCapacity = this.storageForm.usedCapacity
					this.purchaseForm.allotCapacity = this.storageForm.allotCapacity
					this.$refs.purchaseWin.show()
				}
				
			},
			tabClick() {
				if (this.tabActive == 'month-list')
					this.$refs.monthList.doSearch();
				else
					this.$refs.purchaseRecordList.doSearch();
			}
		},
		components: {
			NoAuth,
			GoBusiness,
			StorageChat,
			StorageForm,
			PurchaseRecordList,
			MonthList,
			PurchaseWin
		}
	}
</script>
<style lang="less">
	.business-storage {
		background-color: #f0f2f5;

		.el-tabs__content {
			border: none;
			position: relative;
		}

		.business-storage-main {
			background-color: white;
			padding-bottom: 30px;
			position: relative;
		}

		.tab-panel {
			margin: 5px 20px;
		}

		.add-apply {
			position: absolute;
			right: 25px;
			top: 3px;
			z-index: 3;
		}
	}
</style>
