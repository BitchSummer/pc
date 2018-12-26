<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="110px">
		<el-row :gutter="4">
			<el-col :span="8">
				<el-form-item label="申请时间:" prop="applyTime">
					<el-date-picker size="small" v-model="form.applyTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
					 placeholder="请选择申请时间">
					</el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="申请人:" prop="applyUser">
					<el-input size="small" v-model="form.applyUser" placeholder="请输入申请人" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="服务商:" prop="providerId">
					<el-select size="small" v-model="form.providerId" @change="changeLabel" filterable remote reserve-keyword placeholder="请输入服务商搜索"
					 :remote-method="queryProviderList">
						<el-option v-for="item in providerArr" :key="item.providerId" :label="item.providerName" :value="item.providerId">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="票据类型:" prop="invoiceType" style="margin-top:12px">
					<el-select size="small" v-model="form.invoiceType" placeholder="请选择票据类型">
						<el-option v-for="item in invoiceTypeOptions" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="票据金额:" style="margin-top:12px" prop='invoiceMoney'>
					<el-input size="small" v-model="form.invoiceMoney" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="开票信息:" prop="invoiceAddrId" style="margin-top:12px">
					<el-select size="small" v-model="form.invoiceAddrId" placeholder="请选择开票信息" @change="doInvoiceAddrChange">
						<el-option v-for="item in invoiceAddrs" :key="item.id" :label="item.title" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="开票详情:" style="margin-top:12px" prop='invoiceAddrStr'>
					<el-input size="small" v-model="form.invoiceAddrStr" disabled type="textarea" :rows="2" />
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="备注:" style="margin-top:12px" prop="remark">
					<el-input size="small" v-model="form.remark" placeholder="请输入内容" type="textarea" :rows="2" />
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
		props: ['form', 'invoiceAddrs'],
		data() {
			return {
				invoiceTypeOptions: [{
					value: '增值税发票'
				}, {
					value: '普通发票'
				}],
				providerArr: [],
				rules: {
					applyTime: [{
						required: true,
						message: '请选择申请时间',
						trigger: 'change'
					}],
					applyUser: [{
						required: true,
						message: '请输入申请人',
						trigger: 'blur'
					}],
					providerId: [{
						required: true,
						message: '请选择服务商',
						trigger: 'change'
					}],
					invoiceType: [{
						required: true,
						message: '请选择票据类型',
						trigger: 'change'
					}],
					invoiceAddrId: [{
						required: true,
						message: '请选择开票信息',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			empty(){
				if(this.$refs['form']!=undefined){
					this.$refs['form'].resetFields()
				}
			},
			changeLabel(value){
			var index=this.providerArr.findIndex(val=>val.providerId==value)
			if(index>=0)
				this.form.providerName=this.providerArr[index].providerName
			},
			doSave() {
				this.$refs.form.validate((valid) => {
					if(valid){
						this.$emit('callback')
					}	
				});
			},
			doInvoiceAddrChange(value, a) {
				let invoiceAddr = this.invoiceAddrs.filter(item => item.id == value)[0];
				this.$set(this.form, 'invoiceAddrStr', "票据抬头:" + invoiceAddr.title + ';' + "纳税人识别码:" + invoiceAddr.code + ';' +
					"地址:" + invoiceAddr.address + ';' + "电话:" + invoiceAddr.phone + ';' + "开户银行:" + invoiceAddr.bank + ';' + "开户帐号:" +
					invoiceAddr.accountNo)
			},
			setProviderArr(providerArr){
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
