<template>
	<div class="report-mgr">
		<el-tabs v-model="activeName">
			<el-tab-pane label="我的看板" name="first">
				<el-row :gutter="8">
					<el-col :span="24" class="report-class-title">
						<h1 class="h1_left">
							常用
							<el-button size="small" type="danger" class="btn-setting" @click="doBroadcastSet">轮播设置</el-button>
						</h1>
						<h1 class="h1_right" v-if="topReports.length>6">
							显示全部({{topReports.length}})</h1>
					</el-col>
				</el-row>
				<el-row :gutter="16" class="report-row">
					<el-col :span="4" v-for="(report,index) in topReports" v-show="index<5?true:topShowAll">
						<el-card shadow="hover">
							<span :class="report.isSetTop=='true'?'el-icon-star-on':'el-icon-star-off'" style="float:right;cursor:pointer;" @click="clearTop(report,index)"></span>
							<div class="report-body">
								<a @click="openReport(report.reportUrl)">
									<img :src="report.reportImgUrl" width="100px" height="100px" />
									<div>{{report.reportName}}</div>
								</a>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="8" v-for="folder in folderNames">
					<el-col :span="24" class="report-class-title">
						<h1 class="h1_left">{{folder}}</h1>
						<h1 class="h1_right" v-if="topReports.length>6">显示全部({{folderReportMap.get(folder).length}})</h1>
					</el-col>
					<el-row :gutter="16" class="report-row">
						<el-col :span="4" v-for="(report,index) in folderReportMap.get(folder)" v-show="index<5?true:folderShowAllMap.get(folder)">
							<el-card shadow="hover">
								<span :class="report.isSetTop=='true'?'el-icon-star-on':'el-icon-star-off'" style="float:right;cursor:pointer;" @click="setOrNotTop(report,index)"></span>
								<div class="report-body">
									<a @click="openReport(report.reportUrl)">
										<img :src="report.reportImgUrl" width="100px" height="100px" />
										<div>{{report.reportName}}</div>
									</a>
								</div>

							</el-card>
						</el-col>
					</el-row>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		<scheme-win ref="schemeWin" :reportList="reportList" :folderNames="folderNames" :folderReportMap="folderReportMap" />
	</div>
</template>

<script>
	import {
		reportList, //看板列表
		setTopOrDown //设置/取消常用
	} from '../../api/workbenchmgr-reportmgr.js'
	import SchemeWin from '../../components/workbench-mgr/report-mgr/scheme-win.vue'
	export default {
		data() {
			return {
				topShowAll: false,
				activeName: 'first',
				topReports: [], //常用看板
				folderNames: [],
				folderReportMap: new Map(),
				folderShowAllMap: new Map(),
				reportList: []
			};
		},
		mounted() {
			this.doSearch(); //看板列表
		},
		methods: {
			doBroadcastSet() {
				this.$refs.schemeWin.empty();
				this.$refs.schemeWin.show();
			},
			openReport(url) {
				window.open(url);
			},
			doSearch() {
				reportList({ //看板列表
					Vue: this
				}).then(res => {
					if (res.result) {
						let reportArr = res.model;
						this.reportList = reportArr;
						this.topReports.splice(0, this.topReports.length);
						this.folderNames.splice(0, this.folderNames.length);
						this.folderReportMap = new Map();

						reportArr.forEach(report => {
							if (report.isSetTop=="true")
								this.topReports.push(report);

							if (this.folderNames.indexOf(report.folderName) == -1) {
								this.folderNames.push(report.folderName);
								this.folderShowAllMap.set(report.folderName, false)
								this.folderReportMap.set(report.folderName, [report])
							} else {
								this.folderReportMap.get(report.folderName).push(report);
							}
						})

					}
				})
			},
			setOrNotTop(report, index) { //设置
				setTopOrDown({
					Vue: this,
					params: {
						id: report.id,
					}
				}).then(data => {
					if(report.isSetTop=="true"){
						this.$set(report,'isSetTop','false')
						this.topReports.forEach((item,index1)=>{
							if(item.id ==report.id )
								this.topReports.splice(index1, 1);
						})
					}else{
						this.$set(report,'isSetTop','true')
						this.topReports.push(report)
					}
				});
			},
			clearTop(report, index) { //取消
				
				setTopOrDown({
					Vue: this,
					params: {
						id: report.id,
					}
				}).then(data => {
					this.doSearch();
				});
			}
		},
		components: {
			SchemeWin
		}

	}
</script>

<style lang="less">
	.report-mgr {
		.report-class-title {
			margin: 20px;

			.h1_left {
				float: left;

				.btn-setting {
					margin-left: 30px;
				}
			}

			.h1_right {
				float: right;
				color: #999;
				font-size: 14px;
				padding-right: 60px;
			}
		}

		.report-row {
			padding: 0px 20px;
		}

		.report-body {
			margin: 0 auto;
			width: 100px;
			font-size: 14px;
		}
	}
</style>
