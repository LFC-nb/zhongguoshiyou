import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const driversApi = {
  async getalldriverslist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Type': params.Type
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Driver_listAll', conditionsParams, '')
    // commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Driver_listAll getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Driver_listAll getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getWaterdriverslist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Driver_listWater', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Driver_listWater getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Driver_listWater getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getOildriverslist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Driver_listOil', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Driver_listOil getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Driver_listOil getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async Driver_edit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Driver_edit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Driver_edit getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Driver_edit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async Driverdel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Driver_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Driver_del resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Driver_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default driversApi
