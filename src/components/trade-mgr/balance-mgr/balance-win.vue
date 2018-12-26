<template>
	<toast :config="winConfig" @doSave="doSave" @close="winConfig.dialogVisible=false" class="invoice-win">
		<el-card>
			<balance-form :form="form" ref="form"  @callback="doSubmit" :detail="detail"/>
		</el-card>
		<el-card style="margin: 10px auto;">
			<balance-detail-list :form="form" :tableData="tableData" @callback="callback1" ref="balanceDetailList" :detail="detail" :mod='mod'/>
		</el-card>
	</toast>
</template>
<script>
	import {
		signOutBalance,
    balanceDetailList
	} from '../../../api/trademgr-balancemgr.js'

	import BalanceForm from './balance-form.vue'
	import BalanceDetailList from './balance-detail-list.vue'
  import el from "../../../../修改过的库_install好过后要放到node_modules里面/element-ui/src/locale/lang/el";
	export default {
		  props: ['detail'],
		data() {
			return {
				mod:'',
				tableData1:[],
				form: {
					signOutTime:'',
					signOutUser:'',
					providerId:'',
					providerName:'',
					balanceType:'',
					balanceMoney:"",
					remark:''
				},
				tableData: [],
				winConfig: { //办结弹窗数据
					title: "签发结算单", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "1300px", //弹窗宽
					btnData: [{
						name: '取消', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white' //按钮背景
					}, {
						name: '确定签发', //按钮名
						method: 'doSave', //回调函数
						bgColor: 'dialog-bule' //按钮背景
					}]
				}
			}
		},
		methods: {
			callback1(data){
				this.tableData1=data
			},
			show1(form){
			this.mod='add'
			this.form = form; 
			this.form.show=true;
			this.winConfig.dialogVisible = true;
				this.$nextTick(()=>{
					this.$refs['form'].empty()
					this.$refs.balanceDetailList.tableData1=[]  
				}) 
			},
			show(form) {
				this.form = form; 
        if (form.disAble){
          this.winConfig.btnData=[{
            name: '关闭', //按钮名
            method: 'close', //回调函数
            bgColor: 'dialog-white' //按钮背景
          }]
					this.form.show=false;
          balanceDetailList({
            Vue: this,
            params: {
              balanceId:form.id
            }
          }).then(res => {
            if (res.result) {
              this.tableData = res.model;
              this.tableData.forEach(item => {
                item.disAble = true;
							});
							
							this.winConfig.dialogVisible = true;
							
            }
          })
        }else {
					this.form.show=true;
					this.winConfig.dialogVisible = true;
          this.winConfig.btnData=[{
            name: '取消', //按钮名
            method: 'close', //回调函数
            bgColor: 'dialog-white' //按钮背景
          }, {
            name: '确定签发', //按钮名
            method: 'doSave', //回调函数
            bgColor: 'dialog-bule' //按钮背景
					}]
						this.$nextTick(()=>{
							this.$refs['form'].empty()
							this.$refs.balanceDetailList.tableData1=[]  
						}) 
					} 
			},
			doSave() {
				this.$refs.form.doSave();
			},
			doSubmit() {
        delete this.form.disAble
        delete this.form.show
				this.$confirm("您确认签发结算单？", "系统提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						let param = {...this.form}
						param.detailList = this.tableData1
						for(let item in this.tableData1){
						param.detailList[item].orderId=this.tableData1[item].id
            }
						signOutBalance({
							Vue: this,
							params: param
						}).then(res => {
							if (res.result) {
                this.$emit('callback');
                this.winConfig.dialogVisible = false;
							}
						})
					})
			}

		},
		components: {
			BalanceForm,
			BalanceDetailList
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
