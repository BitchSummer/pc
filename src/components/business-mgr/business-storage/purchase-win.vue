<!--
  规格配置
 -->

<template>
<toast :config="winConfig" @close="winConfig.dialogVisible=false;" @doSave="doSave" >
		<el-form :model="form" ref="form" :rules="rules" label-width="120px" class="view-form">
			<el-form-item label="月度容量(GB):" prop="monthCapacity">
				<el-input-number size="mini" v-model="form.monthCapacity" :controls="false" @change="capactityChange"></el-input-number>
			</el-form-item>
					<el-form-item label="已分配(GB):" >
						{{form.allotCapacity}}
					</el-form-item>
					<el-form-item label="已使用(GB):" >
						{{form.usedCapacity}}
					</el-form-item>
					<el-form-item label="参考单价(元/GB):">
						{{form.price}}
					</el-form-item>
					<el-form-item label="参考价(元):" >
						{{form.sumPrice}}
					</el-form-item>
				
		</el-form>
	</toast>
</template>

<script>
	import {
		sumbitPurchaseApply
	} from '../../../api/businessmgr-businessstorage.js'
	export default {
		props: ['form'],
		data(){
			return {
				rules:{
					monthCapacity: [{
						required: true,
						message: '请输入月度容量(GB)',
						trigger: 'change'
					}]
				},
				winConfig: { //办结弹窗数据
					title: "云存储申购", //弹窗标题
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
				if(this.$refs['form']!=undefined){
          this.$refs['form'].resetFields();
        }
			},
			capactityChange(){
				this.form.sumPrice = (this.form.price*this.form.monthCapacity).toFixed(2);
				if(this.form.monthCapacity<this.form.allotCapacity){
					 this.$message({
						message: '月度容量应大于已分配容量',
						type: 'warning'
					});
					return;
				}
			},
			doSave() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if(this.form.monthCapacity<this.form.allotCapacity){
							this.$message({
								message: '月度容量应大于已分配容量',
								type: 'warning'
							});
							return;
						}
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
