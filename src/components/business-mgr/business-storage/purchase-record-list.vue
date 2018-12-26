<template>
	<el-card>
		<toolbar>
			<span slot="left">
				<el-input size="small" style="width: 150px;" v-model="queryParam.authRemark" placeholder="备注搜索..."></el-input>
				<el-button icon="el-icon-search" size="small" style="width: 120px;" type="primary" @click="doSearch">查询</el-button>
				<el-button icon="el-icon-close" size="small" style="width: 100px;" @click="queryParam={}">清空条件</el-button>
			</span>
		</toolbar>

		<div>
			<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%" @row-dblclick="doEdit">
				<el-table-column type="index" width="50" />
				<el-table-column resizable show-overflow-tooltip property="authStatus" align="center" label="流程状态" width="100">
					<template slot-scope="scope">
						<el-tag size="medium" :type="scope.row.authStatus=='已生效'?'success':scope.row.authStatus=='待生效'?'warning':scope.row.authStatus=='设置失败'?'danger':'info'">{{ scope.row.authStatus }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip property="applyTime" align="center" label="设置时间" width="180" />
				<el-table-column resizable show-overflow-tooltip property="monthCapacity" align="center" label="月度容量(GB)" width="100"/>
				<el-table-column resizable show-overflow-tooltip property="price" align="center" label="月资单价(元/GB)" width="100"/>
				<el-table-column resizable show-overflow-tooltip property="sumPrice" align="center" label="月度总价(元)" width="100"/>
				<el-table-column resizable show-overflow-tooltip property="validDate" align="center" label="生效时间" width="120"/>
				<el-table-column resizable show-overflow-tooltip property="authRemark" align="center" label="备注" />
				<el-table-column label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button size="mini" type="text" :disabled="scope.row.authStatus!='待生效'" @click="doEdit(scope.row)">重新设定</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="my-pagination">
				<page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
			</div>
		</div>
	</el-card>
</template>
<script>
	import {
		purchaseRecordList
		} from '../../../api/businessmgr-businessstorage.js'
	export default {
		props: ['config'],
		data() {
			return {
				queryParam: {
					// province: ''
				},
				tableData: [],
				page: {
					pageNo: 1,
					pageSize: 10,
					total: 0
				}
			}
		},
		methods: {
			doEdit(row) {
				this.$emit('doApply',row);
			},
			doSearch(page) {
				let param = { ...this.queryParam
				}
				if (page == null || page.pageNo == null) {
					this.page.pageNo = 1
				}
				param.pageNo = this.page.pageNo
				param.pageSize = this.page.pageSize

				purchaseRecordList({
					Vue: this,
					params: param
				}).then(res => {
					if (res.result) {
						this.tableData = res.model.items;
						this.page.total = res.model.numRows
					}
				})
			}
		}
// 		components: {
// 			PurchaseRecordWin
// 		}
	}
</script>
<style lang="less">

</style>
