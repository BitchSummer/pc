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
				<el-table-column label="序号" width="50" >
					<template slot-scope="scope">
						<span style="text-align:center;width:100%;display:block;">{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip property="authStatus" align="center" label="流程状态" width="100">
					<template slot-scope="scope">
						<el-tag size="medium" :type="scope.row.authStatus=='已申购'?'success':scope.row.authStatus=='待申购'?'warning':scope.row.authStatus=='申购失败'?'danger':'info'">{{ scope.row.authStatus }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip property="applyTime" align="center" label="申购时间" width="180" />
				<el-table-column resizable show-overflow-tooltip property="purchaseCount" align="center" label="申购数量(条)" width="100"/>
				<el-table-column resizable show-overflow-tooltip property="price" align="center" label="资费单价(元/条)" width="100"/>
				<el-table-column resizable show-overflow-tooltip property="sumPrice" align="center" label="资费总价(元)" width="100"/>
				<el-table-column resizable show-overflow-tooltip property="validDate" align="center" label="生效时间" width="120"/>
				<el-table-column resizable show-overflow-tooltip property="authRemark" align="center" label="备注" />
				<el-table-column label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button size="mini" type="text" :disabled="scope.row.authStatus!='待申购'" @click="doEdit(scope.row)">重新申购</el-button>
						<el-button size="mini" type="text" :disabled="scope.row.authStatus!='待申购'" @click="doDel(scope.row.id)">删除</el-button>
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
		purchaseRecordList,
		deletePurchaseApply
		} from '../../../api/businessmgr-businessmsg.js'
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
			doDel(id) {
				this.$confirm('您确认删除短信申请, 是否继续?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deletePurchaseApply({
						Vue: this,
						params: {
							id: id
						},
					}).then(res => {
						if (res.result) {
							this.doSearch();
						}
					})

				});
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
