import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
// import Router from 'vue-router'
import BaiduMap from 'vue-baidu-map'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
 
Vue.use(BaiduMap, {
    ak: 'Eu7ZzgEqWZpmlzTbv08mNO3OMIxeCLSl'
});

// Vue.use(Router)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
