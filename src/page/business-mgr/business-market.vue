<template>
	<el-row class="business-market">
		<el-col :span="24" class="business-market-main">
			<el-tabs v-model="activeName">
				<el-tab-pane label="入市申请" name="first">
					<no-auth v-if="!isAuth" />
					<go-business :config="businessConfig" v-if="isAuth&&form==null" @callback="doApply"/>
					<market-form :form="form" v-if="isAuth&&form!=null" :marketArr="marketArr" @btn="btn"/>
					<market-win ref="entryWin" :form ="applyForm" :marketArr="marketArr" @callback="doApply1"/>
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>
<script>
	import NoAuth from "../../components/business-mgr/no-auth.vue";
	import GoBusiness from '../../components/business-mgr/go-business.vue'
	import MarketWin from "../../components/business-mgr/business-market/win.vue";
	import MarketForm from "../../components/business-mgr/business-market/form.vue";
	import {
		accountInfo
	} from '../../api/accountmgr-accountmgr.js'
	import {
		marketClassAndProductClassList
	} from '../../api/businessmgr-marketbase.js'
	import {
		viewApply
	} from '../../api/businessmgr-businessmarket.js'

	export default {
		data() {
			return {
				activeName: 'first',
				businessConfig: {
					title: '您尚未进行入市申请...',
					btnText: '入市申请',
					steps:['入市申请','入市审核','完成入市']
				},
				form: null,
				applyForm:{},
				isAuth: false,
				marketArr:[]
			}
		},
		mounted() {
			this.loadMarketClassAndProcuct();
			this.loadAccount();
		},
		methods: {
			btn(){
				this.doApply()
			},
			loadAccount() {
				accountInfo({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						this.isAuth = res.model.authStatus == '已认证'
						if (this.isAuth)
							this.doSearch();
					}
				})
			},
			loadMarketClassAndProcuct() {
				marketClassAndProductClassList({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						this.marketArr = res.model.marketList
						
					}
				})
			},
			doSearch() {
				viewApply({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						console.log(res.model)
						let form =  res.model;
						form.marketIds = form.marketIds.split(',')

						this.form = form;
						
					}
				})
			},
			doApply1(){
				this.loadAccount()
			},
			doApply(){
				this.applyForm ={
					marketIds:[],
					marketCost:0
				};
				if(this.form!=null){
					this.applyForm = {...this.form}
				}
			
				this.$refs.entryWin.show();
			}
		},
		components: {
			NoAuth,
			GoBusiness,
			MarketWin,
			MarketForm
		}
	}
</script>
<style lang="less">
	.business-market {
		
		background-color: #f0f2f5;

		.el-tabs__content {
			border: none;
		}

		.business-market-main {
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
