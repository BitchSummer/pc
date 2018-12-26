<template>
	<toast :config="toastData" @doSubmit="doSubmit" @doBack="doBack" @close="toastData.dialogVisible=false" class="auth-win">
		<el-row class="authenticaSele">
			<el-col :span="22" :offset="1">
				<el-steps :active="2" align-center>
					<el-step title="认证选择"></el-step>
					<el-step title="认证申请"></el-step>
					<el-step title="认证审核"></el-step>
					<el-step title="完成认证"></el-step>

				</el-steps>
			</el-col>
		</el-row>
		<el-form ref="form" :model="form" :rules="rules" label-width="150px" class="form">
			<h1>{{form.authType}}信息</h1>
			<el-form-item v-if="form.authType=='个人'"  prop="ownerName" label="姓名:">
				<el-input size="small"  v-model="form.ownerName" placeholder="请输入姓名" class="input"></el-input>
			</el-form-item>
			<el-form-item  v-if="form.authType=='企业'" prop="companyName" label="企业名称:">
				<el-input size="small"  v-model="form.companyName" placeholder="请输入企业名称" class="input"></el-input>
			</el-form-item>
			<el-form-item label="企业性质:" prop="companyNature">
				<el-select size="small" v-model="form.companyNature" style="width: 70%;" placeholder="请选择企业性质">
					<el-option v-for="item in companyNatureOption" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="行业领域:" prop="industry">
				<el-select size="small" v-model="form.industry" style="width: 70%;" multiple placeholder="请选择行业领域">
					<el-option v-for="item in industryOption" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="联系人:" prop="linkMan">
				<el-input size="small" v-model="form.linkMan" placeholder="请输入联系人" class="input"></el-input>
			</el-form-item>
			<el-form-item label="联系人手机号码:" prop="linkPhone">
				<el-input size="small" v-model="form.linkPhone" placeholder="请输入联系人手机号码" class="input"></el-input>
			</el-form-item>
			<el-form-item label="所在地区:" prop="address1">
				<el-cascader size="small" :options="regionDataPlus" style="width: 70%;" v-model="form.address1" :props="{value:'label'}"
				@change='handleChange'/>
			</el-form-item>
			<el-form-item label="联系地址:" prop="address">
				<el-input size="small" v-model="form.address" placeholder="请输入联系地址" class="input"></el-input>
			</el-form-item>
			<el-form-item label="企业机构代码:" v-show="form.authType=='企业'" prop='businessNo'>
				<el-input size="small" v-model="form.businessNo" placeholder="请输入企业机构代码" class="input"></el-input>
			</el-form-item>
			<el-form-item label="企业机构代码图片:" class="is-required" v-show="form.authType=='企业'" >
				<el-form-item  prop="imageUrl3" ref='ref2'>
					<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadBusinessImg" v-model="form.imageUrl3"
					 :before-upload="imageUploadCheck">
						<img v-if="form.imageUrl3" :src="form.imageUrl3" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form-item>
			<h1 v-show="form.authType=='企业'">法人信息</h1>
			<el-form-item label="法人姓名:" prop="ownerName"  v-show="form.authType=='企业'">
				<el-input size="small" v-model="form.ownerName" placeholder="请输入法人姓名" class="input"></el-input>
			</el-form-item>
			<el-form-item label="法人电话:" prop="ownerPhone"  v-show="form.authType=='企业'">
				<el-input size="small" v-model="form.ownerPhone" placeholder="请输入法人电话" class="input"></el-input>
			</el-form-item>
			<el-form-item label="证件类型:" prop="ownerIdType">
				<el-select size="small" v-model="form.ownerIdType" placeholder="请选择证件类型">
					<el-option v-for="item in ownerIdOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="证件号码:" prop="ownerIdNo">
				<el-input size="small" v-model="form.ownerIdNo" placeholder="请输入证件号码" class="input"></el-input>
			</el-form-item>

			<el-form-item label="证件图片:" class="is-required" >
				<el-form-item prop="imageUrl1" ref='ref'>
					<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadIdImg1"  v-model="form.imageUrl1"
					 :before-upload="imageUploadCheck"  >
						<img v-if="form.imageUrl1" :src="form.imageUrl1"  class="avatar" >
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
						</el-form-item>
					<el-form-item prop="imageUrl2" ref='ref1'>
					<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadIdImg2"  v-model="form.imageUrl2"
					 :before-upload="imageUploadCheck" >
						<img v-if="form.imageUrl2 " :src="form.imageUrl2" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form-item>
		</el-form>
	</toast>
</template>
<script>
	import {authSubmit} from '../../../api/accountmgr-accountmgr.js'
	import {imageUploadCheck} from '../../../api/fileupload-base.js'
    import {uploadUrl} from '../../../api/common.js'
	import {
		regionDataPlus
	} from 'element-china-area-data'
	import {rule} from '../../../assets/js/rule.js'
	export default {
		data() {
			return {
				companyNatureOption: [{
					value: '个体户'
				}, {
					value: '私营企业'
				}, {
					value: '外资企业'
				}, {
					value: '合资企业'
				}, {
					value: '国营企业'
				}],
				industryOption: [{
					value: '经编产业'
				}, {
					value: '注塑产业'
				}, {
					value: '其他'
				}],
				ownerIdOption: [{
					value: '身份证'
				}, {
					value: '军官证'
				}],
				form: {
					ownerPhone:'',
					ownerName:'',
					address1: [],
					companyNature:'',
					industry:[],
					ownerName:'',
					companyName:'',
					linkMan:'',
					linkPhone:'',
					address:'',
					ownerIdType:'',
					ownerIdNo:'',
		   		    imageUrl1:'',
					imageUrl3:'',
					imageUrl2:'',  
					authType:'',
					businessNo:''
				},
				rules: {
					ownerPhone: [{
						required: true,
						message: '请输入法人电话',
						trigger: 'blur'
					}],
					ownerName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					companyName: [{
						required: true,
						message: '请输入企业名称',
						trigger: 'blur'
					}],
					companyNature: [{
						required: true,
						message: '请选择企业性质',
						trigger: 'change'
					}],
					industry: [{
						required: true,
						message: '请选择行业领域',
						trigger: 'change'
					}],
					linkMan: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}],
					linkPhone: [{
						required: true,
						message: '请输入联系人手机号码',
						trigger: 'blur'
					}],
					address1: [{
						required: true,
						message: '请选择所在地区',
						trigger: 'change'
					}],
					address: [{
						required: true,
						message: '请输入联系地址',
						trigger: 'blur'
					}],
					ownerIdType: [{
						required: true,
						message: '请选择证件类型',
						trigger: 'change'
					}],
					ownerIdNo: [{
						required: true,
						message: '请输入证件号码',
						trigger: 'blur'
					},{  pattern:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
					   message:"证件号码格式不正确",
					   trigger: 'change'
                    }],
				 	imageUrl1: [{
						required: true,
						message: '请上传证件照片',
						trigger: 'change'
					}],  
					imageUrl2: [{
						required: true,
						message: '请上传证件照片',
						trigger: 'change'
					}], 
					imageUrl3: [{
						required: true,
						message: '请上传证件照片',
						trigger: 'change'
					}],  
					businessNo: [{
						required: true,
						message: '请输入企业机构代码',
						trigger: 'blur'
					}],
				},
				toastData: { //办结弹窗数据
					title: "实名认证申请", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "800px", //弹窗宽
					btnData: [{
						name: '上一步', //按钮名
						bgColor: 'dialog-white',
						method: 'doBack', //回调
					}, {
						name: '提交申请', //按钮名
						method: 'doSubmit', //回调函数
						bgColor: 'dialog-bule' //按钮背景
					}]
				},
				regionDataPlus: regionDataPlus,
				options: [],
				uploadUrl:uploadUrl
			}
		},
		methods: {
			show(authType) {//打开实名认证弹框
		  		this.form.authType = authType;  
				this.$nextTick(()=>{
					  if(this.$refs['form']!=undefined){
						this.$refs['form'].clearValidate()
					  	this.$refs['form'].resetFields()  
				}  
				this.toastData.dialogVisible = true;
				})
			},
			doSubmit() {
				if(this.form.authType=='个人'){
					delete this.rules.imageUrl3
					delete this.rules.businessNo
					delete this.rules.ownerPhone
				this.$refs.form.validate((valid) => {
					if (valid) {
						authSubmit({
							Vue: this,
							params: this.form
						}).then(res => {
							if (res.result) {
								this.toastData.dialogVisible = false;
								this.$emit('callback');
							}
						})
					}
				});
				}else
				this.$refs.form.validate((valid) => {
					if (valid) {
						authSubmit({
							Vue: this,
							params: this.form
						}).then(res => {
							if (res.result) {
								this.toastData.dialogVisible = false;
								this.$emit('callback');
							}
						})
					}
				});
			},
			doBack(authType) {
				this.toastData.dialogVisible = false;
				this.$emit('goAuth');
			},
 		handleChange(data) {
				this.form.area = data[2];
				this.form.city = data[1];
				this.form.province = data[0];
			/* 	if(data[0]=='全部'){
				this.$set(this.form,'address',data[0])
				}else if(data[1]=='全部'){
				this.$set(this.form,'address',data[0]+data[1])
				}else{
				this.$set(this.form,'address',data[0] + data[1] + data[2])
				} */
			}, 
			uploadIdImg1(res, file) {
					this.$set(this.form,'imageUrl1',res.fileUrl)
					this.$refs.ref.clearValidate()
			},
			uploadIdImg2(res, file) {
					this.$set(this.form,'imageUrl2',res.fileUrl)
					this.$refs.ref1.clearValidate()
			},
			uploadBusinessImg(res, file) {
					this.$set(this.form,'imageUrl3',res.fileUrl)
					this.$refs.ref2.clearValidate()
			},
			imageUploadCheck(file){
				return imageUploadCheck(file);
			}
		}
	}
</script>
<style lang="less">
	.auth-win {
		.authenticaSele {
			margin: 20px;
		}

		.form {
			.input {
				width: 70%;
			}

			.el-form-item {
				margin-bottom: 6px;
			}
			.el-form-item__error {
				color: #f56c6c;
				font-size: 12px;
				top: 13px;
				left: 435px;
// 				line-height: none;
// 				padding-top: none;
// 				position: none;
// 				top: none;
// 				left: none;
			}
		}

			.avatar-uploader {
				float: left;
				padding-left: 10px;

				.el-upload {
					border: 1px dashed #d9d9d9;
					border-radius: 6px;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}

				.el-upload:hover {
					border-color: #409EFF;
				}
			}


			.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 178px;
				height: 178px;
				line-height: 178px;
				text-align: center;
			}
		}
</style>
