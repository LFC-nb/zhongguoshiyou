// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex 应用程序开发的状态管理模式
import store from './store'
// 第三方库引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

// 引入自定义相关css样式
import './assets/css/psc.base.css'

// 引入自定义相关js接口
import commonFunc from './api/common/common.js'
import config from './config/config.js'
import requestService from './api/common/request.js'
import interfaceApi from './api/common/interface.js'

// 引入自定义相关组件
import ActionBtn from '@/components/ActionBtn'
import PSCHeader from '@/components/PSCHeader'
import ProHeader from '@/components/ProHeader'

// 使用自定义JS库
Vue.prototype.$commonFunc = commonFunc
Vue.prototype.$config = config
Vue.prototype.$requestService = requestService
Vue.prototype.$interfaceApi = interfaceApi

// 自定义组件
Vue.component('ActionBtn', ActionBtn)
Vue.component('PSCHeader', PSCHeader)
Vue.component('ProHeader', ProHeader)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: {
    App
  },
  template: '<App/>'
})
// Vue.directive('enterNumber', { // el-input type="number" v-enter-number input输入框纯数字 2020.4.21 zj
//   inserted: function(el) {
//     el.addEventListener('keypress', function(e) {
//       e = e || window.event
//       let charcode = typeof e.charCode === 'bnumber' ? e.charCode : e.keyCode
//       let re = /\d/
//       if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
//         if (e.preventDefault) {
//           e.preventDefault()
//         } else {
//           e.returnValue = false
//         }
//       }
//     })
//   }
// })
