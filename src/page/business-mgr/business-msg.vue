<template>

	<el-row class="business-msg">
		<el-col :span="24" class="business-msg-main">
			<el-button type="text" icon="el-icon-plus" class="add-apply" @click="doApply()">短信申购</el-button>
			<el-tabs v-model="activeName">
				<el-tab-pane label="短信申购" name="first" class="tab-panel">
					<no-auth v-if="!isAuth" />
					<go-business :config="businessConfig" v-if="isAuth&&msgForm==null" @callback="doApply" />
					<div v-if="isAuth&&msgForm!=null">
						<el-row :gutter="16">
							<el-col :span="12">
								<el-card>
									<msg-form ref="msgForm" :form="msgForm" />
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card>
									<msg-chat />
								</el-card>
							</el-col>
						</el-row>
						<el-tabs v-model="tabActive" @tab-click="tabClick">
							<el-tab-pane label="月度使用" name="month-list">
								<month-list ref="monthList" />
							</el-tab-pane>
							<el-tab-pane label="申购记录" name="purchase-record">
								<purchase-record-list ref="purchaseRecordList" @doApply="doApply" />
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<!-- 短信申购 -->
		<purchase-win :form="purchaseForm" ref="purchaseWin" @callback="doApply1" />
	</el-row>
</template>
<script>
	import NoAuth from "../../components/business-mgr/no-auth.vue";
	import GoBusiness from '../../components/business-mgr/go-business.vue'
	import MsgChat from '../../components/business-mgr/business-msg/echat.vue'
	import MsgForm from '../../components/business-mgr/business-msg/form.vue'
	import PurchaseRecordList from '../../components/business-mgr/business-msg/purchase-record-list.vue'
	import MonthList from '../../components/business-mgr/business-msg/month-list.vue'
	import PurchaseWin from '../../components/business-mgr/business-msg/purchase-win.vue'
	import {
		viewMsg,
		msgPrice
	} from '../../api/businessmgr-businessmsg.js'
	import {
		accountInfo
	} from '../../api/accountmgr-accountmgr.js'
	export default {
		data() {
			return {
				isAuth: false,
				msgForm: null,
				activeName: 'first',
				tabActive: 'month-list',
				purchaseForm: {},
				businessConfig: {
					title: '您尚未短信申购...',
					btnText: '短信申购',
					steps: ['短信申购', '申购审核', '短信发送']
				}
			}
		},
		mounted() {
			this.loadAccount();

		},
		methods: {
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
				viewMsg({
					Vue: this,
					params: {},
				}).then(res => {
					if (res.result) {
						this.msgForm = res.model;
						setTimeout(()=>{
							this.tabClick();
						},0)
					}
				})
			},
			doApply1(){
				this.tabActive = 'purchase-record'
				this.loadAccount();
			},
			doApply(form) {
				console.log(form)
				if (form == null) {
					msgPrice({
						Vue: this,
						params: {}
					}).then(res => {
						if (res.result) {
							this.purchaseForm = {
								price: res.model,
							};
							if (this.msgForm != null)
								this.purchaseForm.balanceCount = this.msgForm.balanceCount
							else
								this.purchaseForm.balanceCount = 0
							this.$refs.purchaseWin.show()

						}
					})
				} else {
					this.purchaseForm = { ...form
					}
					this.purchaseForm.balanceCount = this.msgForm.balanceCount
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
			MsgChat,
			MsgForm,
			PurchaseRecordList,
			MonthList,
			PurchaseWin
		}
	}
</script>
<style lang="less">
	.business-msg {
		background-color: #f0f2f5;

		.el-tabs__content {
			border: none;
			position: relative;
		}

		.business-msg-main {
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
