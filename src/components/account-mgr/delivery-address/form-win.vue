<template>
  <toast :config="winConfig" @doSave="doSave" @close="winConfig.dialogVisible=false">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <el-form-item label="收货人:" prop="receiver">
        <el-input v-model="form.receiver" placeholder="请输入收货人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone" style="margin-top:20px">
      	<el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="所在地区:" style="margin-top:20px">
        <el-cascader size="large" :options="regionDataPlus" v-model="form.address1" :props="{value:'label'}" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="收货地址:" prop="address" style="margin-top:20px；margin-bottom:20px">
        <el-input v-model="form.address" placeholder="请输入详细地址" ></el-input>
      </el-form-item>
    </el-form>
  </toast>
</template>
<script>
    import {
			saveOrUpdateDeliveryAddr
    } from '../../../api/accountmgr-deliveryaddress.js'
  import {
    regionDataPlus
  } from 'element-china-area-data'
  export default {
		props: ['form'],
    data() {
      return {
        isDefault:false,
        regionDataPlus:regionDataPlus,
        rules: {
          receiver: [{
            required: true,
            message: '请输入收货人',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入收货地址',
            trigger: 'blur'
          }]
        },
        winConfig: { //办结弹窗数据
          title: "编辑收货地址", //弹窗标题
          dialogVisible: false, //弹窗显示
          width: "700px", //弹窗宽
          btnData: [{
            name: '取消', //按钮名
            method: 'close', //回调函数
            bgColor: 'dialog-white' //按钮背景
          }, {
            name: '保存', //按钮名
            method: 'doSave', //回调函数
            bgColor: 'dialog-bule' //按钮背景
          }]
        }
      }
    },
    methods: {
      show(form) {
        this.isDefault=form.isDefault
        this.winConfig.title="编辑收货地址"
        this.winConfig.dialogVisible = true;
      },
      show1(form) {
        this.winConfig.title="新增收货地址"
        this.winConfig.dialogVisible = true;
        this.$nextTick(()=>{
          if(this.$refs['form']!=undefined){
          this.$refs['form'].clearValidate()
				}        
                })
      },
      doSave() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            //校验验证码
          let data = this.form.address1;
          let param = { ...this.form}
           if (data[0]===undefined){
            data[0]='',
            data[1]='',
            data[2]=''
          }else if (data[1]===undefined){
            data[1]=''
            data[2]=''
          }else if (data[2]===undefined){
            data[2]=''
          }
          param.address = data[0]+','+ data[1]+',' + data[2]+' '+this.form.address
          param.isDefault=this.isDefault
            saveOrUpdateDeliveryAddr({Vue:this,params:param}).then(res=>{
            	if(res.result){
								this.winConfig.dialogVisible = false;
								this.$emit('callback');
            	}
            })
              
          } 
        });        
      },
      handleChange() {
        let data = this.form.address1;
/*         if(data[0]=='全部'){
         this.$set(this.form,'address',data[0])
        }else if(data[1]=='全部'){
        this.$set(this.form,'address',data[0]+data[1] )
        }else{
        this.$set(this.form,'address',data[0] + data[1] + data[2])
        } */
      }
    }
  }
</script>
<style lang="less">

</style>
