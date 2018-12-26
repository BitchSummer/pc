import Vue from 'vue'
import Router from 'vue-router'
// import index from '../page/index.vue'
import iframeLink from '../page/iframeLink/index.vue'
import page_404 from '../page/404/index.vue'
import desktop from '../page/desktop/Desktop.vue'

/**子页面路由 */

import AccountMgr from '../page/account-mgr/account-mgr.vue'
import InvoiceAddress from '../page/account-mgr/invoice-address.vue'
import DeliveryAddress from '../page/account-mgr/delivery-address.vue'

import BusinessEntry from '../page/business-mgr/business-entry.vue'
import BusinessMarket from '../page/business-mgr/business-market.vue'
import BusinessMsg from '../page/business-mgr/business-msg.vue'
import BusinessStorage from '../page/business-mgr/business-storage.vue'

import OrderMgr from '../page/trade-mgr/order-mgr.vue'
import PayableMgr from '../page/trade-mgr/payable-mgr.vue'
import InvoiceMgr from '../page/trade-mgr/invoice-mgr.vue'
import BalanceMgr from '../page/trade-mgr/balance-mgr.vue'
import DeliverMgr from '../page/trade-mgr/deliver-mgr.vue'

import ReportMgr from '../page/workbench-mgr/report-mgr.vue'
import AppMgr from '../page/workbench-mgr/app-mgr.vue'
Vue.use(Router)
export default new Router({
	routes: [
		{ 
			path: "/desktop",
			name: "desktop",
			component: desktop
		},
		{
			path: "*",
			component: page_404,
			name: "404"
		},
		{
			path: '/iframeLink',
			name: 'iframeLink',
			component: iframeLink
		},
		{
			path: '/account-mgr/account-mgr',
			name: 'account-mgr',
			component: AccountMgr
		},
		{
			path: '/account-mgr/invoice-address',
			name: 'invoice-address',
			component: InvoiceAddress
		},
		{
			path: '/account-mgr/delivery-address',
			name: 'delivery-address',
			component: DeliveryAddress
		},
		
		
		{
			path: '/business-mgr/business-entry',
			name: 'business-entry',
			component: BusinessEntry
		},
		{
			path: '/business-mgr/business-market',
			name: 'business-market',
			component: BusinessMarket
		},
		{
			path: '/business-mgr/business-msg',
			name: 'business-msg',
			component: BusinessMsg
		},
		{
			path: '/business-mgr/business-storage',
			name: 'business-storage',
			component: BusinessStorage
		},
		
		
		
		{
			path: '/trade-mgr/order-mgr',
			name: 'order-mgr',
			component: OrderMgr
		},
		{
			path: '/trade-mgr/payable-mgr',
			name: 'payable-mgr',
			component: PayableMgr
		},
		{
			path: '/trade-mgr/deliver-mgr',
			name: 'deliver-mgr',
			component: DeliverMgr
		},
		{
			path: '/trade-mgr/invoice-mgr',
			name: 'invoice-mgr',
			component: InvoiceMgr
		},
		{
			path: '/trade-mgr/balance-mgr',
			name: 'balance-mgr',
			component: BalanceMgr
		},
		
		
		{
			path: '/workbench-mgr/report-mgr',
			name: 'report-mgr',
			component: ReportMgr
		},
		{
			path: '/workbench-mgr/app-mgr',
			name: 'app-mgr',
			component: AppMgr
		}
  ]
})
