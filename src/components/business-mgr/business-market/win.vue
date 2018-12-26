<template>
	<toast :config="winConfig" @doSave="doSave" @close="winConfig.dialogVisible=false">
		<el-form :model="form" status-icon ref="form" label-width="140px">
			<div class="transfer-body">
				<el-transfer v-model="form.marketIds" :data="marketArr" :titles="titles" :props="props" @change="doMarketChange"/>
			</div>
			
			<el-form-item label="入市费用(元/月):" prop="entryCost">
				{{form.marketCost}}	
			</el-form-item>
			<div style="text-align: center;margin: 10px;">
				<el-checkbox v-model="isAgree" @change="isAgreeChange"/> 我已阅读并同意 <span style="color:#409EFF;">隐私协议与诚信协议</span>
			</div>
		</el-form>
	</toast>
</template>
<script>
	import {
		submitApply
	} from '../../../api/businessmgr-businessmarket.js'
	export default {
		props: ['form','marketArr'],
		data() {
			return {
				isAgree: false,
				props:{
				  key: 'id',
				  label: 'alias'
				},
				titles: ['市场选择', '已选市场'],
				winConfig: { //办结弹窗数据
					title: "入市申请", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "800px", //弹窗宽
					btnData: [{
						name: '取消', //按钮名
						method: 'close', //回调函数
						bgColor: 'dialog-white' //按钮背景
					}, {
						name: '提交申请', //按钮名
						disabled:true,
						method: 'doSave', //回调函数
						bgColor: 'dialog-bule' //按钮背景
					}]
				}
			}
		},
		methods: {
			show() {
				this.winConfig.dialogVisible = true;
			},
			doSave() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$confirm("您确认提交申请？", "系统提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							})
							.then(() => {
								delete this.form.authTime
								submitApply({Vue:this,params:this.form}).then(res=>{
									if(res.result){
										this.winConfig.dialogVisible = false;
										this.$emit('callback');
									}
								})
							})
					}
				});
			},
			doMarketChange(value, direction,movedKeys ){
				let changeCost = 0;
				movedKeys.forEach(key=>{
					let market = this.marketArr.filter(market=>market.id==key)[0];
					changeCost+= parseInt(market.marketCost);
					
				})
				if(direction=='right'){
					this.form.marketCost=parseInt(this.form.marketCost)+parseInt(changeCost)
					// this.form.marketCost = market.marketCost+changeCost
					console.log(this.form.marketCost,changeCost)
				}else
					this.form.marketCost-=changeCost
			},
			isAgreeChange(){
				console.log(this.isAgree)
				this.$set(this.winConfig.btnData[1],'disabled',!this.isAgree)
			}
		}
	}
</script>
<style lang="less">
	.el-form-item {
		margin-bottom: 12px;
	}
	.transfer-body{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px;
	}
</style>
