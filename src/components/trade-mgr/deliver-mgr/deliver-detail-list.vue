<template>
	<div>
		<el-table ref="table" height="200" :data="tableData" style="width: 100%" >
			<el-table-column type="selection" align="center" width="50" />
			<el-table-column resizable show-overflow-tooltip property="orderCode" align="center" label="订单号" />
			<el-table-column resizable show-overflow-tooltip property="orderTime" align="center" label="下单时间" width="110" />
			<el-table-column resizable show-overflow-tooltip property="productName" align="center" label="产品名称" />
			<el-table-column resizable show-overflow-tooltip property="productSpec" align="center" label="产品规格" />
			<el-table-column resizable show-overflow-tooltip property="orderAmount" align="center" label="订单数量" />
			<el-table-column resizable show-overflow-tooltip property="unit" align="center" label="单位" />
			<el-table-column resizable show-overflow-tooltip property="undeliveredAmount"  align="center" label="未发货数量" />
			<el-table-column resizable show-overflow-tooltip property="deliverAmount" align="center" label="本次发货" />
			<el-table-column resizable show-overflow-tooltip property="remark" align="center" label="备注" />
		</el-table>
	</div>
</template>
<script>
	export default {
		props: ['tableData']
	}
</script>

