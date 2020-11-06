import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const shiptabApi = {
  async ShipRecordlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params // 运单流转记录
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipRecord_list', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipRecord_list getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipRecord_list getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async ShipRecorddetail(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params // 运单流转记录
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipRecord_detail', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipRecord_detail getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipRecord_detail getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shipListwell(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Sort': params.Sort,
      'TagId': params.TagId,
      'DepartmentId': params.DepartmentId,
      'DepartmentLev': params.DepartmentLev,
      'CarType': params.CarType, // 类型（1油车2水车，必填）
      'WaterType': params.WaterType, // 水类型（对水车有效）
      'StartTime': params.StartTime, // 开始日期
      'EndTime': params.EndTime, // 结束日期
      'PageNo': params.PageNo,
      'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_well', conditionsParams, '')
    // 接收api返回来的结果
    commonFunc.myConsole(JSON.stringify(dataParams))
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_well getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_well getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shipListreview(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Sort': params.Sort,
      'TagId': params.TagId,
      'DepartmentId': params.DepartmentId,
      'DepartmentLev': params.DepartmentLev,
      'CarType': params.CarType, // 类型（1油车2水车，必填）
      'WaterType': params.WaterType, // 水类型（对水车有效）
      'StartTime': params.StartTime, // 开始日期
      'EndTime': params.EndTime, // 结束日期
      'PageNo': params.PageNo,
      'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_review', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_review getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_review getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shipListfinish(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Sort': params.Sort,
      'TagId': params.TagId,
      'DepartmentId': params.DepartmentId,
      'DepartmentLev': params.DepartmentLev,
      'CarType': params.CarType, // 类型（1油车2水车，必填）
      'WaterType': params.WaterType, // 水类型（对水车有效）
      'StartTime': params.StartTime, // 开始日期
      'EndTime': params.EndTime, // 结束日期
      'PageNo': params.PageNo,
      'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_finish', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_finish getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_finish getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shipListcheck(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Sort': params.Sort,
      'TagId': params.TagId,
      'DepartmentId': params.DepartmentId,
      'DepartmentLev': params.DepartmentLev,
      'CarType': params.CarType, // 类型（1油车2水车，必填）
      'WaterType': params.WaterType, // 水类型（对水车有效）
      'StartTime': params.StartTime, // 开始日期
      'EndTime': params.EndTime, // 结束日期
      'PageNo': params.PageNo,
      'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_check', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_check getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_check getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shiplistadd(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_add', conditionsParams, '')
    // 接收api返回来的结果
    commonFunc.myConsole(JSON.stringify(dataParams))
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_add getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_add getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shiplistverfi(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_verfi', conditionsParams, '')
    // commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_verfi getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_verfi getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shiplistaudit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_audit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_audit getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_audit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shiplistadjust(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_adjust', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_adjust getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_adjust getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async shiplistdel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api ShipList_del resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api ShipList_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default shiptabApi
