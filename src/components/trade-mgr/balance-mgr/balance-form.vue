<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="110px" @doSave="doSave">
    <el-row :gutter="4">
      <el-col :span="8">
        <el-form-item label="签发时间:" prop="signOutTime">
          <el-date-picker size="small" v-model="form.signOutTime" :disabled="detail=='detail'" type="date"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          placeholder="请选择签发时间">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="签发人:" prop="signOutUser">
          <el-input size="small" v-model="form.signOutUser" :disabled="detail=='detail'" placeholder="请输入签发人"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="服务商:" prop="providerId">
          <el-select size="small" v-model="form.providerName" :disabled="detail=='detail'" @change="changeLabel" filterable
                     remote reserve-keyword placeholder="请输入服务商搜索"
                     :remote-method="queryProviderList">
            <el-option v-for="item in providerArr" :key="item.providerId" :label="item.providerName"
                       :value="item.providerId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="付款方式:" prop="balanceType" style="margin-top:12px">
          <el-select size="small" v-model="form.balanceType" :disabled="detail=='detail'" placeholder="请选择付款方式">
            <el-option v-for="item in balanceTypeOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结算金额:" style="margin-top:12px" prop="balanceMoney">
          <el-input size="small" :disabled="detail=='detail'" v-model="form.balanceMoney" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注:" style="margin-top:12px" prop='remark'>
          <el-input size="small" :disabled="detail=='detail'" v-model="form.remark" placeholder="请输入备注" type="textarea"
                    :rows="2"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
  import {
    providerList
  } from '../../../api/trademgr-ordermgr.js'
  export default {
    props: ['form','detail'],
    data() {
      return {
        balanceTypeOptions: [{
          value: '银行转账'
        }, {
          value: '现金支付'
        }, {
          value: '其他'
        }],
        providerArr: [],
        rules: {
          signOutTime: [{
            required: true,
            message: '请输入签发时间',
            trigger: 'blur'
          }],
          signOutUser: [{
            required: true,
            message: '请输入签发人',
            trigger: 'change'
          }],
          providerId: [{
            required: true,
            message: '请输入服务商',
            trigger: 'change'
          }],
          balanceType: [{
            required: true,
            message: '请选择付款方式',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      empty(){
		  		if(this.$refs['form']!=undefined){
          this.$refs['form'].clearValidate()
				}  
			},
      changeLabel(value) {
        var index = this.providerArr.findIndex(val => val.providerId == value)
        if (index >= 0)
          this.form.providerName = this.providerArr[index].providerName
          this.form.providerId = value;
      },
      doSave(form){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('callback')
          }
        });
      },
      setProviderArr(providerArr) {
        this.providerArr = providerArr;
      },
      queryProviderList(providerName) {
        providerList({
          Vue: this,
          params: {
            providerName: providerName
          }
        }).then(res => {
          if (res.result) {
            this.providerArr = res.model
          }
        })
      }
    }
  }
</script>
