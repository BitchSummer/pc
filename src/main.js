import Vue from 'vue'
import app from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import router from './router/index.js'
import store from './store/index.js'
import 'babel-polyfill'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'


import toolbar from './components/zhiyun-ui/toolbar.vue' //工具栏
import Toast from './components/zhiyun-ui/toast.vue' //工具栏
import PageTool from './components/zhiyun-ui/pagetool.vue' //分页栏
import ClassifiedSearch from './components/zhiyun-ui/classified-search.vue' //分页栏
Vue.config.productionTip = false
import 'babel-polyfill';
// Vue.prototype.rightMenu = function (e,self) {
//   this.$store.commit('SET_CONTEXTMENU_EVENT', e);
//   this.$store.commit('SET_CONTEXTMENU_TARGET',self);
//   this.$store.commit('SET_SHOW_CONTEXTMENU',true);
// }
Vue.use(Element);
Vue.use(VueChartkick, {adapter: Chart})
Vue.component('toolbar',toolbar)
Vue.component('Toast',Toast)
Vue.component('PageTool',PageTool)
Vue.component('ClassifiedSearch',ClassifiedSearch)
new Vue({
  el: '#qwApp',
  router,
  store,
  components: { app }
})


