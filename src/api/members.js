import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const membersApi = {
  async getManagerlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'PageNo': params.PageNo,
      'PageSize': params.PageSize,
      'Key': params.Key,
      'Department': params.Department,
      'IdentityType': params.IdentityType,
      'Status': params.Status
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_list', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('membersApi getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('membersApi getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async managersdel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Manager resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api del  Manager reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default membersApi
