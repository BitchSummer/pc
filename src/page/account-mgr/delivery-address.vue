
<template>
	<el-row class="delivery-address">
		<el-col :span="24"  class="delivery-address-main">
			<el-button type="text" icon="el-icon-edit" class="add-delivery" @click="doAdd">新增收货地址</el-button>
			<el-tabs v-model="activeName">
				<el-tab-pane label="收货地址" name="first">
					<el-card class="box-card" v-for="item in addrList">
						<div slot="header" class="clearfix">
							<span>{{item.receiver}}</span>
							<span class="default-fp" v-if="item.isDefault!=false">默认地址</span>
							
							<span class="default-fp" v-else style="display:none"></span>
						</div>
						<el-form label-width="110px">
							<el-form-item label="收货人:">{{item.receiver}}</el-form-item>
							<el-form-item label="电话:">{{item.phone||'无'}}</el-form-item>
							<el-form-item label="地址:">{{item.area+item.address||'无'}}</el-form-item>
							<el-form-item>
								<el-col :span="16"></el-col>
								<el-col :span="8" class="to-operation">
									<span v-if="item.isDefault!=true" @click="setDefault(item.id)">设为默认</span>
									<span @click="doEdit(item)">编辑</span>
									<span @click="doDel(item.id)">删除</span>
								</el-col>
							</el-form-item>
						</el-form>
					</el-card>
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<!-- 添加 编辑 -->
		<delivery-addr-form ref="deliveryAddrForm" :form="form" @callback="doSearch" />
	</el-row>
</template>
<script>
	import {
		deliveryAddrList,
		saveOrUpdateDeliveryAddr,
		deleteDeliveryAddr,
		setDefaultDeliveryAddr
	} from '../../api/accountmgr-deliveryaddress.js'
	import DeliveryAddrForm from '../../components/account-mgr/delivery-address/form-win.vue';
	export default {
		data() {
			return {
				activeName: 'first',
				addrList: [],
				form: {}
			}
		},
		mounted() {
			this.doSearch();
		},
		methods: {
			setDefault(id) {
			this.$confirm("您确认设定默认收货地址？", "系统提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
					})
					.then(() => {
						setDefaultDeliveryAddr({
							Vue: this,
							params: {
								id: id
							}
						}).then(res => {
							if (res.result)
								this.doSearch()
						})
					})
			},
			doDel(id) {
				this.$confirm("您确认删除收货地址？", "系统提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						deleteDeliveryAddr({
							Vue: this,
							params: {
								id: id
							}
						}).then(res => {
							if (res.result)
							this.doSearch()
						})
					})
					this.doSearch()
			},
			doEdit(item) {
				let data=item.area	
				this.form = { 
				    id:item.id,
					address1:data,
					receiver:item.receiver,
					phone:item.phone,
					address:item.address
				},
				this.$refs.deliveryAddrForm.show(item);
			},
			doAdd() {
				delete this.form.id
				this.form = {
					address1: [],
					receiver:'',
					phone:'',
					address:'',
				}
				this.$refs.deliveryAddrForm.show1();
			},
			doSearch(page) {
				deliveryAddrList({
					Vue: this,
					param: {}
				}).then(res => {
					if (res.result) {
						this.addrList = res.model;
					}
				})
			}
		},
		components: {
			DeliveryAddrForm
		}
	}
</script>
<style lang="less">
	.delivery-address {
		background-color: #f0f2f5;

		.el-tabs__content {
			border: none;
		}

		.delivery-address-main {
			background-color: #fff;
			position: relative;
		}

		.el-tab-pane {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.el-card {
			width: 80%;
			margin: 10px 0;

			.el-form-item {
				margin-bottom: 0;
			}
		}

		.to-operation {
			font-size: 14px;
			color: #0D6FF4;

			span {
				margin-right: 25px;
				cursor: pointer;
			}
		}

		.default-fp {
			background: rgba(255, 159, 0, 1);
			border-radius: 10px;
			font-size: 10px;
			color: #fff;
			display: inline-block;
			vertical-align: middle;
			padding: 3px 8px;
			margin-left: 10px;
		}

		.add-delivery {
			position: absolute;
			right: 15px;
			z-index: 3;
		}
	}
</style>
