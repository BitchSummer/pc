<template>
	<el-row>
		<el-col :span="23">
			<h1>账号信息</h1>
		</el-col>
		<el-col :span="15">
			<el-form ref="form" :model="form" label-width="150px">
				<el-row>
					<el-form-item label="用户名:">
						<el-col :span="15">{{form.userName}}</el-col>
						<el-col :span="8">
							<el-button type="text" icon="el-icon-edit" @click="doReName(form.userName)">修改</el-button>
						</el-col>
					</el-form-item>
					<el-form-item label="邮箱:">
						<el-col :span="15">{{form.email}}</el-col>
						<el-col :span="8">
							<el-button type="text" icon="el-icon-edit" @click="doReEmail(form.email)">修改</el-button>
						</el-col>
					</el-form-item>
					<el-form-item label="手机号码:">
						<el-col :span="15">{{form.phone}}</el-col>
						<el-col :span="8">
							<el-button type="text" icon="el-icon-edit" @click="doRePhone(form.phone)">修改</el-button>
						</el-col>
					</el-form-item>
					<el-form-item label="认证状态:">
						<el-col :span="15" style="color:#409EFF;"><i class="iconfont icon-renzheng"><span>{{form.authStatus}}</span></i></el-col>
						<el-col :span="8" class="operation">
							<el-button type="text" icon="el-icon-edit" @click="goAuth(form.email)">{{form.authStatus=='未认证'?'实名认证':form.authStatus=='认证失败'||form.authStatus=='已认证'?'重新认证':'查看认证'}}</el-button>
						</el-col>
					</el-form-item>
					
					<el-form-item label="保密等级:">
						<el-col :span="15">
							<el-rate v-model="form.secrecyGrade" disabled :icon-classes="['el-icon-minus', 'el-icon-minus', 'el-icon-minus']"
							 void-icon-class="el-icon-minus" :texts="['低', '中', '高']" show-text disabled-void-icon-class="el-icon-minus"
							 :colors="['#99A9BF', '#409EFF', '#409EFF']" style="margin-top:12px">
							</el-rate>
						</el-col>
						<el-col :span="8" class="operation">
							<el-button type="text" icon="el-icon-edit" @click="doRePsw(form.phone)">密码修改</el-button>
						</el-col>
					</el-form-item>
					<el-form-item label="平台角色:">
						<el-col :span="15">{{form.platformRoleNames}}</el-col>
					</el-form-item>
				</el-row>
			</el-form>
		</el-col>
		<el-col :span="9">
			<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadSuccess"
			 :before-upload="imageUploadCheck">
				<img v-if="form.headImgUrl" :src="form.headImgUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				<div class="operation">更换头像</div>
			</el-upload>
		</el-col>
		<go-auth ref="goAuth" @auth="doAuth" />
		<auth-win ref="authWin" @goAuth="goAuth" @callback="callback"/>
		<re-phone ref="rePhone" @callback="callback"/>
		<re-psw ref="rePsw" />

	</el-row>
</template>

<script>
	import GoAuth from './go-auth.vue'
	import AuthWin from './auth-win.vue'
	import RePhone from './re-phone.vue'
	import RePsw from './re-psw.vue'
	import {
		accountReName,
		accountReEmail,
		accountRePhone,
		changeHeadImg
		} from '../../../api/accountmgr-accountmgr.js'
	import { imageUploadCheck } from '../../../api/fileupload-base.js'
	import {uploadUrl} from '../../../api/common.js'
	export default {
		props: ['form'],
		data() {
			return {
				uploadUrl: uploadUrl
			};
		},
		methods: {
			goAuth(){
				this.$refs.goAuth.show();//打开认证选择弹框
			},
			doAuth(authType){//打开实名认证弹框
				this.$refs.authWin.show(authType);
			},
			doRePhone(phone){
				this.$refs.rePhone.show(phone);
			},
			doRePsw(phone){
				this.$refs.rePsw.show(phone);
			},
			doReName(userName){
				console.log(userName,'userName')
				this.$prompt('','用户名修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue:userName,
					inputPattern:/^.{3,20}$/,
					inputErrorMessage: '请输入3-20字符'
				}).then(({ value }) => {
					accountReName({
						Vue: this,
						params: {
							userName: value
						}
					}).then(res => {
						if (res.result) {
							this.form.userName = value;
						}
					})
				});
			},
		doReEmail(email){
				this.$prompt('', '邮箱修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue:email,
					inputPattern: /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,50}$/,
					inputErrorMessage: '邮箱格式不正确(不大于50个字符)'
			}).then(({ value }) => {
				accountReEmail({
				Vue: this,
				params: {email: value}
				}).then(res => {
				if (res.result) {
					this.form.email = value;
				}
				})
			});
				},
			imageUploadCheck(file){
				return imageUploadCheck(file);
			},
			uploadSuccess(res, file) {
				this.$set(this.form,'headImgUrl',res.fileUrl)
				changeHeadImg({
				Vue: this,
				params: {headImgUrl: this.form.headImgUrl}
				}).then(res => {
				console.log(res)
				})
			},
			callback(){
				this.$emit("callback")
			},
	/* 		changeHeadImg(){
              changeHeadImg
			} */
		},
		components: {
			GoAuth,
			AuthWin,
			RePhone,
			RePsw
		}
	}
</script>

<style lang="less">
.real-name-aut .el-icon-minus {
			font-size: 28px;
			font-weight: bolder;
		}
		
		.el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			
			.avatar {
				width:200px;
				height:200px;
			}
		}
		
	.el-upload:hover {
    border-color: #409EFF;
}
</style>
