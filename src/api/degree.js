import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const degreeApi = {
  async getalldegreelist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Degree_list', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('degree_list getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('degree_list getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async degree_edit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Degree_edit', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('degree_edit getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('degree_edit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async degreedel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Degree_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api degree_del resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api degree_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default degreeApi
