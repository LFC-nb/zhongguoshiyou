import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const timerecordApi = {
  async getalltimerecordlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('TimeRecord_list', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('TimeRecord_list getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('TimeRecord_list getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async TimeRecord_get(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'DepartmentId': params.DepartmentId,
      'ShipPlaceId': params.ShipPlaceId
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('TimeRecord_get', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('TimeRecord_get getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('TimeRecord_get getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async timerecord_edit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'DepartmentId': params.DepartmentId,
      'ShipPlaceId': params.ShipPlaceId,
      'AverageTime': params.AverageTime
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('TimeRecord_edit', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('timerecord_edit getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('timerecord_edit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async timerecorddel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('TimeRecord_del', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api timerecord_del resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api timerecord_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default timerecordApi
