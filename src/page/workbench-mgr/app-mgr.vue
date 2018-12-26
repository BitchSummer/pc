<template>
	<div class="app-mgr">
		<el-tabs v-model="activeName">
			<el-tab-pane label="我的看板" name="first">
				<el-row :gutter="8">
					<el-col :span="24" class="app-class-title">
						<h1 class="h1_left">
							常用
						</h1>
						<h1 class="h1_right" v-if="topApps.length>6">
							显示全部({{topApps.length}})</h1>
					</el-col>
				</el-row>
				<el-row :gutter="16" class="app-row">
					<el-col :span="4" v-for="(app,index) in topApps" v-show="index<5?true:topShowAll">
						<el-card shadow="hover">
							<span :class="app.isSetTop=='true'?'el-icon-star-on':'el-icon-star-off'" style="float:right;cursor:pointer;" @click="clearTop(app,index)"></span>
							<div class="app-body">
								<a @click="openApp(app.appUrl)">
									<img :src="app.appImgUrl" width="100px" height="100px" />
									<div>{{app.appName}}</div>
								</a>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="8" v-for="appClass in appClasses">
					<el-col :span="24" class="app-class-title">
						<h1 class="h1_left">{{appClass}}</h1>
						<h1 class="h1_right" v-if="topApps.length>6">显示全部({{appClassAppMap.get(appClass).length}})</h1>
					</el-col>
					<el-row :gutter="16" class="app-row">
						<el-col :span="4" v-for="(app,index) in appClassAppMap.get(appClass)" v-show="index<5?true:appClassShowAllMap.get(appClass)">
							<el-card shadow="hover">
								<span :class="app.isSetTop=='true'?'el-icon-star-on':'el-icon-star-off'" style="float:right;cursor:pointer;" @click="setOrNotTop(app,index)"></span>
								<div class="app-body">
									<a @click="openApp(app.appUrl)">
										<img :src="app.appImgUrl" width="100px" height="100px" />
										<div>{{app.appName}}</div>
									</a>
								</div>

							</el-card>
						</el-col>
					</el-row>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import {
		appList, //看板列表
		setTopOrDown //设置/取消常用
	} from '../../api/workbenchmgr-appmgr.js'
	export default {
		data() {
			return {
				topShowAll: false,
				activeName: 'first',
				topApps: [], //常用看板
				appClasses: [],
				appClassAppMap: new Map(),
				appClassShowAllMap:new Map()
			};
		},
		mounted() {
			this.doSearch(); //看板列表
		},
		methods: {
			openApp(url) {
				window.open(url);
			},
			doSearch() {
				appList({ //看板列表
					Vue: this
				}).then(res => {
					if (res.result) {
						let appArr = res.model;
						this.topApps.splice(0, this.topApps.length);
						this.appClasses.splice(0, this.appClasses.length);
						this.appClassAppMap = new Map();

						appArr.forEach(app => {
							if (app.isSetTop=="true")
								this.topApps.push(app);

							if (this.appClasses.indexOf(app.appClass) == -1) {
								this.appClasses.push(app.appClass);
								this.appClassShowAllMap.set(app.appClass, false)
								this.appClassAppMap.set(app.appClass, [app])
							} else {
								this.appClassAppMap.get(app.appClass).push(app);
							}
						})

					}
				})
			},
			setOrNotTop(app, index) { //设置
				setTopOrDown({
					Vue: this,
					params: {
						id: app.id,
					}
				}).then(data => {
					if(app.isSetTop=="true"){
						this.$set(app,'isSetTop','false')
						this.topApps.forEach((item,index1)=>{
							if(item.id ==app.id )
								this.topApps.splice(index1, 1);
						})
					}else{
						this.$set(app,'isSetTop','true')
						this.topApps.push(app)
					}
				});
			},
			clearTop(app, index) { //取消
				
				setTopOrDown({
					Vue: this,
					params: {
						id: app.id,
					}
				}).then(data => {
					this.doSearch();
				});
			}
		}

	}
</script>

<style lang="less">
	.app-mgr {
		.app-class-title {
			margin: 20px;

			.h1_left {
				float: left;
				.btn-setting{
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

		.app-row {
			padding: 0px 20px;
		}

		.app-body {
			margin: 0 auto;
			width: 100px;
			text-align: center;
			font-size: 14px;
		}
	}
</style>
