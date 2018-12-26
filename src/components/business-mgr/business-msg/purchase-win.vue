<!--
  规格配置
 -->

<template>
<toast :config="winConfig" @close="winConfig.dialogVisible=false;" @doSave="doSave" >
		<el-form :model="form" ref="form" :rules="rules" label-width="120px" class="view-form">
					<el-form-item label="当前剩余(条):" >
						{{form.balanceCount}}
					</el-form-item>
					<el-form-item label="申购数量(条):" prop="purchaseCount">
						<el-input-number size="mini" v-model="form.purchaseCount" :controls="false" @change="form.sumPrice = (form.price*form.purchaseCount).toFixed(2)"></el-input-number>
					</el-form-item>
					<el-form-item label="资费单价(元/条):">
						{{form.price}}
					</el-form-item>
					<el-form-item label="资费总价(元):" >
						{{form.sumPrice}}
					</el-form-item>
				
		</el-form>
	</toast>
</template>

<script>
	import {
		sumbitPurchaseApply
	 } from '../../../api/businessmgr-businessmsg.js'
	export default {
		props: ['form'],
		data(){
			return {
				rules:{
					purchaseCount: [{
						required: true,
						message: '请输入申购数量(条)',
						trigger: 'change'
					}]
				},
				winConfig: { //办结弹窗数据
					title: "短信申购", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "500px", //弹窗宽
					btnData: [{
						name: '取消', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white' //按钮背景
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
				this.winConfig.dialogVisible = true;
				if (this.$refs['form'] !== undefined) {
				this.$refs['form'].resetFields();
				}
					},
			doSave() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						sumbitPurchaseApply({
							Vue: this,
							params: this.form
						}).then(res => {
							if (res.result) {
								this.winConfig.dialogVisible = false;
								this.$emit("callback");
							}
						})
					}
				});
			}
		}
	}
</script>
<style lang="less">
	.view-form {
		margin: auto 20px;

		h1 {
			font-size: 15px;
			margin: 15px auto;
		}

		.el-form-item {
			margin-bottom: 5px;
		}
	}
</style>
