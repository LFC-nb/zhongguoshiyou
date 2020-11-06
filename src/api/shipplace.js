import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const shipplaceApi = {
  async getallshipplacelist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipPlace_list', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipPlace_list getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipPlace_list getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getWatershipplacelist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipPlace_listWater', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipPlace_listWater getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipPlace_listWater getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getOilshipplacelist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      // 'PageNo': params.PageNo,
      // 'PageSize': params.PageSize
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipPlace_listOil', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipPlace_listOil getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipPlace_listOil getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async ShipPlace_edit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipPlace_edit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipPlace_edit getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipPlace_edit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async ShipPlacedel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipPlace_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api ShipPlace_del resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api ShipPlace_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default shipplaceApi
