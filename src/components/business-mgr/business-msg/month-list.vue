<template>
<el-card>
		<toolbar>
			<span slot="left">
				<el-select size='small' v-model="queryParam.year" placeholder="请选择年度" @change="doSearch">
					<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
			</span>
		</toolbar>
		<div>
			<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%">
				<el-table-column type="#" width="55" />
				<el-table-column resizable show-overflow-tooltip property="year" align="center" label="年度" />
				<el-table-column resizable show-overflow-tooltip property="month" align="center" label="月份" />
				<el-table-column resizable show-overflow-tooltip property="preMonthBalance" align="center" label="上月结余(条)" />
				<el-table-column resizable show-overflow-tooltip property="monthAdd" align="center" label="月度申购(条)" />
				<el-table-column resizable show-overflow-tooltip property="monthUsed" align="center" label="月度发送(条)" />
				<el-table-column resizable show-overflow-tooltip property="monthBalance" align="center" label="月度结余(条)" />
			</el-table>
		</div>
	</el-card>
</template>

<script>
	import {monthMsgList,findYearList} from '../../../api/businessmgr-businessmsg.js'
	export default {
		data() {
			return {
				queryParam:{
					year:'2018'
				},
				options: [],
				tableData: []
			};
		},
		methods:{
			doSearch() {
				let param = { ...this.queryParam
				}
				monthMsgList({
					Vue: this,
					params: param
				}).then(res => {
					if (res.result) {
						this.tableData = res.model;
					}
				})
			},
			findYearList(){
				findYearList({
					Vue:this,
					parmas:{}
				}).then(res=>{
					if(res.result){
						let arr = res.model
						for(let attr in arr){
							this.options.push({
								label:arr[attr],
								value:arr[attr]
							})
						}
					}
				})
			}
		},
		mounted(){
			this.findYearList()
		}
	}
</script>

<style>

</style>
