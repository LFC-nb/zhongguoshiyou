// 公用方法和变量封装
const mockData = {
  'userInfo': [{
    'userId': '1',
    'userName': '13527418321',
    'nickName': 'PSC Member01',
    'password': '123456',
    'level': 1,
    'menuLists': [{
      icon: 'index',
      name: '首页',
      code: 'menu01',
      children: [{
        icon: 'fa-cutlery',
        name: '首页',
        code: '1-1',
        children: [],
        link: '/index'
      }],
      link: '/index'
    }, {
      icon: 'fa-cutlery',
      name: '食堂管理',
      code: 'menu02',
      children: [{
        icon: 'fa-cutlery',
        name: '资金管理',
        code: '2-1',
        children: [],
        link: '/canteenManagement/fund'
      }, {
        icon: 'fa-cutlery',
        name: '用餐管理',
        code: '2-2',
        children: [],
        link: '/canteenManagement/dining'
      }, {
        icon: 'fa-cutlery',
        name: '用餐申请',
        code: '2-3',
        children: [],
        link: '/canteenManagement/mealApplication'
      }, {
        icon: 'fa-cutlery',
        name: '井站就餐查询',
        code: '2-4',
        children: [],
        link: '/canteenManagement/dininginquiry'
      }]
    }, {
      icon: 'fa-shopping-cart',
      name: '配送管理',
      code: 'menu03',
      children: [{
        icon: 'fa-cutlery',
        name: '物资申请',
        code: '3-1',
        children: [],
        link: '/distributionManagement/myApplication'
      }, {
        icon: 'fa-cutlery',
        name: '物资审批',
        code: '3-2',
        children: [],
        link: '/distributionManagement/materialApplication'
      }, {
        icon: 'fa-cutlery',
        name: '配送订单',
        code: '3-3',
        children: [],
        link: '/distributionManagement/materialDistribution'
      }, {
        icon: 'fa-cutlery',
        name: '商品管理',
        code: '3-4',
        children: [],
        link: '/distributionManagement/commodityManagement'
      }, {
        icon: 'fa-cutlery',
        name: '商品分类',
        code: '3-5',
        children: [],
        link: '/distributionManagement/commodityClass'
      }, {
        icon: 'fa-cutlery',
        name: '供应商管理',
        code: '3-6',
        children: [],
        link: '/distributionManagement/supplierManagement'
      }, {
        icon: 'fa-cutlery',
        name: '统计分析',
        code: '3-7',
        children: [],
        link: '/distributionManagement/distributionStatistics'
      }, {
        icon: 'fa-cutlery',
        name: '供应商订单',
        code: '3-8',
        children: [],
        link: '/distributionManagement/supplierOrderDistribution'
      }, {
        icon: 'fa-cutlery',
        name: '配送统计',
        code: '3-9',
        children: [],
        link: '/distributionManagement/deliveryStatistics'
      }, {
        icon: 'fa-cutlery',
        name: '额度日期',
        code: '3-10',
        children: [],
        link: '/quotaSetting/quotaTime'
      }, {
        icon: 'fa-cutlery',
        name: '额度设置(中心站)',
        code: '3-11',
        children: [],
        link: '/quotaSetting/quotaLimit'
      }, {
        icon: 'fa-cutlery',
        name: '额度设置(井站)',
        code: '3-12',
        children: [],
        link: '/quotaSetting/quotaLimitsub'
      }]
    }, {
      icon: 'fa-user-circle',
      name: '系统管理',
      code: 'menu04',
      children: [{
        icon: 'fa-cutlery',
        name: '人员管理',
        code: '4-1',
        children: [],
        link: '/systemManagement/members'
      }, {
        icon: 'fa-cutlery',
        name: '部门管理',
        code: '4-2',
        children: [],
        link: '/systemManagement/department'
      }, {
        icon: 'fa-cutlery',
        name: '角色管理',
        code: '4-3',
        children: [],
        link: '/systemManagement/role'
      }]
    }, {
      icon: 'fa-user-circle',
      name: '配额设置',
      code: 'menu05',
      children: []
    }, {
      icon: 'fa-file-text',
      name: '文档管理',
      code: 'menu06',
      children: [{
        icon: 'fa-cutlery',
        name: '选项1',
        code: '6-1',
        children: [],
        link: '/basicReport/BRPage01'
      }]
    }, {
      icon: 'fa-file-text',
      name: '配送人员',
      code: 'menu07',
      children: [{
        icon: 'fa-cutlery',
        name: '人员列表',
        code: '7-1',
        children: [],
        link: '/supplierPersManagement/suppliermembers'
      }, {
        icon: 'fa-cutlery',
        name: '配送区域',
        code: '7-2',
        children: [],
        link: '/supplierPersManagement/supplierdelivery'
      }]
    }, {
      icon: 'fa-truck',
      name: '用车管理',
      code: 'menu08',
      children: [{
        icon: 'fa-cutlery',
        name: '井站管理',
        code: '8-1',
        children: [],
        link: '/vehicleManagement/tranStation'
      }, {
        icon: 'fa-cutlery',
        name: '驾驶员管理',
        code: '8-2',
        children: [],
        link: '/vehicleManagement/drivers'
      }, {
        icon: 'fa-cutlery',
        name: '卸载地管理',
        code: '8-3',
        children: [],
        link: '/vehicleManagement/shipplace'
      }, {
        icon: 'fa-cutlery',
        name: '在途时间管理',
        code: '8-4',
        children: [],
        link: '/vehicleManagement/timerecord'
      }, {
        icon: 'fa-cutlery',
        name: '车辆管理',
        code: '8-5',
        children: [],
        link: '/vehicleManagement/trucks'
      }, {
        icon: 'fa-cutlery',
        name: '签认人管理',
        code: '8-6',
        children: [],
        link: '/vehicleManagement/signer'
      }, {
        icon: 'fa-cutlery',
        name: '台账列表',
        code: '8-7',
        children: [],
        link: '/vehicleManagement/shiptab'
      }]
    }]
  }, {
    'userId': '2',
    'userName': '13527418322',
    'nickName': 'PSC Member02',
    'password': '123456',
    'level': 2,
    'menuLists': [{
      icon: 'index',
      name: '首页',
      code: '1',
      link: '/index'
    }, {
      icon: 'map-marker-alt',
      name: '导航一',
      code: 'basicReport',
      children: [{
        name: '选项1',
        code: '2-1',
        link: '/basicReport/BRPage01'
      }, {
        name: '选项2',
        code: '2-2',
        link: '/basicReport/BRPage01'
      }, {
        name: '选项3',
        code: '2-3',
        link: '/basicReport/BRPage01'
      }, {
        name: '选项4',
        code: '2-4',
        link: '/basicReport/BRPage01',
        children: [{
          name: '选项1',
          code: '2-4-1',
          link: '/basicReport/BRPage01'
        }, {
          name: '选项2',
          code: '2-4-2',
          link: '/basicReport/BRPage01'
        }]
      }]
    }]
  }, {
    'userId': '3',
    'userName': '13527418323',
    'nickName': 'PSC Member03',
    'password': '123456',
    'level': 3,
    'menuLists': [{
      icon: 'index',
      name: '首页',
      code: '1',
      link: '/index'
    }, {
      icon: 'map-marker-alt',
      name: '导航一',
      code: 'basicReport',
      children: [{
        name: '选项1',
        code: '2-1',
        link: '/basicReport/BRPage01'
      }, {
        name: '选项2',
        code: '2-2',
        link: '/basicReport/BRPage01'
      }, {
        name: '选项3',
        code: '2-3',
        link: '/basicReport/BRPage01'
      }]
    }]
  }],
  cascader: [{
    value: '',
    label: '',
    children: [{
      value: '',
      label: '',
      children: [{
        value: '',
        label: ''
      }]
    }]
  }],
  tableDining: [{
    name: '王小虎',
    diningtype: '早餐',
    mnembertype: '企业人员',
    price: '5',
    time: '7:00-8:00'
  }],
  tableApplication: [{
    applicantName: '王小虎',
    applicationDepartment: '作业区',
    applicationDetails: '查看详情',
    applicationStatus: '已通过',
    applicantTime: '2019-01-11 12:28'
  }],
  tableDistribution: [{
    supplierName: '王小虎',
    supplierTel: '13594804266',
    distributionDetails: '查看详情',
    distributionStatus: '配送中',
    approvedTime: '2019-01-11 12:28'
  }],
  tableData: [{
    name: '王小虎',
    province: '企业人员',
    city: '研发中心',
    address: '-',
    zip: 200333
  }, {
    name: '王小虎',
    province: '企业人员',
    city: '研发中心',
    address: '-',
    zip: 200333
  }],
  'rolelist': [{
    ID: '',
    RoleName: '',
    Privilege: ''
  }],
  'tranStationlist': [],
  'shipplaces': [],
  'driversWaterlist': [],
  'driversOillist': [],
  'truckWaterlist': [],
  'truckOillist': [],
  'signerlist': []
}

export default mockData