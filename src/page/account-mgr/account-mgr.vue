<template>
	<el-card  class="account-mgr">
	<el-tabs v-model="activeName">
		<el-tab-pane label="实名认证" name="first" >
			<account-form :form="accountForm" @callback="loadAccount"/>
			<auth-form :form="authForm" v-if="accountForm.authType!=''" />
		</el-tab-pane>
	</el-tabs>
	</el-card>
</template>

<script>
	import AccountForm from '../../components/account-mgr/account-mgr/account-form.vue'
	import AuthForm from '../../components/account-mgr/account-mgr/auth-form.vue'
	import { 
		accountInfo,
		authInfo
		 } from '../../api/accountmgr-accountmgr.js'
	export default {
		data() {
			return {
				activeName:'first',
				accountForm:{},
				authForm:{}
			};
		},
		methods:{
			loadAccount(){
				accountInfo({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						this.accountForm = res.model;
						if(this.accountForm.authStatus!='未认证')
							this.loadAuth()
					}
				})
			},
			loadAuth(){
				authInfo({
					Vue: this,
					params: {}
				}).then(res => {
					if (res.result) {
						console.log(res.model)
						this.authForm = res.model;
						console.log(res.model.address)
						let data=res.model.address
				if(data[0]=='全'){
				this.$set(this.authForm,'address',"全部")
				}else if(res.model.area=='undefined'){
				this.$set(this.authForm,'address','')
				}else if(res.model.area=='全部'){
				this.$set(this.authForm,'address','全部')
				}else if(res.model.city=='undefined'){
				this.$set(this.authForm,'address','')
				}else if(res.model.city=='全部'){
				this.$set(this.authForm,'address','全部')
				}
					}
				})
			}
		},
		components: {
			AccountForm,
			AuthForm
		},
		mounted() {
			this.loadAccount();
		}
		
	}
</script>

<style lang="less">
	.account-mgr{
		width:100%;
		h1{
			line-height: 60px;
			margin-left: 16px;
			font-size: 24px;
			font-family:MicrosoftYaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.el-form-item {
			margin-bottom: 5px;
		}
		.operation{
			color: #0D6FF4;
		}
		
		
		
	}

</style>
