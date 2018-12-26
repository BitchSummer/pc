<template>
  <toast :config="winConfig" @doSave="doSave" @close="close">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="140px">
      <el-form-item label="企业名称:" prop="companyName">
        <el-input size="small" v-model="form.companyName" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item label="企业性质:" prop="companyNature">
				<el-select size="small" v-model="form.companyNature" placeholder="请选择企业性质">
					<el-option
						v-for="item in companyNatureOption"
						:key="item.value"
						:label="item.value"
						:value="item.value">
					</el-option>
				</el-select>
      </el-form-item>
			<el-form-item label="企业机构代码:" prop="businessNo">
				<el-input size="small" v-model="form.businessNo" placeholder="请输入企业机构代码"></el-input>
			</el-form-item>
			<el-form-item label="行业领域:" prop="industry">
				<el-select size="small" v-model="form.industry" style="width: 90%;" multiple placeholder="请选择">
					<el-option
						v-for="item in industryOption"
						:key="item.value"
						:label="item.value"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="所在地区:" prop="address1">
				<el-cascader size="small" :options="regionDataPlus" v-model="form.address1" :props="{value:'label'}"  placeholder="请输入所在地区" @change="handleChange"/>
      </el-form-item>
			<el-form-item label="企业地址:" prop="address">
				<el-input size="small" v-model="form.address" placeholder="请输入企业地址" ></el-input>
			</el-form-item>
			<el-form-item label="联系人:" prop="linkMan">
				<el-input size="small" v-model="form.linkMan" placeholder="请输入联系人"></el-input>
			</el-form-item>
      <el-form-item label="联系手机:" prop="linkPhone">
        <el-input size="small" v-model="form.linkPhone" placeholder="请输入联系手机"></el-input>
      </el-form-item>
			<el-form-item label="人员规模:" prop="userCount">
				<el-input size="small" v-model="form.userCount" placeholder="请输入人员规模"></el-input>
			</el-form-item>
			
			 <el-form-item label="企业照片:" prop="imageUrl1">
				 <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadIdImg1"
				 :before-upload="imageUploadCheck">
				 	<img v-if="form.imageUrl1" :src="form.imageUrl1" class="avatar">
				 	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				 </el-upload>
			 </el-form-item>
			 <el-form-item label="入驻费用(元/月):" prop="entryCost">
			 	{{form.entryCost}}
			 </el-form-item>
			 <div style="text-align: center;margin: 10px;">
			 	<el-checkbox v-model="isAgree" @change="isAgreeChange"></el-checkbox> 我已阅读并同意 <span style="color:#409EFF;">隐私协议与诚信协议</span>
			 </div>
    </el-form>
  </toast>
</template>
<script>
    import {
			submitApply
    } from '../../../api/businessmgr-businessentry.js'
		import { imageUploadCheck } from '../../../api/fileupload-base.js'
  import {
    regionDataPlus
  } from 'element-china-area-data'
  export default {
		props: ['form'],
    data() {
			let checkPhone = (rule, value, callback) => {
        var res = /^1([3758][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (value != "") {
          ////console.log(res.test(value))
          if (!res.test(value)) {
            callback(new Error("输入正确手机号！！！"));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
				uploadUrl: 'http://122.225.78.66:8899/fileSystem/uploadFile',
				isAgree:false,
        regionDataPlus:regionDataPlus,
				companyNatureOption:[{
					value:'个体户'
				},{
					value:'私营企业'
				},{
					value:'外资企业'
				},{
					value:'合资企业'
				},{
					value:'国营企业'
				}],
				industryOption:[{
					value:'经编产业'
				},{
					value:'注塑产业'
				},{
					value:'其他'
				}],
        rules: {
          companyName: [{
            required: true,
            message: '请输入企业名称',
            trigger: 'blur'
          }],
          companyNature: [{
            required: true,
            message: '请输入企业性质',
            trigger: 'blur'
          }],
          businessNo: [{
            required: true,
            message: '请输入企业机构编码',
            trigger: 'blur'
          }],
          industry: [{
            required: true,
            message: '请输入行业领域',
            trigger: 'change'
          }],
          address1: [{
            required: true,
            message: '请输入所在地区',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }],
          linkMan: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          linkPhone: [
						{required: true, message: "请输入联系手机", trigger: "change"},
						{validator: checkPhone, required: true, trigger: "change"}
					],
          userCount: [{
            required: true,
            message: '请输入人员规模',
            trigger: 'blur'
          }],
          imageUrl1: [{
            required: true,
            message: '请输入企业照片',
            trigger: 'blur'
          }]
        },
        winConfig: { //办结弹窗数据
          title: "入驻申请", //弹窗标题
          dialogVisible: false, //弹窗显示
          width: "800px", //弹窗宽
          btnData: [{
            name: '取消', //按钮名
            method: 'close', //回调函数
            bgColor: 'dialog-white' //按钮背景
          }, {
            name: '提交申请', //按钮名
            disabled:true,
            method: 'doSave', //回调函数
            bgColor: 'dialog-bule' //按钮背景
          }]
        }
      }
    },
    methods: {
      close(){
        this.$set(this.winConfig,'dialogVisible',false)
      },
      empty(){
        if(this.$refs['form']!=undefined){
          this.$refs['form'].resetFields()
        }
      },
      show() {
        this.winConfig.dialogVisible = true;
      },
      doSave() {
        this.$refs.form.validate((valid) => {
          if (valid) {
						this.$confirm("您确认提交申请？", "系统提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							})
							.then(() => {
                delete this.form.authTime
								submitApply({
                  Vue:this,
                  params:this.form
                  }).then(res=>{
									if(res.result){
										this.winConfig.dialogVisible = false;
										this.$emit('callback');
									}
								})
							})
              
          } 
        });
      },
      isAgreeChange(){
        this.$set(this.winConfig.btnData[1],'disabled',!this.isAgree)
      },
      handleChange() {
        let data = this.form.address1;
				this.$set(this.form,'address',data[0] + data[1] + data[2])
      },
			imageUploadCheck(file){
				return imageUploadCheck(file);
			},
			uploadIdImg1(res, file) {
				if (res.status) {
					this.$set(this.form,'imageUrl1',res.fileUrl)
				}
			}
    }
  }

</script>
<style lang="less">
.el-form-item {
    margin-bottom: 12px;
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
				width: 300px;
				height: 200px;
				line-height: 200px;
				text-align: center;
			}
</style>
