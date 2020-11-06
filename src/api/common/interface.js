/**
 * interfaceApi 用于 API 接口参数统一封装返回
 */

// 模块接口路由配置
const ifRoute = {
  carApply: {
    edit: 'CarApply_edit', // 用车申请 中心站编辑
    listwell: 'CarApply_listwell', // 用车申请 中心站获取列表
    listconfirm: 'CarApply_listconfirm', // 用车申请 调控中心获取列表
    listcancel: 'CarApply_listcancel', // 用车撤销列表
    cancel: 'CarApply_cancel', // 用车申请 中心站撤销(完成的不能撤销)
    confirm: 'CarApply_confirm', // 用车申请 调控中心确定
    del: 'CarApply_del', // 用车申请 中心站删除
    isnew: 'CarApply_isnew' // 消息轮训
  },
  tags: {
    dep: 'Tags_dep' // 给井站按 标签分类  返回
  },
  // stationEatRecord: {
  //   list: 'StationEatRecord_list' // 井站就餐查询
  // },
  // report: {
  //   onetoexcel: 'Report_onetoexcel'
  // },
  // deliveryToDep: {
  //   list: 'DeliveryToDep_list', // 配送员配送部门设置列表
  //   edit: 'DeliveryToDep_edit', // 配送员配送部门设置
  //   del: 'DeliveryToDep_del' // 员工配送部门设置删除
  // },
  // employee: {
  //   newpass: 'Employee_newpass', // 供应商人员列表
  //   list: 'Employee_list', // 供应商人员列表
  //   edit: 'Employee_edit', // 供应商人员编辑
  //   del: 'Employee_del', // 供应商人员删除
  //   delivery: 'Employee_delivery' // 供应商配送人员对应 配送到终点 列表
  // },
  // limit: {
  //   department: 'Limit_department', // 管理员统计时 获取配额使用信息
  //   getone: 'Limit_getone', // 配额获取(中心站)
  //   edit: 'Limit_edit', // 物资配额设置(中心站)
  //   subdep: 'Limit_subdep', // 配额获取（井站）
  //   batch: 'Limit_batch', // 配额批量设置（井站）
  //   apply: 'Limit_apply' // 物资申请时查询配额（申请者申请时）
  // },
  // baseSet: {
  //   detail: 'BaseSet_detail', // 获取额度时间
  //   edit: 'BaseSet_edit' // 额度时间设置
  // },
  // order: {
  //   count: 'order_count', // 物资 配送 发货
  //   receive: 'order_receive', // 物资 配送 签收
  //   auditlist: 'order_auditlist', // 物资 配送列表
  //   userApplyList: 'order_userApplyList', // 物资 用户申请列表
  //   detail: 'order_detail', // 物资申请详情
  //   agree: 'order_agree', // 物资申请通过
  //   refuse: 'order_refuse', // 物资申请拒绝
  //   cancel: 'order_cancel', // 供应商撤销配送申请
  //   shipments: 'order_shipments', // 供应商确认开始配送 物资 配送 发货
  //   applyList: 'order_applyList', // 物资申请列表
  //   transList: 'order_transList', // 供应商收到的请求配送列表
  //   delete: 'order_delete', // 物资申请列表
  //   suppliercount: 'Order_suppliercount' // 供应商  配送统计
  // },
  // product: {
  //   batch: 'Product_batch', // 批量价格修改
  //   add: 'product_add', // 商品新增
  //   edit: 'product_edit', // 商品编辑
  //   list: 'product_list', // 商品列表
  //   delete: 'product_delete' // 删除商品
  // },
  // class: {
  //   add: 'Class_add', // 商品类别新增
  //   edit: 'Class_edit', // 商品类别编辑
  //   list: 'Class_listtree', // 商品类别列表
  //   delete: 'Class_delete' // 删除供应商
  // },
  // supplierRole: {
  //   list: 'SupplierRole_list' // 供应商角色列表
  // },
  // supplier: {
  //   login: 'Supplier_login', // 供应商登录
  //   edit: 'supplier_edit', // 供应商编辑    超级管理员操作
  //   newpass: 'Supplier_newpass', // 供应商编辑 修改密码等   供应商自己操作
  //   list: 'supplier_list', // 供应商列表
  //   delete: 'supplier_delete' // 删除供应商
  // },
  // mealApply: {
  //   audit: 'MealApply_audit', // 设置就餐人员
  //   del: 'MealApply_del', // 删除就餐人员
  //   submit: 'MealApply_submit', // 添加就餐人员
  //   list: 'MealApply_list', // 可就餐人员列表,
  //   status: 'MealApply_status' // 就餐人员接入   状态设置
  // },
  // MealSet: {
  //   del: 'MealSet_del', // 三餐 信息删除
  //   list: 'MealSet_list', // 三餐 信息列表
  //   edit: 'MealSet_edit' // 三餐信息编辑
  // },
  cashFlow: {
    list: 'CashFlow_list' // 统计
  },
  driver: {
    listAll: 'Driver_listAll', // 驾驶员
    listOil: 'Driver_listOil', // 取油车驾驶员
    listWater: 'Driver_listWater', // 取水车驾驶员
    edit: 'Driver_edit', // 驾驶员编辑
    del: 'Driver_del' // 驾驶员删除
  },
  cars: {
    listAll: 'Cars_listAll', // 所有车辆
    listOil: 'Cars_listOil', // 取油车
    listWater: 'Cars_listWater', // 取水车
    edit: 'Cars_edit', // 车辆编辑
    del: 'Cars_del' // 车辆删除
  },
  signer: {
    list: 'Signer_list', // 签认人列表查询
    edit: 'Signer_edit', // 签认人编辑
    del: 'Signer_del' // 签认人删除（假删除）
  },
  shipPlace: {
    list: 'ShipPlace_list', // 地点列表查询
    listWater: 'ShipPlace_listWater', // 地点  油 列表查询
    listOil: 'ShipPlace_listOil', // 地点 水 列表查询
    edit: 'ShipPlace_edit', // 地点编辑
    del: 'ShipPlace_del' // 地点删除（假删除）
  },
  shipRecord: {
    list: 'ShipRecord_list', // 运单流转记录
    detail: 'ShipRecord_detail' // 运单流转记录
  },
  shipList: {
    analysis: 'shipList_analysis', // 统计查询列表
    well: 'ShipList_well', // 运输记录列表
    add: 'ShipList_add', // 运输记录 编辑
    verfi: 'ShipList_verfi', // 卸载点编辑（油车，验油班） 运输记录 编辑
    audit: 'ShipList_audit', // 审核编辑
    adjust: 'ShipList_adjust', // 完成编辑（审核通过的记录，有权限者可以编辑）
    check: 'ShipList_check', // 验油班查询
    finish: 'ShipList_finish', // 完成查询
    review: 'ShipList_review', // 审核查询
    del: 'ShipList_del' // 删除
  },
  timeRecord: {
    list: 'TimeRecord_list', // 在途平均时间列表查询
    get: 'TimeRecord_get', // 单个井站到单个卸载点的平均时间
    edit: 'TimeRecord_edit', // 在途平均时间编辑
    del: 'TimeRecord_del' // 在途平均时间删除（真删）
  },
  degree: {
    list: 'Degree_list', // 问题分级管理编辑
    edit: 'Degree_edit', // 问题分级管理列表
    del: 'Degree_del' // 问题分级管理假删
  },
  location: {
    list: 'Location_list', // 故障位置编辑
    edit: 'Location_edit', // 故障位置列表
    del: 'Location_del' // 故障位置假删
  },
  questionType: {
    list: 'QuestionType_list', // 问题分类管理列表 获取列表(以子节点方式展示)
    pid: 'QuestionType_pid', // 问题分类管理列表 根据父节点获取子节点
    edit: 'QuestionType_edit', // 问题分类管理编辑
    del: 'QuestionType_del' // 问题分类管理假删
  },
  question: {
    add: 'Question_add', // 中心站问题编辑
    audit: 'Question_audit', // 调控岗编辑
    list: 'Question_list', // 中心站获取列表
    listaudit: 'Question_listaudit', // 调控中心获取列表
    del: 'Question_del', // 删除
    todo: 'Question_todo', // 审查列表 数量
    count: 'Question_count' // 统计
  },
  repairUser: {
    list: 'repairUser_list' // 获取技术人员列表
  },
  manager: {
    repair: 'Manager_repair', // 自行处理  分配人员  负责人
    listmeal: 'Manager_listmeal', // 未授权的就餐的  人员列表
    login: 'Manager_login', // 登录
    editinfo: 'Manager_editinfo', // 修改密码
    list: 'Manager_list', // 人员列表
    edit: 'Manager_edit', // 人员编辑
    del: 'Manager_del', // 人员删除
    detail: 'Manager_detail', // 人员详情
    regulate: 'Manager_regulate' // 问题上报  调控中心审核人员列表
  },
  role: {
    edit: 'Role_edit', // 角色编辑
    del: 'Role_del', // 角色删除
    set: 'Role_set', // 角色权限设置
    list: 'Role_list' // 角色列表
  },
  department: {
    wkcenter: 'Department_wkcenter', // 中心站 用车  列表查询 选择  井站条件
    wellcenter: 'Department_wellcenter', // 中心站 报修  选择  下属 井站
    well: 'Department_well', // 中心站 报修  选择  下属 井站
    repair: 'Department_repair', // 自行整改  筛选整改负责人  井站列表
    line: 'Department_line', // 供应商路线
    delivery: 'Department_delivery', // 供应商配送员 选取中心井站时 选择部门
    center: 'Department_center', // 获取中心井站的部门信息（超级管理员给中心配额时使用）
    list: 'Department_list', // 部门列表
    edit: 'Department_edit', // 部门编辑
    del: 'Department_del' // 部门删除
  },
  tranStation: {
    list: 'TranStation_list', // 可选井站 所在部门
    listOil: 'TranStation_listOil', // 可选井站 油车 所在部门
    listWater: 'TranStation_listWater', // 可选井站 水车 所在部门
    allOil: 'TranStation_allOil', // 油车  可选井站  所有
    allWater: 'TranStation_allWater', // 水车  可选井站  所有
    alllist: 'TranStation_alllist', // 可选井站  所有
    all: 'TranStation_all', // 所有井站
    edit: 'TranStation_edit' // 选择编辑井站
  },
  demo: { // 商圈相关
    test: 'demo'
  },
  others: {}
}

// 资讯列表接口设置
function setNewsInterface(typeVal, condition) {
  let list = {}
  switch (typeVal) {
    case 'CarApply_confirm':
      // 用车申请 调控中心确定
      list = {
        'TransCode': ifRoute.carApply.confirm,
        'Content': {
          'Condition': condition
        }
      }
      break
    case 'CarApply_cancel':
      // 用车申请 中心站撤销(完成的不能撤销)
      list = {
        'TransCode': ifRoute.carApply.cancel,
        'Content': {
          'Condition': condition
        }
      }
      break
    case 'CarApply_edit':
      // 用车申请 中心站编辑
      list = {
        'TransCode': ifRoute.carApply.edit,
        'Content': {
          'Entity': condition
        }
      }
      break
    case 'CarApply_isnew':
      // 消息轮训
      list = {
        'TransCode': ifRoute.carApply.isnew,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'CarApply_del':
      // 删除
      list = {
        'TransCode': ifRoute.carApply.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'CarApply_listcancel':
      // 用车申撤销列表
      list = {
        'TransCode': ifRoute.carApply.listcancel,
        'Content': {
          'Condition': {
            'CarType': condition.CarType,
            // 'QueryStatus': condition.QueryStatus,
            'DepartmentLev': condition.DepartmentLev,
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'CarApply_listconfirm':
      // 用车申请 调控中心获取列表
      list = {
        'TransCode': ifRoute.carApply.listconfirm,
        'Content': {
          'Condition': {
            'CarType': condition.CarType,
            'QueryStatus': condition.QueryStatus,
            'DepartmentLev': condition.DepartmentLev,
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'CarApply_listwell':
      // 用车申请 中心站获取列表
      list = {
        'TransCode': ifRoute.carApply.listwell,
        'Content': {
          'Condition': {
            'CarType': condition.CarType,
            'QueryStatus': condition.QueryStatus,
            'DepartmentLev': condition.DepartmentLev,
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'Tags_dep':
      //  给井站按 标签分类  返回
      list = {
        'TransCode': ifRoute.tags.dep,
        'Content': {}
      }
      break
    case 'ShipList_finish':
      // 验油班查询
      list = {
        'TransCode': ifRoute.shipList.finish,
        'Content': {
          'Condition': {
            'Sort': condition.Sort,
            'TagId': condition.TagId,
            'DepartmentId': condition.DepartmentId,
            'DepartmentLev': condition.DepartmentLev,
            'CarType': condition.CarType, // 类型（1油车2水车，必填）
            'WaterType': condition.WaterType, // 水类型（对水车有效）
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'ShipList_check':
      // 验油班查询
      list = {
        'TransCode': ifRoute.shipList.check,
        'Content': {
          'Condition': {
            'Sort': condition.Sort,
            'TagId': condition.TagId,
            'DepartmentId': condition.DepartmentId,
            'DepartmentLev': condition.DepartmentLev,
            'CarType': condition.CarType, // 类型（1油车2水车，必填）
            'WaterType': condition.WaterType, // 水类型（对水车有效）
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'ShipList_review':
      // 审核查询
      list = {
        'TransCode': ifRoute.shipList.review,
        'Content': {
          'Condition': {
            'Sort': condition.Sort,
            'TagId': condition.TagId,
            'DepartmentId': condition.DepartmentId,
            'DepartmentLev': condition.DepartmentLev,
            'CarType': condition.CarType, // 类型（1油车2水车，必填）
            'WaterType': condition.WaterType, // 水类型（对水车有效）
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'ShipList_analysis':
      // 中心站查询列表
      list = {
        'TransCode': ifRoute.shipList.analysis,
        'Content': {
          'Condition': {
            'DepartmentLev': condition.DepartmentLev, //
            'CarNo': condition.CarNo, //
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          }
          // ,
          // 'Page': {
          //   'PageNo': condition.PageNo,
          //   'PageSize': condition.PageSize
          // }
        }
      }
      break
    case 'ShipList_well':
      // 中心站查询列表
      list = {
        'TransCode': ifRoute.shipList.well,
        'Content': {
          'Condition': {
            'Sort': condition.SortSort,
            'TagId': condition.TagId,
            'DepartmentId': condition.DepartmentId,
            'DepartmentLev': condition.DepartmentLev,
            'CarType': condition.CarType, // 类型（1油车2水车，必填）
            'WaterType': condition.WaterType, // 水类型（对水车有效）
            'StartTime': condition.StartTime, // 开始日期
            'EndTime': condition.EndTime // 结束日期
          },
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'ShipList_add':
      // 中心站编辑 运输记录 编辑
      list = {
        'TransCode': ifRoute.shipList.add,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'ShipList_verfi':
      // 卸载点编辑（油车，验油班） 运输记录 编辑
      list = {
        'TransCode': ifRoute.shipList.verfi,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'ShipList_audit':
      // 审核编辑
      list = {
        'TransCode': ifRoute.shipList.audit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'ShipList_adjust':
      // 完成编辑（审核通过的记录，有权限者可以编辑）
      list = {
        'TransCode': ifRoute.shipList.adjust,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'ShipList_del':
      // 删除
      list = {
        'TransCode': ifRoute.shipList.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Question_add':
      // 中心站问题编辑
      list = {
        'TransCode': ifRoute.question.add,
        'Content': {
          'Entity': condition
        }
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Question_count':
      // 问题 统计
      list = {
        'TransCode': ifRoute.question.count,
        'Content': {
          'Condition': condition
        },
        'Page': {
          'PageNo': condition.PageNo,
          'PageSize': condition.PageSize
        }
      }
      break
    case 'Question_todo':
      // 问题 ..
      list = {
        'TransCode': ifRoute.question.todo,
        'Content': {
          'Condition': condition
        },
        'Page': {
          'PageNo': condition.PageNo,
          'PageSize': condition.PageSize
        }
      }
      break
    case 'Question_list':
      // 中心站获取列表
      list = {
        'TransCode': ifRoute.question.list,
        'Content': {
          'Condition': condition,
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'Question_audit':
      // 调控岗编辑
      list = {
        'TransCode': ifRoute.question.audit,
        'Content': {
          'Entity': condition
        }
      }
      break
    case 'Question_listaudit':
      // 调控岗获取列表
      list = {
        'TransCode': ifRoute.question.listaudit,
        'Content': {
          'Condition': condition,
          'Page': {
            'PageNo': condition.PageNo,
            'PageSize': condition.PageSize
          }
        }
      }
      break
    case 'Question_del':
      // shangbao删除
      list = {
        'TransCode': ifRoute.question.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Manager_regulate':
      // 问题上报  调控中心审核人员列表
      list = {
        'TransCode': ifRoute.manager.regulate,
        'Content': {}
      }
      break
    case 'RepairUser_list':
      // 获取技术人员列表
      list = {
        'TransCode': ifRoute.repairUser.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'QuestionType_list':
      // 问题分类管理列表 获取列表(以子节点方式展示)
      list = {
        'TransCode': ifRoute.questionType.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'QuestionType_pid':
      // 问题分类管理列表 根据父节点获取子节点
      list = {
        'TransCode': ifRoute.questionType.pid,
        'Content': {
          'Condition': {
            'ParentId': condition.ParentId
          }
        }
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'QuestionType_edit':
      // 问题分  类  管理编辑
      list = {
        'TransCode': ifRoute.questionType.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'QuestionType_del':
      // 问题  分 类   管理假删
      list = {
        'TransCode': ifRoute.questionType.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Location_list':
      // 问题分级管理编辑
      list = {
        'TransCode': ifRoute.location.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Location_edit':
      // 问题分级管理列表
      list = {
        'TransCode': ifRoute.location.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'Location_del':
      // 问题分级管理假删
      list = {
        'TransCode': ifRoute.location.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Degree_list':
      // 问题分级管理编辑
      list = {
        'TransCode': ifRoute.degree.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Degree_edit':
      // 问题分级管理列表
      list = {
        'TransCode': ifRoute.degree.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'Degree_del':
      // 问题分级管理假删
      list = {
        'TransCode': ifRoute.degree.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'TimeRecord_list':
      // 在途平均时间列表查询
      list = {
        'TransCode': ifRoute.timeRecord.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'TimeRecord_get':
      // 单个井站到单个卸载点的平均时间
      list = {
        'TransCode': ifRoute.timeRecord.get,
        'Content': {
          'Condition': {
            'DepartmentId': condition.DepartmentId,
            'ShipPlaceId': condition.ShipPlaceId
          }
        }
      }
      break
    case 'TimeRecord_edit':
      // 在途平均时间编辑
      list = {
        'TransCode': ifRoute.timeRecord.edit,
        'Content': {
          'Entity': {
            'DepartmentId': condition.DepartmentId,
            'ShipPlaceId': condition.ShipPlaceId,
            'AverageTime': condition.AverageTime
          }
        }
      }
      break
    case 'TimeRecord_del':
      // 在途平均时间删除（真删）
      list = {
        'TransCode': ifRoute.timeRecord.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Signer_list':
      // 签认人列表查询
      list = {
        'TransCode': ifRoute.signer.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Signer_edit':
      // 签认人编辑
      list = {
        'TransCode': ifRoute.signer.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'Signer_del':
      // 签认人删除（假删除）
      list = {
        'TransCode': ifRoute.signer.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'ShipRecord_list':
      // 运单流转记录
      list = {
        'TransCode': ifRoute.shipRecord.list,
        'Content': {
          'Condition': {
            'ShipId': condition.ShipId
          }
        }
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'ShipRecord_detail':
      // 运单流转记录
      list = {
        'TransCode': ifRoute.shipRecord.detail,
        'Content': {
          'Condition': {
            'ID': condition.ID
          }
        }
      }
      break
    case 'ShipPlace_list':
      // 地点列表查询
      list = {
        'TransCode': ifRoute.shipPlace.list,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'ShipPlace_listWater':
      // 地点列表查询
      list = {
        'TransCode': ifRoute.shipPlace.listWater,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'ShipPlace_listOil':
      // 地点列表查询
      list = {
        'TransCode': ifRoute.shipPlace.listOil,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'ShipPlace_edit':
      // 地点编辑
      list = {
        'TransCode': ifRoute.shipPlace.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'ShipPlace_del':
      // 地点删除（假删除）
      list = {
        'TransCode': ifRoute.shipPlace.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Cars_listAll':
      // 所有车
      list = {
        'TransCode': ifRoute.cars.listAll,
        'Content': {
          'Condition': {
            'Type': condition.Type
          }
        }
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Cars_listWater':
      // 取水车
      list = {
        'TransCode': ifRoute.cars.listWater,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Cars_listOil':
      // 取油车
      list = {
        'TransCode': ifRoute.cars.listOil,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Cars_edit':
      // 车编辑
      list = {
        'TransCode': ifRoute.cars.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'Cars_del':
      // 车删除
      list = {
        'TransCode': ifRoute.cars.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Driver_listAll':
      // 驾驶员
      list = {
        'TransCode': ifRoute.driver.listAll,
        'Content': {
          'Condition': {
            'Type': condition.Type
          }
        }
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Driver_listWater':
      // 取水车驾驶员
      list = {
        'TransCode': ifRoute.driver.listWater,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Driver_listOil':
      // 取油车驾驶员
      list = {
        'TransCode': ifRoute.driver.listOil,
        'Content': {}
        // ,
        // 'Page': {
        //   'PageNo': condition.PageNo,
        //   'PageSize': condition.PageSize
        // }
      }
      break
    case 'Driver_edit':
      // 驾驶员编辑
      list = {
        'TransCode': ifRoute.driver.edit,
        'Content': {
          'Entity': condition.Entity
        }
      }
      break
    case 'Driver_del':
      // 驾驶员删除
      list = {
        'TransCode': ifRoute.driver.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'TranStation_alllist':
      // 所有可选列表(用车部门选择列表)
      list = {
        'TransCode': ifRoute.tranStation.alllist,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'TranStation_list':
      // 当前所在 可选列表(用车部门选择列表)
      list = {
        'TransCode': ifRoute.tranStation.list,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'TranStation_listOil':
      // 当前所在 油车 可选列表(用车部门选择列表)
      list = {
        'TransCode': ifRoute.tranStation.listOil,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'TranStation_listWater':
      // 当前所在 水车 可选列表(用车部门选择列表)
      list = {
        'TransCode': ifRoute.tranStation.listWater,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'TranStation_allOil':
      // 油车  可选井站  所有:
      list = {
        'TransCode': ifRoute.tranStation.allOil,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'TranStation_allWater':
      // 水车  可选井站  所有
      list = {
        'TransCode': ifRoute.tranStation.allWater,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'TranStation_edit':
      // 选择编辑井站
      list = {
        'TransCode': ifRoute.tranStation.edit,
        'Content': {
          'Entity': condition
        }
      }
      break
    case 'TranStation_all':
      // 所有井站
      list = {
        'TransCode': ifRoute.tranStation.all,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'MealApply_audit':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.mealApply.audit,
    //     'Content': {
    //       'Condition': {
    //         'ID': condition.ID,
    //         'StartDate': condition.StartDate,
    //         'EndDate': condition.EndDate,
    //         'NoApply': condition.NoApply
    //       }
    //     }
    //   }
    //   break
    // case 'StationEatRecord_list':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.stationEatRecord.list,
    //     'Content': {
    //       'Condition': {
    //         'NickName': condition.NickName,
    //         'IsAudit': condition.IsAudit,
    //         'DepartmentLev': condition.DepartmentLev,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         'PageNo': condition.PageNo,
    //         'PageSize': condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'Employee_newpass':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.employee.newpass,
    //     'Content': {
    //       'Entity': {
    //         'Password': condition.Password
    //       }
    //     }
    //   }
    //   break
    // case 'Department_wellcenter':
    //   list = {
    //     'TransCode': ifRoute.department.wellcenter,
    //     'Content': {}
    //   }
    //   break
    // case 'Department_wkcenter':
    //   list = {
    //     'TransCode': ifRoute.department.wkcenter,
    //     'Content': {}
    //   }
    //   break
    // case 'Department_well':
    //   list = {
    //     'TransCode': ifRoute.department.well,
    //     'Content': {}
    //   }
    //   break
    // case 'Department_repair':
    //   list = {
    //     'TransCode': ifRoute.department.repair,
    //     'Content': {}
    //   }
    //   break
    // case 'Department_line':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.department.line,
    //     'Content': {}
    //   }
    //   break
    // case 'Limit_department':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.limit.department,
    //     'Content': {
    //       'Condition': {
    //         'DepartmentLev': condition.DepartmentLev
    //       }
    //     }
    //   }
    //   break
    // case 'Order_suppliercount':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.order.suppliercount,
    //     'Content': {
    //       'Condition': {
    //         'Type': condition.Type,
    //         'Department': condition.Department,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       }
    //       // ,
    //       // 'Page': {
    //       //   PageNo: condition.PageNo,
    //       //   PageSize: condition.PageSize
    //       // }
    //     }
    //   }
    //   break
    // case 'DeliveryToDep_edit':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.deliveryToDep.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'EmployeeID': condition.EmployeeID,
    //         'DepartmentId': condition.DepartmentId,
    //         'DepartmentLev': condition.DepartmentLev
    //       }
    //     }
    //   }
    //   break
    // case 'DeliveryToDep_del':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.deliveryToDep.del,
    //     'Content': {
    //       'Condition': {
    //         'ArrayID': condition.ArrayID
    //       }
    //     }
    //   }
    //   break
    // case 'DeliveryToDep_list':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.deliveryToDep.list,
    //     'Content': {
    //       'Condition': {
    //         'EmployeeName': condition.EmployeeName
    //       }
    //     }
    //   }
    //   break
    // case 'Department_delivery':
    //   // 部门列表 供应商配送员 选取中心井站时 选择部门
    //   list = {
    //     'TransCode': ifRoute.department.delivery,
    //     'Content': {
    //       'Condition': {}
    //     }
    //   }
    //   break
    // case 'Employee_delivery':
    //   // 供应商配送人员对应 配送到终点 列表
    //   list = {
    //     'TransCode': ifRoute.employee.delivery,
    //     'Content': {
    //       'Condition': {}
    //     }
    //   }
    //   break
    // case 'Employee_edit':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.employee.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'LoginName': condition.LoginName,
    //         'Password': condition.Password,
    //         // 'SupplierID': condition.SupplierID,
    //         'EmployeeName': condition.NickName,
    //         'Phone': condition.Phone,
    //         'SupplierRoleID': condition.RoleID
    //       }
    //     }
    //   }
    //   break
    // case 'Employee_del':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.employee.del,
    //     'Content': {
    //       'Condition': {
    //         'ArrayID': condition.ArrayID
    //       }
    //     }
    //   }
    //   break
    // case 'Employee_list':
    //   // 供应商配送人员列表
    //   list = {
    //     'TransCode': ifRoute.employee.list,
    //     'Content': {
    //       'Condition': {
    //         'EmployeeName': condition.EmployeeName
    //       }
    //     }
    //   }
    //   break
    // case 'Department_center':
    //   // 每月额度日期时间段获取
    //   list = {
    //     'TransCode': ifRoute.department.center,
    //     'Content': {}
    //   }
    //   break
    // case 'Limit_apply':
    //   // 每月额度日期时间段获取
    //   list = {
    //     'TransCode': ifRoute.limit.apply,
    //     'Content': {}
    //   }
    //   break
    // case 'Limit_batch':
    //   // 配额批量设置（井站）
    //   list = {
    //     'TransCode': ifRoute.limit.batch,
    //     'Content': {
    //       'Entity': condition.Entity
    //     }
    //   }
    //   break
    // case 'Limit_subdep':
    //   // 配额获取（井站）
    //   list = {
    //     'TransCode': ifRoute.limit.subdep,
    //     'Content': {}
    //   }
    //   break
    // case 'Limit_edit':
    //   // 物资配额设置(中心站)
    //   list = {
    //     'TransCode': ifRoute.limit.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID, // 标识 为空新增
    //         'DepartmentID': condition.DepartmentID, // 部门ID
    //         'DepartmentLev': condition.DepartmentLev, // 部门level
    //         'LimitMoney': condition.LimitMoney // 配额
    //       }
    //     }
    //   }
    //   break
    // case 'Limit_getone':
    //   // 配额获取(中心站)
    //   list = {
    //     'TransCode': ifRoute.limit.getone,
    //     'Content': {}
    //   }
    //   break
    // case 'BaseSet_detail':
    //   // 每月额度日期时间段获取
    //   list = {
    //     'TransCode': ifRoute.baseSet.detail,
    //     'Content': {}
    //   }
    //   break
    // case 'BaseSet_edit':
    //   // 每月额度日期时间段设置
    //   list = {
    //     'TransCode': ifRoute.baseSet.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'StartDay': condition.StartDay,
    //         'EndDay': condition.EndDay
    //       }
    //     }
    //   }
    //   break
    // case 'report_onetoexcel':
    //   // 物资配送 签收
    //   list = {
    //     'TransCode': ifRoute.report.onetoexcel,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID
    //       }
    //     }
    //   }
    //   break
    // case 'order_count':
    //   // 物资配送 统计
    //   list = {
    //     'TransCode': ifRoute.order.count,
    //     'Content': {
    //       'Condition': {
    //         'Department': condition.Department,
    //         'SupplierID': condition.SupplierID,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'order_receive':
    //   // 物资配送 签收
    //   list = {
    //     'TransCode': ifRoute.order.receive,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID
    //       }
    //     }
    //   }
    //   break
    // case 'order_auditlist':
    //   // 物资配送 列表
    //   list = {
    //     'TransCode': ifRoute.order.auditlist,
    //     'Content': {
    //       'Condition': {
    //         'Status': condition.Status,
    //         'DepartmentLev': condition.DepartmentLev,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'order_userApplyList':
    //   // 物资申请详情
    //   list = {
    //     'TransCode': ifRoute.order.userApplyList,
    //     'Content': {
    //       'Condition': {
    //         'UserID': condition.UserID,
    //         'Status': condition.Status
    //       }
    //     }
    //   }
    //   break
    // case 'order_detail':
    //   // 物资申请详情
    //   list = {
    //     'TransCode': ifRoute.order.detail,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID
    //       }
    //     }
    //   }
    //   break
    // case 'order_refuse':
    //   // 物资申请拒绝
    //   list = {
    //     'TransCode': ifRoute.order.refuse,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID,
    //         'Remark': condition.Remark
    //       }
    //     }
    //   }
    //   break
    // case 'order_cancel':
    //   // 供应商撤销配送申请
    //   list = {
    //     'TransCode': ifRoute.order.cancel,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID,
    //         'SupplierRemark': condition.SupplierRemark
    //       }
    //     }
    //   }
    //   break
    // case 'order_shipments':
    //   // 供应商确认开始配送
    //   list = {
    //     'TransCode': ifRoute.order.shipments,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID
    //       }
    //     }
    //   }
    //   break
    // case 'order_agree':
    //   // 物资申请通过
    //   list = {
    //     'TransCode': ifRoute.order.agree,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID,
    //         'SupplierID': condition.SupplierID,
    //         'GoodsList': condition.GoodsList
    //       }
    //     }
    //   }
    //   break
    // case 'order_delete':
    //   // 物资申请删除
    //   list = {
    //     'TransCode': ifRoute.order.delete,
    //     'Content': {
    //       'Condition': {
    //         'ApplyID': condition.ApplyID
    //       }
    //     }
    //   }
    //   break
    // case 'order_transList':
    //   // 供应商收到的请求配送列表
    //   list = {
    //     'TransCode': ifRoute.order.transList,
    //     'Content': {
    //       'Condition': {
    //         'Status': condition.Status,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'order_applyList':
    //   // 物资申请列表
    //   list = {
    //     'TransCode': ifRoute.order.applyList,
    //     'Content': {
    //       'Condition': {
    //         'Status': condition.Status,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'product_delete':
    //   // 删除添加
    //   list = {
    //     'TransCode': ifRoute.product.delete,
    //     'Content': {
    //       'Condition': {
    //         'ProductID': condition.ProductID
    //       }
    //     }
    //   }
    //   break
    // case 'product_list':
    //   // 商品列表
    //   list = {
    //     'TransCode': ifRoute.product.list,
    //     'Content': {
    //       'Condition': {
    //         'ClassID': condition.ClassID,
    //         'ProductName': condition.ProductName,
    //         'HaveCode': condition.HaveCode,
    //         'ManagerID': condition.ManagerID,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'product_all':
    //   // 商品列表
    //   list = {
    //     'TransCode': ifRoute.product.list,
    //     'Content': {
    //       'Condition': {
    //         'ClassID': condition.ClassID,
    //         'ProductName': condition.ProductName,
    //         'ManagerID': condition.ManagerID,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       },
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'product_batch':
    //   // 商品添加
    //   list = {
    //     'TransCode': ifRoute.product.batch,
    //     'Content': {
    //       'Entity': condition
    //     }
    //   }
    //   break
    // case 'product_edit':
    //   // 商品添加
    //   list = {
    //     'TransCode': ifRoute.product.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'ProductName': condition.ProductName,
    //         'ProductImg': condition.ProductImg,
    //         'ClassID': condition.ClassID,
    //         'Unit': condition.Unit,
    //         'Code': condition.Code,
    //         'Price': condition.Price
    //       }
    //     }
    //   }
    //   break
    // case 'product_add':
    //   // 商品添加
    //   list = {
    //     'TransCode': ifRoute.product.add,
    //     'Content': {
    //       'Entity': {
    //         'ProductName': condition.ProductName,
    //         'ProductImg': condition.ProductImg,
    //         'Price': condition.Price,
    //         'Unit': condition.Unit,
    //         'Code': condition.Code,
    //         'ClassID': condition.ClassID
    //       }
    //     }
    //   }
    //   break
    // case 'Class_add':
    //   // 商品分类添加
    //   list = {
    //     'TransCode': ifRoute.class.add,
    //     'Content': {
    //       'Entity': {
    //         'ClassName': condition.ClassName,
    //         'ParentID': condition.ParentID
    //       }
    //     }
    //   }
    //   break
    // case 'Class_edit':
    //   // 商品分类编辑
    //   list = {
    //     'TransCode': ifRoute.class.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'ClassName': condition.ClassName,
    //         'ParentID': condition.ParentID
    //       }
    //     }
    //   }
    //   break
    // case 'Class_list':
    //   // 商品分类列表
    //   list = {
    //     'TransCode': ifRoute.class.list,
    //     'Content': {
    //       'Condition': {
    //         'ClassName': condition.ClassName,
    //         'ParentID': condition.ParentID
    //       }
    //     }
    //   }
    //   // ,
    //   // 'Page': {
    //   //
    //   // }
    //   break
    // case 'Class_delete':
    //   // 商品分类删除
    //   list = {
    //     'TransCode': ifRoute.class.delete,
    //     'Content': {
    //       'Condition': {
    //         'ClassId': condition.ClassId
    //       }
    //     }
    //   }
    //   break
    // case 'SupplierRole_list':
    //   // 供应商角色列表
    //   list = {
    //     'TransCode': ifRoute.supplierRole.list,
    //     'Content': {
    //       'Condition': {}
    //     }
    //   }
    //   break
    // case 'supplier_delete':
    //   // 供应商删除
    //   list = {
    //     'TransCode': ifRoute.supplier.delete,
    //     'Content': {
    //       'Condition': {
    //         'SupplierID': condition.SupplierID
    //       }
    //     }
    //   }
    //   break
    // case 'Supplier_newpass':
    //   // 供应商信息修改
    //   list = {
    //     'TransCode': ifRoute.supplier.newpass,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'LoginName': condition.LoginName,
    //         'Password': condition.Password,
    //         'SupplierName': condition.SupplierName,
    //         'Phone': condition.Phone,
    //         'Address': condition.Address
    //       }
    //     }
    //   }
    //   break
    // case 'supplier_edit':
    //   // 供应商信息修改
    //   list = {
    //     'TransCode': ifRoute.supplier.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'LoginName': condition.LoginName,
    //         'Password': condition.Password,
    //         'SupplierName': condition.SupplierName,
    //         'Phone': condition.Phone,
    //         'Address': condition.Address
    //       }
    //     }
    //   }
    //   break
    // case 'supplier_list':
    //   // 供应商列表
    //   list = {
    //     'TransCode': ifRoute.supplier.list,
    //     'Content': {
    //       'Condition': {
    //         'SupplierName': condition.SupplierName
    //       }
    //     }
    //   }
    //   // ,
    //   // 'Page': {
    //   //
    //   // }
    //   break
    // case 'MealApply_del':
    //   // 人员就餐 取消权限
    //   list = {
    //     'TransCode': ifRoute.mealApply.del,
    //     'Content': {
    //       'Condition': {
    //         'ArrayID': condition.ArrayID
    //       }
    //     }
    //   }
    //   break
    // case 'MealApply_submit':
    //   // 人员就餐 申请
    //   list = {
    //     'TransCode': ifRoute.mealApply.submit,
    //     'Content': {
    //       'Entity': {
    //         'UserID': condition.UserID,
    //         'StartDate': condition.StartDate,
    //         'EndDate': condition.EndDate
    //       }
    //     }
    //   }
    //   break
    // case 'MealApply_status':
    //   // 人员就餐 状态修改
    //   list = {
    //     'TransCode': ifRoute.mealApply.status,
    //     'Content': {
    //       'ID': condition.ID,
    //       'Status': condition.Status
    //     }
    //   }
    //   break
    // case 'MealApply_list':
    //   // 人员就餐 申请列表
    //   list = {
    //     'TransCode': ifRoute.mealApply.list,
    //     'Content': {
    //       'Page': {
    //         PageNo: condition.PageNo,
    //         PageSize: condition.PageSize
    //       }
    //     }
    //   }
    //   break
    // case 'MealSet_del':
    //   // 删除就餐
    //   list = {
    //     'TransCode': ifRoute.MealSet.del,
    //     'Content': {
    //       'Condition': {
    //         'ArrayID': condition.ArrayID
    //       }
    //     }
    //   }
    //   break
    // case 'MealSet_list':
    //   // 就餐 列表
    //   list = {
    //     'TransCode': ifRoute.MealSet.list,
    //     'Content': {}
    //   }
    //   break
    // case 'MealSet_edit':
    //   // 添加就餐
    //   list = {
    //     'TransCode': ifRoute.MealSet.edit,
    //     'Content': {
    //       'Entity': {
    //         'ID': condition.ID,
    //         'UserType': condition.UserType,
    //         'Type': condition.Type,
    //         'Price': condition.Price,
    //         'StartTime': condition.StartTime,
    //         'EndTime': condition.EndTime
    //       }
    //     }
    //   }
    //   break
    // case 'CashFlow_list':
      // 部门列表
      list = {
        'TransCode': ifRoute.cashFlow.list,
        'Content': {
          'Condition': {
            'Name': condition.Name,
            'UserType': condition.UserType,
            'DepartmentID': condition.DepartmentID,
            'StartTime': condition.StartTime,
            'EndTime': condition.EndTime
          },
          'Page': {
            PageNo: condition.PageNo,
            PageSize: condition.PageSize
          }
        }
      }
      break
    case 'Department_del':
      // 部门编辑及添加
      list = {
        'TransCode': ifRoute.department.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID //* 部门ID数组
          }
        }
      }
      break
    case 'Department_edit':
      // 部门编辑及添加
      list = {
        'TransCode': ifRoute.department.edit,
        'Content': {
          'Entity': {
            'ID': condition.ID,
            'ParentID': condition.ParentID,
            'DepartmentName': condition.DepartmentName,
            'Type': condition.Type,
            'Line': condition.Line
          }
        }
      }
      break
    case 'Department_list':
      // 部门列表
      list = {
        'TransCode': ifRoute.department.list,
        'Content': {
          'Condition': {
            'DepName': condition.DepName
          }
        }
      }
      break
    case 'Role_list':
      // 角色列表
      list = {
        'TransCode': ifRoute.role.list,
        'Content': {
          'Condition': {}
        }
      }
      break
    case 'Role_edit':
      // 角色编辑
      list = {
        'TransCode': ifRoute.role.edit,
        'Content': {
          'Entity': {
            'ID': condition.ID,
            'RoleName': condition.RoleName,
            'Privilege': condition.Privilege
          }
        }
      }
      break
    case 'Role_del':
      // 角色删除
      list = {
        'TransCode': ifRoute.role.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Role_set':
      // 获取模块权限列表
      list = {
        'TransCode': ifRoute.role.set,
        'Content': {
          'Condition': {
            'ID': condition.ID
          }
        }
      }
      break
    case 'Manager_detail':
      // 人员详情
      list = {
        'TransCode': ifRoute.manager.detail,
        'Content': {
          'Condition': {
            'ID': condition.ID
          }
        }
      }
      break
    case 'Manager_del':
      // 人员删除
      list = {
        'TransCode': ifRoute.manager.del,
        'Content': {
          'Condition': {
            'ArrayID': condition.ArrayID
          }
        }
      }
      break
    case 'Manager_edit':
      // 人员编辑
      list = {
        'TransCode': ifRoute.manager.edit,
        'Content': {
          'Entity': {
            'DepartmentID': condition.DepartmentID,
            'DepartmentLev': condition.DepartmentLev,
            'ID': condition.ID,
            'IdentityType': condition.IdentityType,
            'LoginName': condition.LoginName,
            'NickName': condition.NickName,
            'Password': condition.Password,
            'Phone': condition.Phone,
            'UserNumber': condition.UserNumber,
            'IsLongTerm': condition.IsLongTerm,
            'ShipWaterAdjust': condition.ShipWaterAdjust,
            'CarInputRight': condition.CarInputRight,
            'RoleID': condition.RoleID,
            'IsFreeMeal': condition.IsFreeMeal,
            'IsEnabled': condition.IsEnabled,
            'NoApply': condition.NoApply
          }
        }
      }
      break
    case 'Manager_repair':
      // 人员列表
      list = {
        'TransCode': ifRoute.manager.repair,
        'Content': {
          'Condition': {
            'Key': condition.Key,
            'DepartmentLev': condition.DepartmentLev
          }
        }
      }
      break
    case 'Manager_listmeal':
      // 人员列表
      list = {
        'TransCode': ifRoute.manager.listmeal,
        'Content': {
          'Condition': {
            'Key': condition.Key,
            'IdentityType': condition.IdentityType,
            'Status': condition.Status
          },
          'Page': {
            PageNo: condition.PageNo,
            PageSize: condition.PageSize
          }

        }
      }
      break
    case 'Manager_list':
      // 人员列表
      list = {
        'TransCode': ifRoute.manager.list,
        'Content': {
          'Condition': {
            'Key': condition.Key,
            'Department': condition.Department,
            'IdentityType': condition.IdentityType,
            'Status': condition.Status
          },
          'Page': {
            PageNo: condition.PageNo,
            PageSize: condition.PageSize
          }

        }
      }
      break
    case 'Manager_editinfo':
      // 登录
      list = {
        'TransCode': ifRoute.manager.editinfo,
        'Content': {
          'Entity': {
            'Password': condition.Password,
            'NickName': condition.NickName,
            'Phone': condition.Phone
          }
        }
      }
      break
    case 'Manager_login':
      // 登录
      list = {
        'TransCode': ifRoute.manager.login,
        'Content': {
          'Condition': {
            'LoginName': condition.username,
            'Password': condition.pwd
          }
        }
      }
      break
    case 'Supplier_login':
      // 供应商登录
      list = {
        'TransCode': ifRoute.supplier.login,
        'Content': {
          'Condition': {
            'LoginName': condition.username,
            'Password': condition.pwd
          }
        }
      }
      break
    case 'demo':
      // 发送验证码
      list = {
        'TransCode': ifRoute.demo.test,
        'Content': {
          'Condition': {
            'username': condition.username,
            'pwd': condition.pwd
          }
        }
      }
      break
    default:
      break
  }
  return list
}

// 获取接口并返回前端
const interfaceApi = {
  interfaceVal: {},
  getParams(type, condition) {
    this.interfaceVal = setNewsInterface(type, condition)
    return this.interfaceVal
  }
}

export default interfaceApi
