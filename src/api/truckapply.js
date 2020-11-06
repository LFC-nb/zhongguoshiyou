import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const truckapplyApi = {
  async getCarApply_isnew(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_isnew', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api CarApply_isnew getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api CarApply_isnew reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getApplylist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_listwell', conditionsParams, '')
    // commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('CarApply_listwell getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('CarApply_listwell getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getApplylistconfirm(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_listconfirm', conditionsParams, '')
    // commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('CarApply_listconfirm getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('CarApply_listconfirm getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getApplylistcancel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_listcancel', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('CarApply_listcancel getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('CarApply_listcancel getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async CarApply_edit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_edit', conditionsParams, '')
    commonFunc.myConsole(JSON.stringify(dataParams))
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('CarApply_edit getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('CarApply_edit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async CarApply_confirm(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ID': params.ID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_confirm', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api CarApply_confirm resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api CarApply_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async CarApply_cancel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_cancel', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api CarApply_cancel resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api CarApply_cancel reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async CarApply_del(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('CarApply_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api CarApply_del resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api CarApply_del reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default truckapplyApi
