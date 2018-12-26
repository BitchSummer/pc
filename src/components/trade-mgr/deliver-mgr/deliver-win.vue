<template>
	<toast :config="winConfig"  @close="winConfig.dialogVisible=false" class="invoice-win" >
		<el-card style="margin: 5px 10px;">
			<deliver-form :form="form" />
		</el-card>
		<el-card style="margin: 5px 10px;">
			<deliver-detail-list  :tableData="tableData"  />
		</el-card>

	</toast>
</template>
<script>
	import {
		matterDetailList
	} from '../../../api/trademgr-delivermgr.js'

	import DeliverForm from './deliver-form.vue'
	import DeliverDetailList from './deliver-detail-list.vue'
	export default {
		data() {
			return {
				form: {
				},
				tableData: [],
				winConfig: { //办结弹窗数据
					title: "发货单信息", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "1300px", //弹窗宽
					btnData: [{
						name: '关闭窗口', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white' //按钮背景
					}]
				}
			}
		},
		methods: {
			show(form) {
				this.form = form;
				matterDetailList({
					Vue: this,
					params: {
						deliveryId: this.form.id
					}
				}).then(res => {
					if (res.result) {
						this.tableData = res.model
						console.log(this.tableData)
						this.winConfig.dialogVisible = true;
					}
				})
				
			}

		},
		components: {
			DeliverForm,
			DeliverDetailList
		}
	}
</script>
<style lang="less">
	.invoice-win {
		.el-form-item {
			margin-bottom: 12px;
		}

		.el-card__body {
			padding: 0px;
		}
	}
</style>
