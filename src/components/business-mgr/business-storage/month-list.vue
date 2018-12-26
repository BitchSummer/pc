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
				<el-table-column resizable show-overflow-tooltip property="monthCapacity" align="center" label="月度容量(GB)" />
				<el-table-column resizable show-overflow-tooltip property="usedCapacity" align="center" label="已使用(GB)" />
				<el-table-column resizable show-overflow-tooltip  align="center" label="实际剩余(GB)" >
				<template slot-scope="scope">
					{{scope.row.monthCapacity-scope.row.usedCapacity}}
				</template>
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip property="allotCapacity" align="center" label="已分配(GB)" />
				<el-table-column resizable show-overflow-tooltip  align="center" label="分配剩余(GB)" >
					<template slot-scope="scope">
						{{scope.row.monthCapacity-scope.row.allotCapacity}}
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-card>
</template>

<script>
	import {monthList,findYearList} from '../../../api/businessmgr-businessstorage.js'
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
				monthList({
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
          params:{}
        }).then(res=>{
          if(res.result){
            console.log(res.model)
            var arr = res.model
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
