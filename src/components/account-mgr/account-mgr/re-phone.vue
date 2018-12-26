<template>
    <toast :config="toastData" @doSave="doSave" @close="toastData.dialogVisible=false">

					<el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
						<el-form-item label="旧手机号:">
							{{form.phone}}
						</el-form-item>
						<el-form-item label="验证码:" prop="oldCode">
							<el-row>
								<el-col :span="15">
									<el-input size="small" :disabled="!oldCountBtnDisabled" v-model="form.oldCode" placeholder="请输入验证码" @blur="checkCheckCode('old',form.phone,form.oldCode)"></el-input>
								</el-col>
								<el-col :span="8" :offset="1">
									<el-button type="primary" size="small" @click="sendCode(form.phone,'old')" :disabled="oldCountBtnDisabled">{{oldCountBtnText}}</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="新手机号:" prop="newPhone" style="margin-top:20px;">
							<el-input size="small"  v-model="form.newPhone" :disabled="!checkOld" placeholder="请输入新手机号码"></el-input>
						</el-form-item>
						<el-form-item label="验证码:" prop="newCode" style="margin-top:20px;">
							<el-col :span="15">
								<el-input size="small"  v-model="form.newCode" :disabled="!checkOld||!newCountBtnDisabled" placeholder="请输入验证码" ></el-input>
							</el-col>
							<el-col :span="8" :offset="1">
								<el-button type="primary" size="small" @click="sendCode(form.newPhone,'new')" :disabled="!checkOld||newCountBtnDisabled">{{newCountBtnText}}</el-button>
							</el-col>
						</el-form-item>
						<el-form-item>
							<span style="color:#F56C6C;">注：短信验证码2分钟内有效</span>
						</el-form-item>

					</el-form>
			
    </toast>
</template>
<script>
	import {
		sendCheckCode,
		checkCheckCode,
		accountRePhone
		} from '../../../api/accountmgr-accountmgr.js'
  export default {
    data() {
      return {
        form: {
          oldCode: '',
          phone: '',
          newPhone: '',
          newCode: ''
        },
        rules: {
          oldCode: [{
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
          ],
					newPhone: [{
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
					newCode: [{
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
        oldCountBtnText: '获取验证码',
				newCountBtnText: '获取验证码',
				oldCountBtnDisabled: false,
				newCountBtnDisabled: false,
        checkOld: false,
				checkNew: false,
				timer:null,
				
        toastData: { //办结弹窗数据
          title: "手机号码修改", //弹窗标题
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
      show(phone,form) {
 			 if(this.$refs['form']!=undefined){
          this.$refs['form'].clearValidate()
				}
				this.form = {
          oldCode: '',
          phone: phone,
          newPhone: '',
          newCode: ''
				}
			this.$nextTick(() => {
        this.newCountBtnText= '获取验证码';
				this.oldCountBtnText= '获取验证码';
				this.oldCountBtnDisabled= false;
				this.newCountBtnDisabled= false;
				this.checkOld= false;
				this.checkNew= false;
				})
				
        this.toastData.dialogVisible = true;

      },
      doSave() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            accountRePhone({
              Vue: this,
              params: {
								code: this.form.newCode,
								newPhone:this.form.newPhone
							}
            }).then((data) => {
                this.toastData.dialogVisible = false;
								this.$emit('callback')
            })
          }
				});

      },
			checkCheckCode(type,phone,checkCode){
				checkCheckCode({
					Vue: this,
					params:{
						checkCode:checkCode
					}
				}).then(res => {
					if(res.result){
							if(type=='old'){
								this.checkOld =true;
								this.oldCountBtnText = '重新发送'
								clearInterval(this.timer);
							}else{
								this.checkNew = true;
								this.newCountBtnText = '重新发送'
								clearInterval(this.timer);
							}		
					}
				})
			},
      sendCode(phone,type) {
				if(type=='old'){
						this.oldCountBtnDisabled = true;
				}else{
						this.newCountBtnDisabled = true;
				}
        //获取验证码
        sendCheckCode({
					Vue: this,
						params:{
						phone:phone,
					}
        }).then(res => {
					if(res.result){
						if(type=='old'){
							this.oldCheckCode=res.model;
						}else{
							this.newCheckCode=res.model;
						}
						let expiryTime = 60;
						this.timer = setInterval(() => {
							let data = --expiryTime;
							if(type=='old'){
								this.oldCountBtnText = '重新发送（'+data+')'
								if(data==0){
									this.oldCountBtnText = '重新发送'
									this.oldCountBtnDisabled = false;
									clearInterval(this.timer);
								}
							}else{
								this.newCountBtnText = '重新发送（'+data+')'
								if(data==0){
									this.newCountBtnText = '重新发送'
									this.newCountBtnDisabled = false;
									clearInterval(this.timer);
								}
							}
						}, 1000)
					}
        })
      }
    }
  }

</script>
<style lang="less">

</style>
