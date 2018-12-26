<template>
  <div>
    <toolbar>
			<span slot="left">
				<el-radio-group v-model="queryParam.status" size="small" @change="doSearch">
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="待签收">待签收</el-radio-button>
					<el-radio-button label="已签收">已签收</el-radio-button>
				</el-radio-group>
				<el-input size="small" style="width: 150px;" v-model="queryParam.providerName" placeholder="服务商搜索..."/>
				<el-button icon="el-icon-search" size="small" style="width: 70px;" type="primary"
                   @click="doSearch">查询</el-button>
				<el-button icon="el-icon-close" size="small" style="width: 90px;" @click="doReset">清空条件</el-button>
			</span>
      <span slot="right">
				<el-button icon="el-icon-plus" size="small" style="width: 110px;" type="primary"
                   @click="doAdd">签发结算单</el-button>
			</span>
    </toolbar>
    <el-table ref="table" height="600" :data="tableData" style="width: 100%" @row-dblclick="doView">
         
      <el-table-column type="selection" align="center" width="50"/>
      <el-table-column resizable show-overflow-tooltip property="status" label="流程状态" width="110" align="center"/>
      <el-table-column resizable show-overflow-tooltip property="providerName" label="服务商" align="center"/>
      <el-table-column resizable show-overflow-tooltip label="付款信息" align="center">
        <el-table-column resizable show-overflow-tooltip property="signOutTime" align="center" label="付款日期"/>
        <el-table-column resizable show-overflow-tooltip property="orderCount" align="center" label="订单数"/>
        <el-table-column resizable show-overflow-tooltip property="balanceType" align="center" label="付款方式"/>
        <el-table-column resizable show-overflow-tooltip property="balanceMoney" align="center" label="付款金额"/>
      </el-table-column>
      <el-table-column resizable show-overflow-tooltip label="商户签收" align="center">
        <el-table-column resizable show-overflow-tooltip property="sureTime" align="center" label="签收日期"/>
        <el-table-column resizable show-overflow-tooltip property="sureUser" align="center" label="签收人"/>
      </el-table-column>
    </el-table>
    <div class="my-pagination">
      <page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
    </div>

    <balance-win ref='balanceWin' @callback="callback" :detail='detail'/>
  </div>
</template>

<script>
  import {
    balancePage
  } from '../../../api/trademgr-balancemgr.js'

  import BalanceWin from './balance-win.vue'
  import ro from "../../../../修改过的库_install好过后要放到node_modules里面/element-ui/src/locale/lang/ro";

  export default {
    data() {
      return {
        detail:'',
        tableData: [],
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        queryParam: {
          status: ''
        }
      };
    },
    methods: {
      callback() {
        this.doSearch()
      },
      doView(row) {//双击
        row.disAble = true
        this.$refs.balanceWin.show({...row});    
        this.detail="detail"
      },
      doAdd(form) {
        this.$refs.balanceWin.show({
          disAble: false,
          signOutTime: '',
          signOutUser: '',
          providerId: '',
          providerName:'',
          balanceType: '',
          balanceMoney:'',
          remark:''
        });
        this.detail="add"
      },
      doReset() {
        this.queryParam.providerName=''
      },
      doSearch(page) {
        let param = {
          ...this.queryParam
        }
        if (page == null || page.pageNo == null) {
          this.page.pageNo = 1
        }
        param.pageNo = this.page.pageNo
        param.pageSize = this.page.pageSize
        balancePage({Vue: this, params: param}).then(res => {
          if (res.result) {
            this.page.total = res.model.numRows
            this.tableData = res.model.items;
          }
        })
      }
    },
    components: {
      BalanceWin
    }
  }
</script>

<style lang="less">
  .flexbox {
    display: flex;
    .text {
      margin-top: 5px;
      color: #666;
      font: 12px/1.5 tahoma, arial, Hiragino Sans GB, \\5B8B\4F53, sans-serif;
    }
    .orderTime {
      width: 180px;
    }
    .orderCode {
      width: 130px;
    }
    .providerName {
      flex: 1;
    }
    .orderMoney {
      width: 100px;
    }
    .sumDeliveryAmount {
      width: 100px;
    }
    .sumInvMoney {
      width: 100px;
    }
    .sumBalanceMoney {
      width: 100px;
    }
    .status {
      width: 130px;
    }
    .btn {
      width: 100px;
    }
  }
</style>
