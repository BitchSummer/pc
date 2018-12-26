<template>
	<div class="auth-form">
		<el-form ref="form" :model="form" label-width="150px" class="form">
			<h1>{{form.authType}}信息</h1>
			<el-form-item :label="form.authType=='个人'?'姓名:':'企业名称'" >
				{{form.authType=='个人'?form.ownerName:form.companyName}}
			</el-form-item>
			<el-form-item label="企业性质:" prop="companyNature">
				{{form.companyNature}}
			</el-form-item>
			<el-form-item label="行业领域:" prop="industry">
				{{form.industry}}
			</el-form-item>
			<el-form-item label="联系人:" prop="linkMan">
				{{form.linkMan}}
			</el-form-item>
			<el-form-item label="联系手机:" prop="linkPhone">
				{{form.linkPhone}}
			</el-form-item>
			<el-form-item label="联系地址:" prop="address">
				{{form.address}}
			</el-form-item>
			<el-form-item label="企业机构代码:" v-show="form.authType=='企业'">
				{{form.businessNo}}
			</el-form-item>
			<el-form-item label="企业机构代码图片:" v-show="form.authType=='企业'">
				<el-form-item prop="imageUrl3">
					<el-row>
					<el-col :span="12"><img class="rz-images" :src="form.imageUrl3" alt=""></el-col>
					</el-row>
				</el-form-item>
			</el-form-item>
			<h1 v-show="form.authType=='企业'">法人信息</h1>
			<el-form-item label="法人姓名:" prop="ownerName"  v-show="form.authType=='企业'">
				{{form.ownerName}}
			</el-form-item>
			<el-form-item label="法人电话:" prop="ownerPhone"  v-show="form.authType=='企业'">
				{{form.ownerPhone}}
			</el-form-item>
			<el-form-item label="证件类型:" prop="ownerIdType">
				{{form.ownerIdType}}
			</el-form-item>
			<el-form-item label="证件号码:" prop="ownerIdNo">
				{{form.ownerIdNo}}
			</el-form-item>
			<el-form-item label="证件图片:" >
				<el-form-item>
					<el-row>
					<el-col :span="6"><img class="rz-images" :src="form.imageUrl1" alt=""></el-col>
					<el-col :span="6"><img class="rz-images" :src="form.imageUrl2" alt=""></el-col>
					</el-row>
				</el-form-item>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	export default {
		props: ['form']
	}
</script>
<style lang="less">
	.auth-form {
		.rz-images{
			margin-left: 20px;
			width: 250px;
			height: 200px;
			margin-top: 10px;
		}
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
