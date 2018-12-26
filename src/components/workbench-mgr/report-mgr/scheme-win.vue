<template>
	<toast :config="winConfig" @close="winConfig.dialogVisible=false">
		<classified-search :config="classifiedConfig" :selected="selectedItems" @doSelectHandler="doClickHandler" />
		<toolbar style="margin: 10px auto;">
			<span slot="left">
				<el-button icon="el-icon-search" size="small" type="danger" @click="doPlayReady">播放方案</el-button>
			</span>
			<span slot="right">
				<el-button icon="el-icon-plus" size="small" type="primary" v-show="!editModel" @click="doAdd">新增方案</el-button>
				<el-button icon="el-icon-edit" size="small" v-show="!editModel" @click="doEdit">编辑</el-button>
				<el-button icon="el-icon-close" size="small" v-show="!editModel" @click="doDel">删除</el-button>
				<el-button icon="el-icon-check" size="small" v-show="editModel" @click="doSave">保存</el-button>
				<el-button icon="el-icon-back" size="small" v-show="editModel" @click="doSearch">返回</el-button>
			</span>
		</toolbar>
		<el-card>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="方案名称" prop="alias">
					<el-input size="small" v-model="form.alias" :disabled="!editModel"></el-input>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" :highlight-current-row="false" style="width: 98%;margin: 0px auto;">
				<el-table-column align="center" label="当前看板">
					<template slot-scope="scope">
						<el-select v-model="scope.row.reportId" placeholder="请选择" :disabled="!editModel" size="small" @change="checkScheme(scope.row.reportId,scope.$index)">
							<el-option-group v-for="folder in folderNames" :key="folder" :label="folder">
								<el-option v-for="report in folderReportMap.get(folder)" :key="report.id" :label="report.reportName" :value="report.id">
								</el-option>
							</el-option-group>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column align="center" label="停留时间(秒)" width="110">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remainSecond" size="small" :disabled="!editModel"></el-input>
					</template>
				</el-table-column>
				<el-table-column align="center" label="下一看板">
					<template slot-scope="scope">
						<el-select v-model="scope.row.nextReportId" placeholder="请选择" :disabled="!editModel" size="small" >
							<el-option-group v-for="folder in folderNames" :key="folder" :label="folder">
								<el-option v-for="report in folderReportMap.get(folder)" :key="report.id" :label="report.reportName" :value="report.id">
								</el-option>
							</el-option-group>
						</el-select>
					</template>
				</el-table-column>
				
				<el-table-column align="center" label="首播标识" prop="isFirstPaly" width="100"/>
				

				<el-table-column width="200" align="center" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="doAddRow(scope.$index)" :disabled="!editModel">新增行</el-button>
						<el-button size="mini" type="text" @click="doDelRow(scope.$index)" :disabled="!editModel">删除行</el-button>
						<el-button size="mini" type="text" @click="setFirst(scope.$index)" :disabled="!editModel||scope.row.isFirstPaly=='是'||scope.row.reportId==null">设置首播</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</toast>
</template>
<script>
	import {
		schemeList,
		schemeDetailList,
		saveOrUpdateScheme,
		deleteScheme
	} from '../../../api/workbenchmgr-reportmgr.js'
	export default {
		props: ['folderNames', 'folderReportMap','reportList'],
		data() {
			return {
				editModel: false,
				//筛选数据
				classifiedConfig: [{
					title: '轮播方案:',
					options: []
				}],
				selectedItems: [{
					value: '',
					expanded: false
				}],
				form: {},
				emptyRow: {
					remainSecond: 10,
					isFirstPaly:'否'
				},
				rules: {
					alias: [{
						required: true,
						message: '请输入方案名称',
						trigger: 'blur'
					}]
				},
				tableData: [],
				winConfig: { //办结弹窗数据
					title: "轮播方案维护", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "1000px", //弹窗宽
					btnData: [{
						name: '关闭窗口', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white' //按钮背景
					}]
				},
				currWindow:null,
				currTime:null
			}
		},
		computed:{
			reportIdArr:function(){
				let reportIdArr= [];
				this.tableData.forEach(item=>{
					reportIdArr.push(item.reportId);
				})
				return reportIdArr;
			}
		},
		methods: {
			empty(){
				if(this.$refs['form']!=undefined){
					this.$refs['form'].resetFields()
				}
			},
			doPlayReady(){
				if(this.tableData.length==0){
					this.$message({
					message: '请维护播放内容...',
					type: 'warning'
					});
					return ;
				}else{
					let palyMap = new Map();
					let firstPaly = null;
					this.tableData.forEach(item=>{
						if(item.reportId!=null&&item.nextReportId!=null&&item.remainSecond>0){
							palyMap.set(item.reportId,item)
						}
						if(item.isFirstPaly=='是')
							firstPaly = item;
					})
					if(palyMap.size==0){
						this.$message({
						message: '无法播放，请检查播放内容是否填写正确',
						type: 'warning'
						});
						return ;
					}
					if(firstPaly==null){
						this.$message({
						message: '请设置首播',
						type: 'warning'
						});
						return ;
					}
					if(this.currWindow!=null){
						this.currWindow.close();
						this.currWindow = null;
					}
					this.doPlay(palyMap,firstPaly);
						
				}
			},
			
			doPlay(reportMap,report){
				
				if(this.currWindow==null)
					this.currWindow = window.open('');
				if(!this.currWindow.window){
					clearTimeout(this.currTime);
					return;
				}
				if(this.currTime!=null)
					clearTimeout(this.currTime);	
				console.log(report.reportUrl)
				this.currWindow.location.href = report.reportUrl;
				this.currTime = setTimeout(()=>{
						let nextReport =reportMap.get(report.nextReportId)
						if(nextReport==null)
							clearTimeout(this.currTime);
						else
							this.doPlay(reportMap,nextReport); 
				},report.remainSecond*1000);
			},
			doAdd(){
				this.form = {};
				this.tableData.splice(0,this.tableData.length);
        this.tableData.push({ ...this.emptyRow
        })
				this.editModel = true;
			},
			doEdit(){
				this.editModel = true;
				this.tableData.push(this.emptyRow);
			},
			doDel(){
				this.$confirm('您确认删除轮播方案, 是否继续?', '系统提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									deleteScheme({
										Vue: this,
										params: {
											id: this.form.id
										},
									}).then(res => {
										if (res.result) {
											this.doSearch();
										}
									})
				
								});
			},
			setFirst(index){
				this.tableData.forEach((item,index_)=>{
					if(index_==index)
						this.$set(item,'isFirstPaly','是');
					else
						this.$set(item,'isFirstPaly','否');
				})
			},
			checkScheme(reportId,index){
				let index_ = this.reportIdArr.indexOf(reportId);
				if(index_!=index){
					this.$message({
					message: '当前看板不能重复出现，否则将出现播放错误',
					type: 'warning'
					});
					this.tableData[index].reportId=null;
				}
				this.setReportUrl(this.tableData[index],reportId,'reportUrl')
			},
			setReportUrl(row,id,field){
				let report  = this.reportList.filter(item=>item.id==id)[0]
				this.$set(row,field,report.reportUrl);
			},
			doSave(){
				this.$refs['form'].validate((valid) => {
					if(valid){
						if(this.form.alias==null||this.form.alias==''){
						this.$message({
							message: '请输入方案名称',
							type: 'warning'
						});
						return ;
						}
						if(this.tableData.length==0){
						this.$message({
							message: '请维护播放内容',
							type: 'warning'
						});
						return ;
						}
						for(let it in this.tableData){
						if(this.tableData[it].nextReportId == null || this.tableData[it].nextReportId == ''){
							this.$message({
							type: 'warning',
							message: "第" + (it - 0 + 1) + "行下一看板不能为空!"
							})
							return;
						}
						if(this.tableData[it].reportId == null || this.tableData[it].reportId == ''){
							this.$message({
							type: 'warning',
							message: "第" + (it - 0 + 1) + "行当前看板不能为空!"
							})
							return;
						}
						}
						let param = {...this.form};
						delete param.companyId
						delete param.userId
						param.detailList = this.tableData;
						saveOrUpdateScheme({
						Vue: this,
						params: param,
						}).then(res => {
						if (res.result) {
							this.editModel = false;
							this.doSearch();
						}
						})
						
					}else{
						this.$message({
						type: 'warning',
						message: '请填写完整信息!',
						duration: 1500
						})
						return
					}
				})
			},
			show() {
				this.doSearch();
				this.winConfig.dialogVisible = true;
			},
			doClickHandler(index, option) {
				let optionTemp = { ...option
				}
				delete optionTemp.label;
				delete optionTemp.value;

				this.form = optionTemp;
				this.loadSchemeDetail(this.form.id);
			},
			doAddRow(index_) {
				this.tableData.splice(index_ + 1, 0, { ...this.emptyRow
				})
			},
			doDelRow(index_) {
				let temp = this.tableData[index_];
				if (temp.id == null || temp.id == 0)
					this.tableData.splice(index_, 1)
				else
					this.$set(temp, 'deleted', 'T')
			},

			doSearch() {
				this.editModel = false;
				schemeList({
					Vue: this
				}).then(res => {
					if (res.result) {
						let schemeArr = res.model;
						if (schemeArr != null && schemeArr.length > 0) {
							this.classifiedConfig[0].options.splice(0,this.classifiedConfig[0].options.length)
							schemeArr.forEach(scheme => {
								scheme.label = scheme.alias
								scheme.value = scheme.id;
								this.classifiedConfig[0].options.push(scheme);
							});
							//默认选中第一个
							this.selectedItems[0].value = this.classifiedConfig[0].options[0].value;
							this.doClickHandler(0, this.classifiedConfig[0].options[0])
						}

					}
				})
			},
			loadSchemeDetail(schemeId) {
				schemeDetailList({
					Vue: this,
					params: {
						schemeId: schemeId
					}
				}).then(res => {
					if (res.result) {
						this.tableData = res.model;
					}
				})
			}
		}
	}
</script>
<style lang="less">
.el-form-item{
	margin-bottom: 18px;
}
</style>
