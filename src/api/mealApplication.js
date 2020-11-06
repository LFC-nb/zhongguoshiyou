import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const mealApplicationApi = {
  async getManager_listmeal(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Key': params.Key,
      'IdentityType': params.IdentityType,
      'Status': params.Status
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_listmeal', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Manager_listmeal getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Manager_listmeal getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async mealApplysubmit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'UserID': params.UserID,
      'StartDate': params.StartDate,
      'EndDate': params.EndDate
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('MealApply_submit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('MealApply_submit resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('MealApply_submit Manager reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async mealApplydel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('MealApply_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('MealApply_del resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('MealApply_del Manager reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async mealApply(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ID': params.ID,
      'StartDate': params.StartDate,
      'EndDate': params.EndDate,
      'NoApply': params.NoApply
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('MealApply_audit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('MealApply_audit resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('MealApply_audit Manager reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default mealApplicationApi
