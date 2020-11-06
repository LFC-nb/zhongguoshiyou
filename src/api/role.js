import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const roleApi = {
  async getRolelist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Role_list', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      // commonFunc.myConsole('Role_list getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      // commonFunc.myConsole('Role_list getDemoData reject =====>')
      // commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getRoleset(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ID': params.ID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Role_set', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    // commonFunc.myConsole(dataParams)
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      // commonFunc.myConsole('Role_set getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      // commonFunc.myConsole('Role_set getDemoData reject =====>')
      // commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getRoleedit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ID': params.ID,
      'RoleName': params.RoleName,
      'Privilege': params.Privilege
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Role_edit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    commonFunc.myConsole(dataParams)
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      // commonFunc.myConsole('Role_edit getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      // commonFunc.myConsole('Role_edit getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getRoledel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Role_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    commonFunc.myConsole(dataParams)
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      // commonFunc.myConsole('Role_del getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      // commonFunc.myConsole('Role_del getDemoData reject =====>')
      // commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default roleApi
