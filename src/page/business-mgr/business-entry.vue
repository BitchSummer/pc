<template>
	<el-row class="business-entry">
		<el-col :span="24" class="business-entry-main">
			<el-tabs v-model="activeName">
				<el-tab-pane label="入驻申请" name="first">
					<no-auth v-if="!isAuth" />
					<go-business :config="businessConfig" v-if="isAuth&&form==null" @callback="doApply"/>
					<entry-form :form="form" v-if="isAuth&&form!=null" @btn="btn"/>
					<entry-win ref="entryWin" :form ="applyForm" @callback="doApply1" @close="close"/>
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>
<script>
	import NoAuth from "../../components/business-mgr/no-auth.vue";
	import GoBusiness from '../../components/business-mgr/go-business.vue'
	import EntryWin from "../../components/business-mgr/business-entry/win.vue";
	import EntryForm from "../../components/business-mgr/business-entry/form.vue";
	import {
		accountInfo
	} from '../../api/accountmgr-accountmgr.js'
	import {
		viewEntry
	} from '../../api/businessmgr-businessentry.js'

	export default {
		data() {
			return {
				activeName: 'first',
				businessConfig: {
					title: '您尚未进行入驻申请',
					btnText: '入驻申请',
					steps:['入驻申请','入驻审核','完成入驻']
				},
				form: null,
				applyForm:{},
				isAuth: false
			}
		},
		mounted() {
			this.loadAccount();
		},
		methods: {
			btn(){
				this.$nextTick(()=>{
					this.doApply()
				})
			},
			close(){
				this.$refs['entryWin'].winConfig.dialogVisible=false
				this.$refs['entryWin'].empty()
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
			doSearch() {
				viewEntry({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						if(res.model.industry){
							res.model.industry=res.model.industry.split(',');
						}else{
							res.model.industry=[]
						}
						this.form = res.model;
					}
				})
			},
			doApply1(){
				this.loadAccount();
			},
			// 新增
			doApply(){
				// this.applyForm ={};
				if(this.form!=null){
					this.applyForm = {...this.form}
				}
				// console.log(this.form)
				this.$refs['entryWin'].empty()
				
				
				this.$refs.entryWin.show();
			}
		},
		components: {
			NoAuth,
			GoBusiness,
			EntryWin,
			EntryForm
		}
	}
</script>
<style lang="less">
	.business-entry {
		background-color: #f0f2f5;

		.el-tabs__content {
			border: none;
		}

		.business-entry-main {
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
