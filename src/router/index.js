
import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import demo from '@/pages/demo.vue'

import RouterView from '@/pages/RouterView'

import Login from '@/pages/account/Login.vue'
import Loginsupplier from '@/pages/account/Loginsupplier.vue'
import Main from '@/pages/Main.vue'
import Index from '@/pages/Index'

import BRPage01 from '@/pages/basicReport/BRPage01'

// 系统管理
import Members from '@/pages/systemManagement/members'
import MembersAdd from '@/pages/systemManagement/membersAdd'
import Department from '@/pages/systemManagement/department'
import Departmentedit from '@/pages/systemManagement/departmentedit'
import Role from '@/pages/systemManagement/role'
import Roleedit from '@/pages/systemManagement/roleedit'

// 报修管理
import Degree from '@/pages/faultUpload/degree'
import Location from '@/pages/faultUpload/location'
import QuestionType from '@/pages/faultUpload/questionType'
import QuestionTypeedit from '@/pages/faultUpload/questionTypeedit'
import CentralStation from '@/pages/faultUpload/centralStation'
// import ControlStation from '@/pages/faultUpload/controlStation'
import Statisticschart from '@/pages/faultUpload/statisticschart'

// 用车管理
import TranStation from '@/pages/vehicleManagement/tranStation'
import Drivers from '@/pages/vehicleManagement/drivers'
import Shipplace from '@/pages/vehicleManagement/shipplace'
import Timerecord from '@/pages/vehicleManagement/timerecord'
import Trucks from '@/pages/vehicleManagement/trucks'
import Signer from '@/pages/vehicleManagement/signer'
import Shiptab from '@/pages/vehicleManagement/shiptab'
import Statistics from '@/pages/vehicleManagement/statistics'
import Truckapply from '@/pages/vehicleManagement/truckapply'
import TruckApproval from '@/pages/vehicleManagement/truckApproval'
import Truckrevoke from '@/pages/vehicleManagement/truckrevoke'

Vue.use(Router)

// let routersComponentList = {
//   'demo': demo
// }

const routes = [{
  path: '/demo',
  name: 'demo',
  component: demo
}, {
  path: '/',
  name: 'Login',
  component: Login,
  meta: {
    requireAuth: true
  }
}, {
  path: '/Loginsupplier',
  name: 'Loginsupplier',
  component: Loginsupplier
}, {
  path: '/index',
  name: 'Main',
  component: Main,
  meta: {
    requireAuth: true
  },
  children: [{
    path: '/index',
    name: 'Index',
    component: Index
  }, {
    path: '/basicReport',
    name: 'BasicReport',
    component: RouterView,
    children: [{
      path: 'BRPage01',
      name: 'BRPage01',
      component: BRPage01
    }]
  }, {
    path: '/systemManagement',
    name: 'SystemManagement',
    component: RouterView,
    children: [{
      path: 'members',
      name: 'members',
      component: Members
    },
    {
      path: 'membersAdd',
      name: 'membersAdd',
      component: MembersAdd
    },
    {
      path: 'department',
      name: 'department',
      component: Department
    },
    {
      path: 'departmentedit',
      name: 'departmentedit',
      component: Departmentedit
    },
    {
      path: 'role',
      name: 'role',
      component: Role
    },
    {
      path: 'roleedit',
      name: 'roleedit',
      component: Roleedit
    }
    ]
  }, {
    path: '/vehicleManagement',
    name: 'VehicleManagement',
    component: RouterView,
    children: [{
      path: 'tranStation',
      name: 'tranStation',
      component: TranStation
    },
    {
      path: 'drivers',
      name: 'drivers',
      component: Drivers
    },
    {
      path: 'shipplace',
      name: 'shipplace',
      component: Shipplace
    },
    {
      path: 'timerecord',
      name: 'timerecord',
      component: Timerecord
    },
    {
      path: 'trucks',
      name: 'trucks',
      component: Trucks
    },
    {
      path: 'signer',
      name: 'signer',
      component: Signer
    },
    {
      path: 'shiptab',
      name: 'shiptab',
      component: Shiptab
    },
    {
      path: 'statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: 'truckapply',
      name: 'truckapply',
      component: Truckapply
    },
    {
      path: 'truckApproval',
      name: 'truckApproval',
      component: TruckApproval
    },
    {
      path: 'truckrevoke',
      name: 'truckrevoke',
      component: Truckrevoke
    }]
  }, {
    path: '/faultUpload',
    name: 'FaultUpload',
    component: RouterView,
    children: [{
      path: 'questionType',
      name: 'questionType',
      component: QuestionType
    }, {
      path: 'questionTypeedit',
      name: 'questionTypeedit',
      component: QuestionTypeedit
    },
    {
      path: 'centralStation',
      name: 'centralStation',
      component: CentralStation
    },
    {
      path: 'statisticschart',
      name: 'statisticschart',
      component: Statisticschart
    },
    {
      path: 'location',
      name: 'location',
      component: Location
    },
    {
      path: 'degree',
      name: 'degree',
      component: Degree
    }
    ]
  }]
}]

const router = new Router({
  routes
})

// 路由访问控制
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requireAuth)) {
    // console.log(to)
    if (to.name !== 'Login') {
      if (localStorage.getItem('isLogin')) { // 判断是否已经登录-登录标识根据项目自定义
        next()
        // 20190327  解决 直接关闭页面  再打开地址时  自动登录  标题等内容存储 缺少的问题    目前改为每次登录都需要登录
        // next({
        //   path: '/'
        // })
        // console.log(123)
        // console.log(store.state.login.userDataObj)
        // console.log(routes)
        // routes.push(store.state.login.userDataObj.routerLink)
        // console.log(routes)
      } else {
        next({
          path: '/'
        })
      }
    } else {
      if (localStorage.getItem('isLogin')) { // 判断是否已经登录-登录标识根据项目自定义
        next()
        // next({
        //   path: 'canteenManagement/dining'
        // })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
