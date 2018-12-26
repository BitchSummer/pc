<template>
	<div class="business-market-form">

	<el-steps :active="form.status=='已入市'?3:form.status=='待入市'?1:0" finish-status="success" simple style="margin: 20px">
		<el-step title="入市申请" ></el-step>
		<el-step title="入市审核" ></el-step>
		<el-step title="完成入市" ></el-step>
	</el-steps>
	<h1>{{form.status=='待入市'?'您的申请已提交，我们会第一时间进行处理':form.status=='已入市'?'恭喜您加入我们平台商户大家庭':'审核意见：'+form.authRemark}}</h1>
		<el-form :model="form" status-icon ref="form" label-width="140px">
			<div class="transfer-body">
				<el-transfer v-model="form.marketIds" :data="marketArr" :titles="titles" :props="props" disabled/>
			</div>
			
			<el-form-item label="入市费用(元/月):" prop="entryCost">
				{{form.marketCost}}	
			</el-form-item>
			<el-form-item size="small" >
				<el-button type="primary" :disabled="form.status=='待入市'" @click="btn">申请变更</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {
		submitApply
	} from '../../../api/businessmgr-businessmarket.js'
	export default {
		props: ['form','marketArr'],
		data() {
			return {
				props:{
				  key: 'id',
				  label: 'alias'
				},
				titles: ['市场选择', '已选市场']
			}
		},
		methods: {
			btn(){
				this.$emit('btn')
			}
		}
	}
</script>
<style lang="less">
	.business-market-form{
		.el-checkbox__inner{
			display: none;
		}
		.el-transfer__buttons{
			display: none;
		}
		.el-transfer-panel{
			margin-left: 60px;
		}
		h1{
			line-height: 80px;
			font-size: 18px;
			color: #333;
			margin-left: 111px;
		}
		
		.el-form-item {
			margin-bottom: 12px;
		}
		.transfer-body{
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20px;
		}
	}
	
</style>
