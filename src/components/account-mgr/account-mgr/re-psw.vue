<template>
	<toast :config="toastData" @doSave="doSave" @close="toastData.dialogVisible=false">

		<el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
			<el-form-item label="旧密码:" props="oldPsw">
				<el-input size="small" v-model="form.oldPsw" placeholder="请输入旧密码"></el-input>
			</el-form-item>
			<el-form-item label="新密码:">
				<el-input size="small" v-model="form.newPsw" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码:">
				<el-input size="small" v-model="form.password" placeholder="请输入确认密码"></el-input>
			</el-form-item>

		</el-form>

	</toast>
</template>
<script>
	import {
		accountRePsw
	} from '../../../api/accountmgr-accountmgr.js'
	export default {
		data() {
			return {
				form: {
					oldPsw: '',
					phone: '',
					newPsw: '',
					password: ''
				},
				rules: {
					oldPsw: [{
							required: true,
							message: '请输验证码',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 6,
							message: '长度在 4 到 10 个字符',
							trigger: 'blur'
						}
					],
					newPsw: [{
							required: true,
							message: '请输验证码',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请输入手机号码',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输验证码',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 6,
							message: '长度在 4 到 6 个字符',
							trigger: 'blur'
						}
					]
				},
				toastData: { //办结弹窗数据
					title: "密码修改", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "420px", //弹窗宽
					btnData: [{
						name: '取消', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white' //按钮背景
					}, {
						name: '确认修改', //按钮名
						method: 'doSave', //回调函数
						bgColor: 'dialog-bule' //按钮背景
					}]
				}
			}
		},
		methods: {
			show(phone) {
				this.form = {
					oldPsw: '',
					phone: phone,
					newPsw: '',
					password: ''
				}
				this.toastData.dialogVisible = true;
			},
			doSave() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						accountRePsw({
							Vue: this,
							params: {
								phone: this.form.phone,
								password: this.form.password,
							}
						}).then((data) => {
							this.toastData.dialogVisible = false;
						})
					}
				});
			}
		}
	}
</script>
<style lang="less">

</style>
