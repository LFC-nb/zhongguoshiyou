import Vue from 'vue'
import vuex from 'vuex'
import demo from './modules/demo.js' // 引入demo组件需要的数据store对象
import menuLeadLists from './modules/menuLeadLists.js' // 引入demo组件需要的数据store对象
import members from './modules/members.js' // 引入demo组件需要的数据store对象
import deliveryStatistics from './modules/deliveryStatistics.js' // 引入demo组件需要的数据store对象

// import role from './modules/role.js' // 引入role组件需要的数据store对象
Vue.use(vuex)

export default new vuex.Store({
  // state: state, mutations: mutations, actions: actions
  modules: {
    demo,
    menuLeadLists,
    members,
    deliveryStatistics
    // ,role
  }
})
