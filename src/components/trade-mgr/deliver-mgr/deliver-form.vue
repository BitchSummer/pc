<template>


	<el-form ref="form" :model="form"  label-width="110px">
		<el-row :gutter="4">
			<el-col :span="8">
				<el-form-item label="发货时间:" prop="signOutTime">
					<el-date-picker size="small" v-model="form.deliverTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
					disabled />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="发货人:" prop="signOutUser">
					<el-input size="small" v-model="form.deliverUser" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="客户信息:" >
					<el-input size="small" v-model="form.customerName" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="收货地址:">
					<el-input size="small" v-model="form.deliverAddrStr" disabled type="textarea" :rows="2" />
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="备注:">
					<el-input size="small" v-model="form.remark" disabled type="textarea" :rows="2" />
				</el-form-item>
			</el-col>
		</el-row>

	</el-form>

</template>
<script>
	export default {
		props: ['form']
	}
</script>
