import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const centralStationApi = {
  async getRepairUserlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('RepairUser_list', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api RepairUser_list getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api RepairUser_list getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getManager_repair(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_repair', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Manager_repair getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Manager_repair getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getcentralStationlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_list', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Question_list getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Question_list getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getQuestionlistaudit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_listaudit', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Question_listaudit getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Question_listaudit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getcentralStationadd(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_add', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Question_add getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Question_add getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getQuestionaudit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_audit', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Question_audit getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Question_audit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async centralStationdel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_del', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Question_del getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api del  Question_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default centralStationApi
